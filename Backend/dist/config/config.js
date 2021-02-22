"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    JWTSecret: process.env.JWT_SECRET || 'ola',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://juanjog:adminmaster@cluster0.fnss9.mongodb.net/taskManagerDatabase?w=majority&retryWrites=truemongodb://localhost/task-manager',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
};
