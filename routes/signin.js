
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

exports.dosignout = function(req, res) {
  req.session.loggedin = false;
  res.redirect('/');
}