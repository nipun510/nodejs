
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var fs = require('fs')
var https = require('https')

const userData = JSON.stringify({
	'username' : 'nikumar',
	'password': 'nikumar'
})

var getOption = function(method, url, datalength = 0, token=null){
	return{
	  hostname: 'localhost',
	  port: 3443,
	  path: url,
	  method: method,
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': datalength,
	    'Authorization' : 'Bearer ' + token
	  }	
	}
}

var getUsers = function(token){
  const options = getOption('GET', '/users', 0, token);

	const req = https.request(options, (res) => {
		console.log(`statuscode: ${res.statusCode}`)
		var data = ''
		res.on('data', (d) => {
			data += d;
			
		});
		res.on('end', () => {
			process.stdout.write(data)
		});
		
	})
	req.on('error', (error) => {
	console.log(error)
	})

	req.end();

}



var signup = function(){
	const signupOptions = getOption('POST', '/users/signup')
}



var login = function(cb){
	const loginOptions = getOption('POST', '/users/login', userData.length);


	const req = https.request(loginOptions, (res) => {
		console.log(`statuscode: ${res.statusCode}`)
		var data = ''
		res.on('data', (d) => {
			data += d;
			//process.stdout.write(d)
		});
		res.on('end', () => {
			if(data && data.indexOf('{') > -1){
				jdata = JSON.parse(data);
				cb(jdata['token'])
			}
		})


	})



	req.on('error', (error) => {
		console.log(error)
	})

	req.write(userData)
	req.end()
}




login(getUsers)
