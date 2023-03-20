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

let getAllUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            })
            resolve(users)
        } catch (error) {
            reject(error)
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

let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.gender = data.gender;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.roleId = data.roleId;
                user.email = data.email;
                user.password = data.password;

                await user.save()
                let allUser = await db.User.findAll();
                resolve(allUser)
            } else {
                resolve()
            }
        } catch (e) {
            console.log(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    updateUserData: updateUserData,
}