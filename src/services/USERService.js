import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            console.log(hashPassword)
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    attribute: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,
                })
                console.log(user)
                console.log({ user })
                if (user) {
                    console.log(user.password)
                    let checkPass = await bcrypt.compareSync(password, user.password)
                    if (checkPass) {
                        userData.errCode = 0;
                        userData.message = 'Connection Success'

                        delete user.password;
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
            console.log(userData)
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

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: { exclude: ['password'] }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: ['password'] }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email);
            if (check) {
                resolve({
                    message: 'This mail was exist, pls try another mail!'
                })
            } else {
                let hashPassword = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: hashPassword,
                    gender: data.gender,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'Create New User Success !'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'Missing input!'
                })
            }
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.gender = data.gender;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                if (data.avatar) {
                    user.image = data.avatar
                }

                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update User Success!'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    message: 'Delete User Success!'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'Can not found user!'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getAllCode = (typeParam) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeParam) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing type!'
                })
            } else {
                let response = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeParam }
                });
                response.errCode = 0;
                response = allCode;
                resolve(response)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllCode: getAllCode
}