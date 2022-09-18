const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const userId = req.headers["userid"];

  if (token) {
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "unauthorized" });
      } else {

        if (decoded.id === userId) {
          next();
        } else {
          res
            .status(401)
            .json({ msg: "unauthorized, you are not logined user" });
        }
      }
    });
  } else {
    res.status(401).json({ msg: "unauthorized , no token" });
  }
};

module.exports = { protect };
