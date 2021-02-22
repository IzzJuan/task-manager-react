"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("@google-cloud/storage");
const uuid_1 = require("uuid");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const uuidv1 = uuid_1.v1();
const router = express_1.Router();
dotenv.config();
const storage = new storage_1.Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY
    }
});
let uploadHandler = multer_1.default({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
const bucket = storage.bucket('gcs-bucket-task-manager');
router.post('/imageupload', uploadHandler.single('file'), (req, res) => {
    const newFileName = uuid_1.v1() + path_1.default.extname(req.file.originalname);
    const blob = bucket.file(newFileName);
    const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true
    }).on('finish', () => {
        const publicURL = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`;
        res.json(publicURL);
    });
    blobStream.end(req.file.buffer);
});
exports.default = router;
