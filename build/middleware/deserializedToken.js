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
const jwt_1 = require("../utils/jwt");
function deserializedToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/^Bearer\s/, '');
        if (!accessToken) {
            return next();
        }
        const token = (0, jwt_1.verifyJWT)(accessToken);
        if (token.decoded) {
            res.locals.user = token.decoded;
            return next();
        }
        if (token.expired) {
            return next();
        }
        return next();
    });
}
exports.default = deserializedToken;
