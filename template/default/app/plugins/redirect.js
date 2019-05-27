
var config = require('config');

module.exports = ({app}) => {
  app.get('*', async (req, res, next) => {
    if (req.headers["x-forwarded-proto"] === 'http') {
      res.redirect('https://' + req.headers.host + req.url);
    }
    else {
      next();
    }
  });
};
