from flask import render_template, flash, redirect, url_for
from flaskapp import app
from flaskapp.forms import RegistrationForm, LoginForm

@app.route('/')
def home():
    return render_template('home.html')


@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('home'))     
    return render_template('register.html', title='Register', form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    return render_template('login.html', title='Login', form=form)