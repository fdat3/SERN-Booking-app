import userService from '../services/USERService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Your email or password is not exist!'
        })
    }


    let userData = await userService.handleLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req, res) => {

    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing Input!',
            user: []
        })
    }

    let users = await userService.getAllUser(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Already found user!',
        users
    })
}



module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser
}