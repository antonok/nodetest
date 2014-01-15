
/*
 * Signin and out.
 */

exports.index = function(req, res) {
  nav(req, res);
  res.render('signin', { title: 'Sign In', user: navProps});
};

exports.dosign = function(req, res) {
  nav(req, res);
  req.session.loggedin = true;
  res.redirect('/');
}

exports.dosignPost = function(req, res) {
	nav(req, res);
	var emailAddress = req.body.email;
	emailToken(emailAddress)
	res.render('dosignin', {title: 'Creating a signin for ya', user: navProps, email: emailAddress});
}

exports.dosignout = function(req, res) {
  req.session.loggedin = false;
  res.redirect('/');
}


emailToken = function(emailAddress) {
	console.log('emailToken method (' + emailAddress +')')
	var mail = require("nodemailer").mail;

	mail({
    	from: "About.biz <noreply@about.biz>", // sender address
    	to: emailAddress,
    	subject: "Signin Link for about.biz",
    	text: "here is your sign in link: http://localhost:3000/dosignin",
    	html: "here is your sign in link <a href='http://localhost:3000/dosignin'>signin</a>"
	});
	console.log('done sending email');
}

