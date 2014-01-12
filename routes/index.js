
/*
 * GET home page.
 */


exports.index = function(req, res) {
  nav(req, res);
  res.render('index', { title: 'Express', navProps: navProps});
};
