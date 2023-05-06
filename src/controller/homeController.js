import db from "../models/index"
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("home.ejs", { data: JSON.stringify(data) })
    } catch (e) {
        console.log(e)
    }
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req, res) => {
    let messsage = await CRUDService.createNewUser(req.body)
    return res.send("Send infor succesfully!")
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render("displayCRUD.ejs", { dataTable: data })
}

let editCRUD = async (req, res) => {

    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserById(userId)
        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        return res.send('Can not find user !')
    }

}

let updateCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDService.deleteUser(userId)
        return res.send('Delete user success !')
    } else {
        return res.send("can not found !")
    }
}

let handleLogin = async (req, res) => {
    return res.send("Success")
}

module.exports = {
    //key:       value
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    updateCRUD: updateCRUD,
    deleteCRUD: deleteCRUD,
    handleLogin: handleLogin
}