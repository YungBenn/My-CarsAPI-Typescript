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
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("../models/car.model");
const logger_1 = require("./logger");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.set('strictQuery', false);
        const db = process.env.MONGODB_URI;
        try {
            yield mongoose_1.default.connect(db);
            logger_1.logger.info('DB Connected');
        }
        catch (err) {
            logger_1.logger.error(err);
        }
    });
}
exports.connect = connect;
