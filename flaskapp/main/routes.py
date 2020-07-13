from flask import (render_template, Blueprint)
from flask_login import login_required
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from flaskapp.main.utils import allowed_file

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return render_template('home.html')

@main.route("/about")
def about():
    return render_template('about.html')

@main.route("/projects")
def projects():
    return render_template('projects.html')

@main.route("/upload", methods=['POST'])
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
            # print(file)
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