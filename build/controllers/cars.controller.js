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
exports.deleteCar = exports.updateCar = exports.getCar = exports.getAllCars = exports.addCar = void 0;
const uuid_1 = require("uuid");
const logger_1 = require("../utils/logger");
const car_model_1 = require("../models/car.model");
const car_validation_1 = require("../middleware/car.validation");
const car_service_1 = require("../services/car.service");
// Add new car
function addCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.body.car_id = (0, uuid_1.v4)();
        const { value } = (0, car_validation_1.addCarValidation)(req.body);
        try {
            yield (0, car_service_1.addCarToDB)(value);
            logger_1.logger.info('New car added');
            res.status(201).json({
                message: 'Success add new car',
            });
        }
        catch (err) {
            logger_1.logger.error(err);
            res.status(422).json({
                message: 'Failed to add new car',
            });
        }
    });
}
exports.addCar = addCar;
// get all cars
function getAllCars(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query;
        car_model_1.carModel.find(query, (err, data) => {
            if (err) {
                logger_1.logger.error('error');
            }
            else {
                logger_1.logger.info('Success to get data');
                res.status(200).json({
                    status: 200,
                    data: data,
                });
            }
        });
    });
}
exports.getAllCars = getAllCars;
// get a car by id
function getCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { params: { id }, } = req;
        try {
            const car = yield (0, car_service_1.getCarById)(id);
            if (!car) {
                logger_1.logger.error('Your car id is wrong');
                res.status(200).json({
                    status: 200,
                    message: 'Your car id is wrong',
                    data: car,
                });
            }
            else {
                logger_1.logger.info('Success to get a car');
                res.status(200).json({
                    status: 200,
                    message: 'Data found',
                    data: car,
                });
            }
        }
        catch (error) {
            logger_1.logger.error(error);
            res.status(404).json({
                message: 'Failed to get',
            });
        }
    });
}
exports.getCar = getCar;
// update a car
function updateCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { params: { id }, } = req;
        const { error, value } = (0, car_validation_1.updateCarValidation)(req.body);
        if (error) {
            logger_1.logger.error(error);
            res.status(442).json({
                message: 'Failed to update',
            });
        }
        else {
            yield (0, car_service_1.updateCarById)(id, value);
            logger_1.logger.info('car updated');
            res.status(200).json({
                message: 'Success update a car',
            });
        }
    });
}
exports.updateCar = updateCar;
// delete a car
function deleteCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { params: { id }, } = req;
        try {
            yield (0, car_service_1.deleteCarById)(id);
            logger_1.logger.info('car deleted');
            res.status(200).json({
                message: 'Success delete a car',
            });
        }
        catch (err) {
            logger_1.logger.error(err);
            res.status(404).json({
                message: 'Failed to delete',
            });
        }
    });
}
exports.deleteCar = deleteCar;
function textRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
