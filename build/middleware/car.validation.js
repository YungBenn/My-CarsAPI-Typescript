"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCarValidation = exports.addCarValidation = void 0;
const joi_1 = __importDefault(require("joi"));
function addCarValidation(payload) {
    const schema = joi_1.default.object({
        car_id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        brand: joi_1.default.string().required(),
        color: joi_1.default.string().allow('', null),
        price: joi_1.default.string().allow('', null),
    });
    return schema.validate(payload);
}
exports.addCarValidation = addCarValidation;
function updateCarValidation(payload) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().allow('', null),
        brand: joi_1.default.string().allow('', null),
        color: joi_1.default.string().allow('', null),
        price: joi_1.default.string().allow('', null),
    });
    return schema.validate(payload);
}
exports.updateCarValidation = updateCarValidation;
