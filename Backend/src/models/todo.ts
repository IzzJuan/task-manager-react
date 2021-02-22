import { model, Schema, Document } from "mongoose";

export interface ITodo extends Document {
    todoName: string;
    userId: string;
};

const todoSchema = new Schema({
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

export default model<ITodo>("Todo", todoSchema);