import os
import secrets
from PIL import Image
from flask import render_template, flash, redirect, url_for, request, jsonify
from flaskapp import app, db, bcrypt
from flaskapp.forms import RegistrationForm, LoginForm, UpdateAccountForm, PostForm
from flaskapp.models import User, Post
from flask_login import login_user, current_user, logout_user, login_required
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from werkzeug.utils import secure_filename
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
from flask import json

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)

    output_size = (240, 240)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn


@app.route('/')
def home():
    return render_template('home.html')


@app.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('home'))     
    return render_template('register.html', title='Register', form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else: 
            flash('Login Unsuccessful. Please check email and password', 'warning')
    return render_template('login.html', title='Login', form=form)

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('account.html', title='Account', form=form, image_file=image_file)




@app.route("/posts/new", methods=['GET', 'POST'])
@login_required
def new_post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(title=form.title.data, content=form.content.data, tags=form.tags.data, is_live=False, author=current_user)
        print(post)
        db.session.add(post)
        db.session.commit()
        flash('Your post has been created!', 'success')
        return redirect(url_for('home'))
    return render_template('create_post.html', title='New Post', form=form, legend='New Post')

@app.route("/posts")
def posts():
    posts = Post.query.all()
    print(posts)
    return render_template('posts.html', posts=posts)

@app.route("/posts/<int:post_id>")
def post(post_id):
    post = Post.query.get_or_404(post_id)
    content = post.__dict__['content']
    content_dict = json.loads(content)
    print("blocks!!!")
    print(content_dict['blocks'])
    blocks = content_dict['blocks']
    return render_template('post.html', title=post.title, post=post, content=blocks)

@app.route("/posts/<int:post_id>/update", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        post.title =  form.title.data
        post.content = form.content.data
        db.session.commit()
        flash('Your post has been updated!', 'success')
        return redirect(url_for('post', post_id=post.id))
    elif request.method == 'GET':
        form.title.data = post.title
        form.tags.data = post.tags
        form.is_live.data = post.is_live
        form.content.data = post.content
    form.title.data = post.title
    form.content.data = post.content
    return render_template('create_post.html', title='Update Post',
                           form=form, legend='Update Post')

@app.route("/posts/<int:post_id>/delete", methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash('Your post has been deleted!', 'success')
    return redirect(url_for('home'))

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=['POST'])
@login_required
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        data = request.form.to_dict()
        print(data)
        data2 = request.files.to_dict()
        print(data2)
        if 'image' not in request.files:
            flash('No file part')
            data = {
                "message": "No file part"
            }
            response = app.response_class(
                response=json.dumps(data),
                status=400,
                mimetype='application/json'
            )
            return response
        file = request.files['image']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            data = {
                "message": "No selected file"
            }
            response = app.response_class(
                response=json.dumps(data),
                status=400,
                mimetype='application/json'
            )
            return response
        if file and allowed_file(file.filename):
            # filename = secure_filename(file.filename)
            print(file)
            upload_result = upload(file)
            print(upload_result)
            reponse_data = {
                "success" : 1,
                "file": {
                    "url": upload_result['url'],
                    "public_id": upload_result['public_id'],
                    "width": upload_result['width'],
                    "height": upload_result['height']
                }
            }
   
            response = app.response_class(
                response=json.dumps(reponse_data),
                status=200,
                mimetype='application/json'
            )
            return response
 
            # return response {
            #     "upload": upload_result
            # }
    # return response {
    #     "brand": "Ford",
    #     "model": "Mustang",
    #     "year": 1964
    # }




@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/projects")
def projects():
    return render_template('projects.html')