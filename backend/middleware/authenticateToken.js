const jwt = require("jsonwebtoken");
const jwtConfig = require('../config/auth.js');

function authenticateToken(req, res, next) {
  // const token = req.headers['authorization']?.split(' ')[1];
  // if (token == null) return res.sendStatus(401);

  // try {
  //   jwt.verify(token, jwtConfig.secret, (err, user) => {
  //     if (err) return res.sendStatus(403);
  //     req.role = user.role;
  //     req.user = user;
  //     next();
  //   });
  // }
  // catch (err) {
  //   console.log(err);
  //   return res.sendStatus(500);
  // }
  next()
}

module.exports = authenticateToken;
