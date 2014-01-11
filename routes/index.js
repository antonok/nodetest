
/*
 * GET home page.
 */

require('../global/nav.js')

exports.index = function(req, res) {
  console.log(nav(req, res));
  res.render('index', { title: 'Express', user: user});
};