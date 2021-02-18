"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    JWTSecret: process.env.JWT_SECRET || 'ola',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/task-manager',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
};
