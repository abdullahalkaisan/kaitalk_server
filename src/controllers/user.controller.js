import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const resAllUsers = await User.find({ completeProfile: true });

    res.status(200).json(resAllUsers);
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
