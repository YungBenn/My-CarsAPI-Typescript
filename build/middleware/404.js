"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const error = (req, res) => {
    res.status(404).json({
        status: '404',
        message: 'This page does not exist',
    });
};
exports.error = error;
