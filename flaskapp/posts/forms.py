from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, TextAreaField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    tags = StringField('Tags', validators=[DataRequired()])
    is_live = BooleanField('Is Live')
    content = TextAreaField('Content', validators=[DataRequired()])
    submit = SubmitField('Post')