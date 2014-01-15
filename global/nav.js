/*
 * Global nav.
 */

nav = function(req, res) {
	var isLoggedin = false;
	var name = '';
	if (req.session.loggedin) {
		isLoggedin = true;
		name = req.session.name;
	}

	navProps = {user: {loggedin: isLoggedin, name: name},
					currentUrl: req.req
					};
};