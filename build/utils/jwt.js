"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJWT(payload, options) {
    return jsonwebtoken_1.default.sign(payload, process.env.PRIVATE_KEY, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
}
exports.signJWT = signJWT;
function verifyJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.PUBLIC_KEY);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: 'jwt is expired',
            decoded: null,
        };
    }
}
exports.verifyJWT = verifyJWT;
