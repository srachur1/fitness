$(document).ready(function() {
	var isLoggedIn = localStorage.getItem('loggedin');
	
	if(isLoggedIn == 1) {
		$('#sign').hide();
		$('#loginform').hide();
		$('#signupform').hide();
		$('#logoff').show();
	} else {
		$('#sign').show();
		$('#logoff').hide();
	}
	
	$('#loginSubmit').on('click', function(e) {
		e.preventDefault();
		
		var email = $('#email').val();
		var pwd = $('#password').val();
		
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
		
		if(email != "" && pwd != "" ) {
			if(!regex.test(email)) {
				$('#msg').html('<span style="color: red;">Invalid email address</span>');
			} else {
				$.ajax({
					method: "POST",
					url: '/login',
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify({'username': email, 'password': pwd}),
					dataType: "json",
					success: function(data) {
						localStorage.setItem('loggedin', 1);
						
						$('#sign').hide();
						$('#loginform').hide();
						$('#logoff').show();
						$('#msg').html('<span style="color: green;">You are logged in</span>');
					},
					statusCode: {
						400: function() {
							$('#msg').html('<span style="color: red;">Bad request - invalid credentials</span>');
						}
					},
					error: function(err) {
						console.log(err);
					}
				});
			}
		} else {
			$('#msg').html('<span style="color: red;">Invalid username and password</span>');
		}
	});
	
	$('#logout').on('click', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/logout',
			dataType: "json",
			success: function(data) {
				localStorage.setItem('loggedin', 0);
				$('#sign').show();
				$('#logoff').hide();
				$('#msg').html('<span style="color: green;">You are logged off</span>');
			},
			error: function(err) {
				console.log(err);
			}
		});
	});
	
	$('#signupSubmit').on('click', function(e) {
		e.preventDefault();
		
		var name = $('#fullname').val();
		var email = $('#email').val();
		var pwd = $('#password').val();
		var cnfpwd = $('#cnfpassword').val();
		var weight = $('#weight').val();
		var height = $('#height').val();
		var age = $('#age').val();
		
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
		
		if(email != "" && pwd != "" && cnfpwd != "" && weight != "" && height != "" && age != "") {
			if(pwd != cnfpwd) {
				$('#msg').html('<span style="color: red;">Password and confirm password must match</span>');
			} else if(!regex.test(email)) {
				$('#msg').html('<span style="color: red;">Invalid email address</span>');
			} else {
				$.ajax({
					method: "POST",
					url: '/signup',
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify({'name': name, 'email': email, 'password': pwd, 'weight': weight, 'height': height, 'age': age}),
					dataType: "json",
					success: function(data) {
						$('#signupform').hide();
						$('#logoff').hide();
						$('#msg').html('<span style="color: green;">You are registered successfully</span>');
					},statusCode: {
						400: function() {
							$('#msg').html('<span style="color: red;">Bad request parameters</span>');
						},
						409 : function() {
							$('#msg').html('<span style="color: red;">You are already registered user</span>');
						}
					},
					error: function(err) {
						console.log(err);
					}
				});
			}
		} else {
			$('#msg').html('<span style="color: red;">All fields are required</span>');
		}
	});
});