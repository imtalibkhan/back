// import cookieParser from "cookie-parser";
import ErrorHandler from "../utils/ErrorHandler.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"];
  // console.log("token",token);

  if (!token) {
    // return res.status(400).json({

    // })
    return next(new ErrorHandler("Not Logged In, 401",401));
  }
  next();
};

export const authorizedAdmin = (req, res, next) => {
  if (req.user.role !== "admin" ) {
    return next(new ErrorHandler("Only admin allowed",405));
  }
  next();
};
