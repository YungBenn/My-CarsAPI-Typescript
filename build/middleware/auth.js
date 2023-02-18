"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
function requireUser(req, res, next) {
    const user = res.locals.user;
    if (!user) {
        res.sendStatus(403).json({
            message: 'Login required',
        });
        return next();
    }
    return next();
}
exports.requireUser = requireUser;
