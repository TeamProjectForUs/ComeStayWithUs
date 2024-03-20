"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_post_model_1 = __importDefault(require("../models/user_post_model"));
const base_controller_1 = require("./base_controller");
const user_model_1 = __importDefault(require("../models/user_model"));
class UserPostController extends base_controller_1.BaseController {
    constructor() {
        super(user_post_model_1.default);
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.name) {
                    const posts = yield this.model.find({ name: req.query.name }).populate("owner");
                    res.send(posts);
                }
                else {
                    const posts = yield this.model.find().populate("owner");
                    res.send(posts);
                }
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.user._id;
            req.body.owner = _id;
            try {
                let post = yield this.model.create(req.body);
                post = yield post.populate("owner");
                yield user_model_1.default.findByIdAndUpdate({ $push: { posts: post._id } });
                res.status(201).send(post);
            }
            catch (err) {
                console.log(err);
                res.status(406).send("fail: " + err.message);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.model.findById(req.params.id).populate("owner");
                res.send(post);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post_ = yield this.model.findById(req.params.id);
                if (post_.owner.toString() !== req.user._id.toString()) {
                    return res.status(401).json("Unauthorized");
                }
                const post = yield this.model.findByIdAndDelete(req.params.id);
                yield user_model_1.default.findByIdAndUpdate(req.user._id, { $pull: { posts: req.params.id } });
                res.status(201).send(post);
            }
            catch (err) {
                console.log(err);
                res.status(406).send("fail: " + err.message);
            }
        });
    }
    putById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.model.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false });
                res.status(201).send(post);
            }
            catch (err) {
                console.log(err);
                res.status(406).send("fail: " + err.message);
            }
        });
    }
}
exports.default = new UserPostController();
//# sourceMappingURL=user_post_controller.js.map