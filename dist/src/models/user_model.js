"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    // first_name:  {
    //   type: String,
    //   required:true
    // },
    // last_name:  {
    //   type: String,
    //   required:false
    // },
    password: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
    },
    // posts: [{type: Schema.Types.ObjectId, ref:"User"}],
    // refreshTokens: {
    //   type: [String],
    //   required: false,
    // },
});
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user_model.js.map