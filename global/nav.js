/*
 * Global nav.
 */

nav = function(req, res) {
	var isLoggedin = false;
	if (req.session.loggedin) {
		isLoggedin = true;
	}

	navProps = {user: {loggedin: isLoggedin},
					currentUrl: req.req
					};
};