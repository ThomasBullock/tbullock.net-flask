from datetime import datetime
from flaskapp import db, login_manager
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False,
                           default='default.png')
    password = db.Column(db.String(60), nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)

    #magic method how our object is printed when we print it out
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False,
                            default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    is_live = db.Column(db.Boolean)
    tags = db.Column(db.String(150))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"

class Project(db.Model, SerializerMixin):
    serialize_only = ('id', 'title', 'description', 'comments', 'image_url', 'image_public_id', 'url_link', 'github_link', 'tags', 'date_launched')
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    comments = db.Column(db.String(500), nullable=False)
    image_url = db.Column(db.String(200))
    image_public_id = db.Column(db.String(200))
    url_link = db.Column(db.String(200))
    github_link = db.Column(db.String(200))
    date_launched = db.Column(db.DateTime, nullable=False,
                            default=datetime.utcnow)
    tags = db.Column(db.String(150))