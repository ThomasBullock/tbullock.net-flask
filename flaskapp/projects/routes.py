from flask import (render_template, Blueprint, flash)
from flaskapp.projects.forms import ProjectForm
from flaskapp import db
from flaskapp.models import Project
from flask_login import login_required

projects = Blueprint('projects', __name__)

@projects.route("/projects")
def all_projects():
    projects = Project.query.all()
    return render_template('projects.html', projects=projects)

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