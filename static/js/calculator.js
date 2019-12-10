$(document).ready(function() {
	
	$('#maintainweight').on('click', function(e) {
		e.preventDefault();
		
		var weight = $('#weight').val();
		var height = $('#height').val();
		var age = $('#age').val();
		
		if(weight != "" && height != "" && age != "") {
			$.ajax({
				method: "POST",
				url: '/calculate/maintain/weight',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({'weight': weight, 'height': height, 'age': age}),
				dataType: "json",
				success: function(data) {
					$('#msg').html('<span style="color: green;">' + data.message + '</span>');
				},statusCode: {
					400: function() {
						$('#msg').html('<span style="color: red;">Bad request parameters</span>');
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		} else {
			$('#msg').html('<span style="color: red;">All fields are required</span>');
		}
	});
	
	$('#musclegain').on('click', function(e) {
		e.preventDefault();
		
		var weight = $('#weight').val();
		var height = $('#height').val();
		var age = $('#age').val();
		
		if(weight != "" && height != "" && age != "") {
			$.ajax({
				method: "POST",
				url: '/calculate/muscle/gain',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({'weight': weight, 'height': height, 'age': age}),
				dataType: "json",
				success: function(data) {
					$('#msg').html('<span style="color: green;">' + data.message + '</span>');
				},statusCode: {
					400: function() {
						$('#msg').html('<span style="color: red;">Bad request parameters</span>');
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		} else {
			$('#msg').html('<span style="color: red;">All fields are required</span>');
		}
	});
	
	$('#weightloss').on('click', function(e) {
		e.preventDefault();
		
		var weight = $('#weight').val();
		var height = $('#height').val();
		var age = $('#age').val();
		
		if(weight != "" && height != "" && age != "") {
			$.ajax({
				method: "POST",
				url: '/calculate/weight/loss',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({'weight': weight, 'height': height, 'age': age}),
				dataType: "json",
				success: function(data) {
					$('#msg').html('<span style="color: green;">' + data.message + '</span>');
				},statusCode: {
					400: function() {
						$('#msg').html('<span style="color: red;">Bad request parameters</span>');
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		} else {
			$('#msg').html('<span style="color: red;">All fields are required</span>');
		}
	});
	
});