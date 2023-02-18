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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarById = exports.deleteCarById = exports.updateCarById = exports.addCarToDB = void 0;
const car_model_1 = require("../models/car.model");
function addCarToDB(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        yield car_model_1.carModel.create(payload);
    });
}
exports.addCarToDB = addCarToDB;
function updateCarById(id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        yield car_model_1.carModel.findOneAndUpdate({
            car_id: id,
        }, { $set: payload });
    });
}
exports.updateCarById = updateCarById;
function deleteCarById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield car_model_1.carModel.findOneAndDelete({
            car_id: id,
        });
    });
}
exports.deleteCarById = deleteCarById;
function getCarById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield car_model_1.carModel.findOne({ car_id: id });
    });
}
exports.getCarById = getCarById;
