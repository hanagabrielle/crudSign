import UserModel from "../../domain/entities/User.js";

export async function create(user) {
  const userModel = new UserModel(user);
  await userModel.save();
}

export async function findByEmail(email) {
  return UserModel.findOne({ email });
}

export async function findById(id) {
  return UserModel.findById(id);
}

export async function update(user) {
  await UserModel.findByIdAndUpdate(user.id, user);
}
