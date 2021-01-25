import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../../models/User";
import { UserResponse } from "../../types/UserResponse";
import { Request } from "express";

const register = async (req: Request): Promise<Partial<UserResponse>> => {
  console.log(req.body);

  const existingUser = await UserModel.findOne({ email: req.body.email });
  console.log("user");
  console.log(existingUser);

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new UserModel({
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();

  const payload = {
    id: user.id,
  };

  console.log(payload);

  const token = jwt.sign(
    payload,
    process.env.SESSION_SECRET || "aslkdfjoiq12312"
  );

  return { user, token };
};

const login = async (req: Request): Promise<Partial<UserResponse>> => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    throw new Error("Invalid login");
  }

  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) {
    throw new Error("Invalid login");
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(
    payload,
    process.env.SESSION_SECRET || "aslkdfjoiq12312"
  );
  console.log("login");
  console.log(token);

  return { user, token };
};

export { register, login };
