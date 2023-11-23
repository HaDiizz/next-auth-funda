import User from "@/server/models/userModel";
import connectDB from "@/server/database/mongodb";

connectDB();

export const findOneUserByEmailAndProvider = async ({ email, provider }) => {
  try {
    let user = await User.findOne({ email, provider });
    if (!user) {
      return {};
    }
    user = user._doc;
    return { user: { ...user, _id: user._id.toString() } };
  } catch (error) {
    return { error: "Failed to find the user." };
  }
};
