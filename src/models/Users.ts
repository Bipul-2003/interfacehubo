import mongoose, { Schema, Document, Model } from "mongoose";

enum role {
  admin = 1,
  user = 2,
  instuctor = 3,
}

export interface UserType extends Document {
  username: string;
  email: string;
  phonenumber: string;
  password: string;
  firstname: string;
  middlename: string;
  lastname: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpire: Date;
  role: role;
}

const UserSchema: Schema<UserType> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
      trim: true
    },
    firstname: {
      type: String,
      required: [true, "Firstname required"],
      trim: true,
    },
    middlename: {
      type: String,
      default: "",
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Lastname required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g,
        "Invalid email",
      ],
    },
    phonenumber: {
      type: String,
      required: true,
      match: [
        /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        "Invalid phone number",
      ],
      validate: {
        validator: function (v: string) {
          return /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      required: [true, "verifyCode required"],
    },
    verifyCodeExpire: {
      type: Date,
      required: [true, "verifyCodeExp required"],
    },
    role: {
      type: Number,
      default: role.user,
    }
  },
  { timestamps: true }
);
const UserModel:Model<UserType> = mongoose.models?.User || mongoose.model<UserType>('User', UserSchema);
export default UserModel

