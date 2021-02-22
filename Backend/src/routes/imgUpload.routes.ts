import { Router, Request, Response } from 'express';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import { v1 as uuid } from 'uuid';
import * as dotenv from 'dotenv';
import path from 'path'
const uuidv1: string = uuid();
const router = Router();

dotenv.config();

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY
    }
})

let uploadHandler = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const bucket = storage.bucket('gcs-bucket-task-manager');

router.post('/imageupload', uploadHandler.single('file'), (req: Request, res: Response) => {

    const newFileName = uuid() + path.extname(req.file.originalname);
    const blob = bucket.file(newFileName);
    const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true
    }).on('finish', () => {
        const publicURL = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`
        res.json(publicURL);
    });
    blobStream.end(req.file.buffer);
})

export default router;