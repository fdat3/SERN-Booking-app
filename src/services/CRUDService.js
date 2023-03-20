import bcrypt from 'bcryptjs'
import db from "../models/index"


const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordBcrypt = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === "1" ? true : false,
                phoneNumber: data.phoneNumber,
                roleId: data.roleId
            })
            resolve('Create New User Succesful!')
        } catch (e) {
            reject(e)
        }
    })

}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser
}