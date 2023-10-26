import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dwiylz9ql/image/upload/v1667934940/sc-media/fst7pdgy4oucez13adob.jpg",
    },
    provider: {
      type: String,
      required: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Users = models.user || model("user", userSchema);

export default Users;
