from flask import render_template
from flaskapp import app

@app.route('/')
def home():
    return render_template('home.html')


@app.route("/login", methods=['GET', 'POST'])
def login():
    return render_template('login.html', title='Login')