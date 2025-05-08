import dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";
import { IUser } from "../domain/user";

const UserSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: String,
  email: String,
}, { timestamps: true });

class UserModel extends Item implements IUser {
  id!: string;
  name!: string;
  email!: string;
}

export const client = dynamoose.model<UserModel>("User", UserSchema);
