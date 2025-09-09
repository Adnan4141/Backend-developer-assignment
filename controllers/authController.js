import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler";
import UserModel from "../models/UserModel";
import { generateAccessToken, generateRefreshToken } from "../utils/generatToken/GenreateToken";



export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return next(errorHandler(400, "All fields are required"));

    const userExists = await UserModel.findOne({ email });
    if (userExists) return next(errorHandler(400, "Email already registered"));

    const user = await UserModel.create({ name, email, password, role });

    return successHandler(
      res,
      201,
      {
        user: {
          _id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "User registered successfully"
    );
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(errorHandler(400, "Email and password are required"));

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) return next(errorHandler(401, "Invalid credentials"));

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return next(errorHandler(401, "Invalid credentials"));

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.updateLastLogin();
    await user.save();

   
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return successHandler(
      res,
      200,
      {
        user: {
          _id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        refreshToken,
      },
      "Login successful"
    );
  } catch (err) {
    next(err);
  }
};


export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return next(errorHandler(401, "Refresh token is required"));

    const user = await UserModel.findOne({ refreshToken });
    if (!user) return next(errorHandler(403, "Invalid refresh token"));

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err) => {
      if (err) return next(errorHandler(403, "Invalid or expired refresh token"));

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      user.refreshToken = newRefreshToken;
      user.save();

      // Update cookie
      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, 
      });

      return successHandler(
        res,
        200,
        { refreshToken: newRefreshToken },
        "Token refreshed successfully"
      );
    });
  } catch (err) {
    next(err);
  }
};


export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return next(errorHandler(400, "Refresh token is required"));

    const user = await UserModel.findOne({ refreshToken });
    if (!user) return next(errorHandler(400, "Invalid refresh token"));

    user.refreshToken = null;
    await user.save();

  
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return successHandler(res, 200, {}, "Logged out successfully");
  } catch (err) {
    next(err);
  }
};


