import User from '../models/schemas/User';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import authConfig from '../config/auth';

class SessionController {

    async store(req, res) {


        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }


        const { email, password } = req.body;


        const user = await User.find({
            email: email,
        })

        if (user.length == 0) {
            return res.status(401).json({ error: 'User not found' });
        }


        const validPass = await bcrypt.compare(password, user[0]['password']);


        if (!validPass) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const userData = user[0];


        return res.json({
            userData,
            token: jwt.sign({ email: email, password: password }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });

    }


}

export default new SessionController();
