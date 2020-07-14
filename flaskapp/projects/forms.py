from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, URL

class ProjectForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    url_link = StringField('Url Link', validators=[DataRequired(), URL()])
    github_link = StringField('Github Link', validators=[DataRequired(), URL()])
    tags = StringField('Tags', validators=[DataRequired()])
    image_url = StringField('Image url', validators=[URL()])
    image_public_id = StringField('Image public Id')
    comments = TextAreaField('Comments', validators=[DataRequired()])
    submit = SubmitField('Post')