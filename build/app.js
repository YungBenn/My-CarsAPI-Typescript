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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = require("./utils/connect");
const car_route_1 = require("./routes/car.route");
const logger_1 = require("./utils/logger");
const _404_1 = require("./middleware/404");
const auth_route_1 = require("./routes/auth.route");
const deserializedToken_1 = __importDefault(require("./middleware/deserializedToken"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(deserializedToken_1.default);
// routes
app.use('/cars', car_route_1.CarsRouter);
app.use('/user', auth_route_1.UserRouter);
// 404 handle
app.use(_404_1.error);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info(`server is running on http://localhost:${port}`);
    yield (0, connect_1.connect)();
}));
