import { UserErrors } from "../constants/userError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return res
          .status(400)
          .json({ error: UserErrors.USERNAME_ALREADY_EXISTS });
      } else {
        return res
          .status(400)
          .json({ error: UserErrors.EMAIL_ID_ALREADY_EXIST });
      }
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json("User Created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const ValidUser = await User.findOne({ email });
    if (!ValidUser)
      return res.status(400).json({ error: UserErrors.NO_USER_FOUND });
    const IsPasswordValid =  bcrypt.compareSync(password, ValidUser.password);
    if (!IsPasswordValid) {
      return res.status(400).json({ error: UserErrors.WRONG_CREDENTIALS });
    }
    const token = jwt.sign({ id: ValidUser._id }, process.env.JWT);
    const { password: pass, ...rest } = ValidUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
