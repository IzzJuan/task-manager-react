"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const todoSchema = new mongoose_1.Schema({
    todoName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    todoPriority: {
        type: String,
        required: true
    },
    todoImg: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.model("Todo", todoSchema);
