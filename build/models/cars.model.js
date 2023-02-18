"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carModel = void 0;
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    car_id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
    },
}, { timestamps: true });
exports.carModel = (0, mongoose_1.model)('Car', carSchema);
