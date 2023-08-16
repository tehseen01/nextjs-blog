import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a full name"],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: [true, "This username already exists!"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dayo1mpv0/image/upload/v1683686792/default/profile.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followingTags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
