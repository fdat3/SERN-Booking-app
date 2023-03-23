import db from '../models/index'
import bcrypt from 'bcryptjs'


let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    attribute: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                })
                if (user) {
                    let checkPass = await bcrypt.compareSync(password, user.password)
                    if (checkPass) {
                        userData.errCode = 0;
                        userData.message = 'Connection Success'

                        delete user.password;
                        //delete user pass
                        userData.user = user;
                    } else {
                        userData.errCode = 1;
                        userData.message = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'User not found'
                }
            } else {
                userData.errCode = 1;
                userData.message = 'Your email or password is not exist!'
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userEmail = await db.User.findOne({
                where: { email: email }
            })
            if (userEmail) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
}