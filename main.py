import rest
from app import app
from flask import render_template
from datetime import datetime

@app.context_processor
def inject_now():
    return {'now': datetime.utcnow()}

@app.route('/')
def home():
	return render_template('index.html')
	
@app.route('/login/page')
def login_page():
	return render_template('login.html')
	
@app.route('/signup/page')
def singup_page():
	return render_template('signup.html')
	
@app.route('/weightloss')
def weightloss():
	return render_template('weightloss.html')
	
@app.route('/musclegain')
def musclegain():
	return render_template('musclegain.html')
	
@app.route('/maintainweight')
def maintainweight():
	return render_template('maintainweight.html')
	
@app.route('/body/upper')
def body_upper():
	return render_template('body-upper.html')
	
@app.route('/body/lower')
def body_lower():
	return render_template('body-lower.html')
	
@app.route('/body/whole')
def body_whole():
	return render_template('body-whole.html')

@app.route('/products')
def products():
	return render_template('products.html')	
	
@app.route('/about')
def about():
	return render_template('about.html')
		
if __name__ == "__main__":
    app.run()