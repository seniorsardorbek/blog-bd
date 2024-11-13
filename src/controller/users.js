import User from "../schemas/Users.js"
import { hasRole } from "../auth/hasRole.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../utils/config/config.js';

export async function getAllUsers(req, res) {
    try {
        // hasRole(req, res, ['admin'])
        let { limit = 100, skip = 0, q, by = 'created_at', order = 'asc' } = req.query || {}
        let filter = {}

        if (q) {
            filter = { fullname: { $regex: new RegExp(q, 'i') } }
        }

        limit = +limit
        skip = +skip

        const total = await User.countDocuments(filter);
        const data = await User.find(filter).sort({ [by]: order }).limit(limit).skip(limit * skip)

        res.json({ total, data, limit, skip });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}



export async function getOneUser(req, res) {
    try {
        const { userId } = req.params || {};
        const user = await User.findById(userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}
export async function verify(req, res) {
    try {

        const { id } = req.user || {};
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}


export async function register(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        const user = new User(req.body);
        const userExist = await User.findOne({ phonenumber: req.body?.phonenumber });
        if (userExist) {
            return res.status(400).send({ msg: 'Phonenumber already exists' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, 'secret', {
            expiresIn: '30d',
        });
        await user.save();
        res.status(201).json({ data: user, token });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}


export async function login(req, res) {
    try {
        const { phonenumber, password } = req.body || {};
        const user = await User.findOne({ phonenumber: phonenumber });
        if (!user) {
            return res.status(401).send({ msg: 'Invalid phonenumber or password' });
        }
        const decode = await bcrypt.compare(password, user.password);
        if (!user || !decode) {

            return res.status(401).send({ msg: 'Invalid phonenumber or password' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, 'secret', {
            expiresIn: '30d',
        });


        res.cookie('token', token, {
            httpOnly: true, // Helps secure the cookie by making it accessible only to the server
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
          });
        res.json({ data: user, token });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}


export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const updated = await User.findByIdAndUpdate(id, { ...req.body });
        res.status(201).json('Updated');
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}



export async function deleteUser(req, res) {
    try {
        const { id } = req.params || {};
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).send('User not found');
        }
        res.status(201).json('Deleted  successfully');
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}