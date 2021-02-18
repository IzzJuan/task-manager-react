import { Request, Response } from 'express';
import { use } from 'passport';
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/user'
import config from '../config/config'

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.JWTSecret);
}

export const signup = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'Envia los campos de correo o password' });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: 'El email proporcionado ya esta en uso' });
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json({ id: newUser._id });
}

export const login = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'Envia los campos de correo o password' });
    }
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).json({ msg: 'el usuario no existe' })
    }

    const isMatch = await user.comparePassword(req.body.password);

    if (isMatch) {
        return res.status(200).json({ token: createToken(user), id: user._id, name: user.name });
    }

    return res.status(400).json({ msg: 'correo o contraseña no coinciden' })
}
