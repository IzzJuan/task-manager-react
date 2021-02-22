import express, { urlencoded } from "express";
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport'

import authRoutes from './routes/auth.routes'
import todoRoutes from './routes/todo.routes'
import imgUploadRoutes from './routes/imgUpload.routes'
import privateRoutes from './routes/private.routes'

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

app.use(authRoutes);
app.use(todoRoutes);
app.use(imgUploadRoutes);
app.use(privateRoutes);

export default app;