import User from '@/server/models/userModels'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        var user = await User.findOne({ email })
        if (user) {
            return res.send('User already exit')
        }
        user = await new User({ name, email, password })

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword

        await user.save()
        res.send('Registered Success')
    } catch (err) {
        res.status(400).send('Register failed')
    }
}