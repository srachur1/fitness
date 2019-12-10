import dao
import json
from app import app
from flask import jsonify, request, session, render_template
		
@app.route('/login', methods=['POST'])
def login():
	_json = request.json
	#print(_json)
	_username = _json['username']
	_password = _json['password']
	
	if _username and _password:
		user = dao.login(_username, _password)
		
		if user != None:
			session['username'] = user
			return jsonify({'message' : 'User logged in successfully'})

	resp = jsonify({'message' : 'Bad Request - invalid credendtials'})
	resp.status_code = 400
	return resp

@app.route('/signup', methods=['POST'])
def signup():
	_json = request.json
	#print(_json)
	_name = _json['name']
	_email = _json['email']
	_pwd = _json['password']
	_weight = _json['weight']
	_height = _json['height']
	_age = _json['age']
	
	if _email and _name and _pwd and _weight and _height and _age:
	
		user_exist = dao.user_exist(_email)
		
		if user_exist == True:
			resp = jsonify({'message' : 'User already registered'})
			resp.status_code = 409
			return resp
		else:		
			dao.register(_email, _name, _pwd, _weight, _height, _age)
			
			resp = jsonify({'message' : 'User registered successfully'})
			resp.status_code = 201
			return resp
	else:
		resp = jsonify({'message' : 'Bad Request - invalid parameters'})
		resp.status_code = 400
		return resp

@app.route('/calculate/weight/loss', methods=['POST'])
def calculate_weight_loss():
	_json = request.json
	#print(_json)
	_weight = _json['weight']
	_height = _json['height']
	_age = _json['age']
	
	if _weight and _height and _age:
		calories  = "{0:.2f}".format(1.2 * (66 + ((6.3 * float(_weight)) + (12.9 * float(_height)) - (6.8 * float(_age)))) - 500);
		
		return jsonify({'message' : 'The Daily calories intake should be ' + str(calories) + ' calories to lose 1 pound every week.'})
	else:
		resp = jsonify({'message' : 'Bad Request - invalid parameters'})
		resp.status_code = 400
		return resp
		
@app.route('/calculate/maintain/weight', methods=['POST'])
def calculate_maintain_weight():
	_json = request.json
	#print(_json)
	_weight = _json['weight']
	_height = _json['height']
	_age = _json['age']
	
	if _weight and _height and _age:
		calories  = "{0:.2f}".format(1.2 * (66 + ((6.3 * float(_weight)) + (12.9 * float(_height)) - (6.8 * float(_age)))));
		
		return jsonify({'message' : 'The Daily Calorie Intake to maintain your current weight is ' + str(calories) + ' calories.'})
	else:
		resp = jsonify({'message' : 'Bad Request - invalid parameters'})
		resp.status_code = 400
		return resp
		
@app.route('/calculate/muscle/gain', methods=['POST'])
def calculate_muscle_gain():
	_json = request.json
	#print(_json)
	_weight = _json['weight']
	_height = _json['height']
	_age = _json['age']
	
	if _weight:
		proteins = "{0:.2f}".format(0.85 * float(_weight));
		
		return jsonify({'message' : 'You need to eat ' + str(proteins) + ' grams of protein everyday to reach your target.'})
	else:
		resp = jsonify({'message' : 'Bad Request - invalid parameters'})
		resp.status_code = 400
		return resp

@app.route('/logout')
def logout():
	if 'username' in session:
		session.pop('username', None)
	return jsonify({'message' : 'You successfully logged out'})