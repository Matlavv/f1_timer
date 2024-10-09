import userModel from '../models/user.model';

export const getAllUsers = async () => {
  return userModel.find();
};

export const getUser = async (id: string) => {
  return userModel.findOne({ _id: id });
};

export const updateUser = async (id: string, updateData: any) => {
  return userModel.findOneAndUpdate({ _id: id }, updateData, { new: true });
};

export const deleteUser = async (id: string) => {
  return userModel.deleteOne({ _id: id });
};
