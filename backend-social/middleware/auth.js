// jwt is used to securely transmitting the data b/w client and server
// and also the authorization and authentication in web apps
// have 3 parts header, payload and signature
// header : how the jwt is encoded and signed.
// payload : statement about an entity like user information or permission
// signature : Ensures the integrity of token and verifies that it hasn't been tampered with.

import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied!");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, "BariloAthiBariString");
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export default verifyToken;
