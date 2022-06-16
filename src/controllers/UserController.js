import User from '../models/schemas/User';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';




class UserController {

    async store(req, res) {

        const schema = Yup.object().shape({
            profile: Yup.object({
                name: Yup.string().required(),
            }),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { profile, email, password } = req.body;


        const password_hash = await bcrypt.hash(password, 8);


        try {

            const userData = await User.create({
                profile: profile,
                email: email,
                password: password_hash
            });

            return res.json(userData);

        } catch (error) {
            return res.status(400).json(error.message);
        }



    }




}

export default new UserController();
