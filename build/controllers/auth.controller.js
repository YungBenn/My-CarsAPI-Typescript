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
exports.refreshSession = exports.createSession = exports.registerUser = void 0;
const uuid_1 = require("uuid");
const logger_1 = require("../utils/logger");
const hashing_1 = require("../utils/hashing");
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
const auth_validation_1 = require("../middleware/auth.validation");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.body.user_id = (0, uuid_1.v4)();
        const { value } = (0, auth_validation_1.registerValidation)(req.body);
        try {
            value.password = (0, hashing_1.hashing)(value.password);
            yield (0, auth_service_1.createUser)(value);
            logger_1.logger.info('New user added');
            res.status(201).json({
                message: 'Success register user',
            });
        }
        catch (err) {
            logger_1.logger.error(err);
            res.status(422).json({
                message: 'Failed to register',
            });
        }
    });
}
exports.registerUser = registerUser;
function createSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { value } = (0, auth_validation_1.sessionValidation)(req.body);
        try {
            const user = yield (0, auth_service_1.findUserByEmail)(value.email);
            const isValid = (0, hashing_1.checkPassword)(value.password, user.password);
            if (!isValid) {
                logger_1.logger.error('Invalid email or password');
                res.status(404).json({
                    message: 'Invalid email or password',
                });
            }
            const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1h' });
            const refreshToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1d' });
            return res.status(200).send({
                message: 'Success register user',
                data: { accessToken, refreshToken },
            });
        }
        catch (err) {
            logger_1.logger.error(err);
            res.status(422).json({
                message: 'Failed to login',
            });
        }
    });
}
exports.createSession = createSession;
function refreshSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { value } = (0, auth_validation_1.refreshSessionValidation)(req.body);
        try {
            const { decoded } = (0, jwt_1.verifyJWT)(value.refreshToken);
            const user = yield (0, auth_service_1.findUserByEmail)(decoded._doc.email);
            if (!user) {
                return false;
            }
            const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1d' });
            return res.status(200).send({
                message: 'Refresh session success ',
                data: { accessToken },
            });
        }
        catch (err) {
            logger_1.logger.error(err);
            res.status(422).json({
                message: 'Failed to refresh session',
            });
        }
    });
}
exports.refreshSession = refreshSession;
