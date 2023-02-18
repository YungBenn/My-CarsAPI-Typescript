"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.post('/register', auth_controller_1.registerUser);
exports.UserRouter.post('/login', auth_controller_1.createSession);
exports.UserRouter.post('/refresh', auth_controller_1.refreshSession);
