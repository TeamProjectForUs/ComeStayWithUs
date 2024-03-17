import mongoose, { Schema, SchemaType } from "mongoose";
import { IUser } from "./user_model";
import { IComment } from "./post_comment";

export interface IPost {
  title: string;
  message: string;
  owner: Schema.Types.ObjectId | IUser;
  comments: (Schema.Types.ObjectId | IComment)[];
  post_owner_first_name: string,
  post_owner_last_name: string,
  date_start: Date,
  date_end: Date,
  imgUrl?: string,
  location: string,
  kosher_home: boolean,
  shabat_save: boolean,
  animals_home: boolean,
  handicap_home: boolean
}

const postScheme = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required:false,
    default: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
  },
  message: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post_owner_first_name: {
    type: String,
    required:true
  },
  post_owner_last_name: {
    type: String,
    required:true
  },
  date_start: {
    type: Date,
    required:true
  },
  date_end: {
    type: Date,
    required:true
  },
  location: {
    type: String,
    required:true
  },
  kosher_home: {
    type: Boolean,
    required:true
  },
  shabat_save: {
    type: Boolean,
    required:true
  },
  animals_home: {
    type: Boolean,
    required:true
  },
  handicap_home: {
    type: Boolean,
    required:true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

export default mongoose.model<IPost>("Post", postScheme);
