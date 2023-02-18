"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshSessionValidation = exports.sessionValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
function registerValidation(payload) {
    const schema = joi_1.default.object({
        user_id: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    });
    return schema.validate(payload);
}
exports.registerValidation = registerValidation;
function sessionValidation(payload) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    });
    return schema.validate(payload);
}
exports.sessionValidation = sessionValidation;
function refreshSessionValidation(payload) {
    const schema = joi_1.default.object({
        refreshToken: joi_1.default.string().required(),
    });
    return schema.validate(payload);
}
exports.refreshSessionValidation = refreshSessionValidation;
