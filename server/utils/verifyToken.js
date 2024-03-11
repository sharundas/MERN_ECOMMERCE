import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) return next(errorHandler(401, 'Unauthorized'));

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(errorHandler(403, 'Forbidden'));

//     req.user = user;
//     next();
//   });
// };

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return next(errorHandler(403, 'Forbidden'));
    }

    // Optionally, you can attach the decoded token to the req object
    req.decodedToken = decodedToken;

    next();
  });
};