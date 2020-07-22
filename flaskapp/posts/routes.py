
from flask import (render_template, url_for, flash,
                   redirect, request, abort, Blueprint, json)
from flask_login import current_user, login_required
from flaskapp import db
from flaskapp.models import Post
from flaskapp.posts.forms import PostForm

posts = Blueprint('posts', __name__)

@posts.route("/posts")
def all_posts():
    if current_user.is_authenticated:
        posts = Post.query.all()
    else:
        posts = Post.query.filter(Post.is_live == 1)
    return render_template('posts.html', posts=posts)

@posts.route("/posts/new", methods=['GET', 'POST'])
@login_required
def new_post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(title=form.title.data, content=form.content.data, tags=form.tags.data, is_live=False, author=current_user)
        db.session.add(post)
        db.session.commit()
        flash('Your post has been created!', 'success')
        return redirect(url_for('main.home'))
    return render_template('create_post.html', title='New Post', form=form, legend='New Post')

@posts.route("/posts/<int:post_id>")
# TODO put in a guard to protect against articles that aren't live yet
def post(post_id):
    post = Post.query.get_or_404(post_id)
    content = post.__dict__['content']
    content_dict = json.loads(content)
    print("blocks!!!")
    print(content_dict['blocks'])
    blocks = content_dict['blocks']
    return render_template('post.html', title=post.title, post=post, content=blocks)

@posts.route("/posts/<int:post_id>/update", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        print('is vlaid')
        post.title =  form.title.data
        post.tags = form.tags.data
        post.content = form.content.data
        post.is_live = form.is_live.data
        db.session.commit()
        flash('Your post has been updated!', 'success')
        return redirect(url_for('posts.post', post_id=post.id))
    elif request.method == 'GET':
        form.title.data = post.title
        form.tags.data = post.tags
        form.is_live.data = post.is_live
        form.content.data = post.content
    return render_template('create_post.html', title='Update Post',
                           form=form, legend='Update Post')

@posts.route("/posts/<int:post_id>/delete", methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash('Your post has been deleted!', 'success')
    return redirect(url_for('main.home'))                        