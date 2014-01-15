
/*
 * Signin and out.
 */

exports.index = function(req, res) {
  nav(req, res);
  res.render('signin', { title: 'Sign In', user: navProps});
};

exports.dosign = function(req, res) {
  nav(req, res);
  var token = req.query.t;
  console.log('doSignin with token: ' + token);
  lookupToken(token, function(email) {
  	console.log('found ' + email + ' for token ' + token);

  	req.session.loggedin = true;
  	req.session.name = email.substr(0, email.indexOf('@'));
  	res.redirect('/');	
  });
  
}

exports.dosignPost = function(req, res) {
	nav(req, res);
	var emailAddress = req.body.email;
	var token = shortGuid();
	storeToken(emailAddress, token);
	emailToken(emailAddress, token);
	res.render('dosignin', {title: 'Creating a signin for ya', user: navProps, email: emailAddress});
}

exports.dosignout = function(req, res) {
  req.session.loggedin = false;
  res.redirect('/');
}


emailToken = function(emailAddress, token) {
	console.log('emailToken method (' + emailAddress +', ' + token + ')')
	var mail = require("nodemailer").mail;

	mail({
    	from: "About.biz <akokarski@gmail.com>", // sender address
    	to: emailAddress,
    	subject: "Signin Link for about.biz",
    	text: "here is your sign in link: http://cats.goldmaple.net:3000/dosignin?t=" + token,
    	html: "here is your sign in link <a href='http://cats.goldmaple.net:3000/dosignin?t=" + token + "'>signin</a>"
	});
	console.log('done sending email');
}

shortGuid = function() {
	return s4() + s4();
}

guid = function() {
	return  s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

s4 = function() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

storeToken = function(emailAddress, token) {
	var collection = db.get('tokens');
	collection.insert({
					"token": token, 
					"email": emailAddress
				}
	), function(err, doc) {
		if (err) {
			console.log('problem storing ' + token + "->" + emailAddress);
		} else {
			console.log('stored ' + token + "->" + emailAddress + " ok.");
		}
	}
}

lookupToken = function(token, cb) {
	var collection = db.get('tokens');
	collection.findOne({token: token}, function (err, item) {
		console.log('>>>found ' + item.email);
		cb(item.email);
	});
}


