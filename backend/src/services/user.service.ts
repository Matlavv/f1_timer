import userModel from '../models/user.model';

export const getAllUsers = async () => {
  return userModel.find();
};

export const getUser = async (id: string) => {
  return userModel.findOne({ _id: id });
};

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: boolean;
}) => {
  const user = new userModel(userData);
  return user.save();
};

export const updateUser = async (id: string, updateData: any) => {
  return userModel.findOneAndUpdate({ _id: id }, updateData, { new: true });
};

export const deleteUser = async (id: string) => {
  return userModel.deleteOne({ _id: id });
};
