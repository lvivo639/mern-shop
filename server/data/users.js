import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'admin',
        email: 'admin@a.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'vova',
        email: 'vova@a.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'vlad',
        email: 'vlad@a.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users