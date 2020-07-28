from flask import (render_template, Blueprint, flash, json, request)
from flaskapp.projects.forms import ProjectForm
from flaskapp import db
from flaskapp.models import Project
from flask_login import login_required


projects = Blueprint('projects', __name__)

@projects.route("/projects")
def all_projects():
    projects = Project.query.all()
    results = [project.to_dict() for project in projects] 
    return render_template('projects.html', projects=results, greeting="Hello fabulous world!")

@projects.route('/projects/new', methods=['GET', 'POST'])
@login_required
def new_project():
    form = ProjectForm()
    if form.validate_on_submit():
        project = Project(title=form.title.data, description=form.description.data, comments=form.comments.data, tags=form.tags.data, image_url=form.image_url.data, image_public_id=form.image_public_id.data, url_link=form.url_link.data, github_link=form.github_link.data)
        print(project)
        db.session.add(project)
        db.session.commit()
        flash('Your post has been created!', 'success')
    return render_template('create_project.html', form=form)

@projects.route("/projects/<int:project_id>/update", methods=['GET', 'POST'])
@login_required
def update_project(project_id):
    project = Project.query.get_or_404(project_id)
    form = ProjectForm()
    if form.validate_on_submit():
        project.title = form.title.data
        project.description = form.description.data
        project.comments = form.comments.data
        project.image_url = form.image_url.data
        project.image_public_id = form.image_public_id.data
        project.url_link = form.url_link.data
        project.github_link = form.github_link.data
        project.tags = form.tags.data
        db.session.commit()
        flash('Your project has been updated!', 'success')
    elif request.method == 'GET':
        form.title.data = project.title
        form.description.data = project.description
        form.comments.data = project.comments
        form.url_link.data = project.url_link
        form.image_url.data = project.image_url
        form.image_public_id.data = project.image_public_id 
        form.github_link.data = project.github_link
        form.tags.data = project.tags
    return render_template('create_project.html', title='Update Project',
                           form=form, legend='Update Project')