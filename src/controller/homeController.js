import db from "../models/index"
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('---------------')
        console.log(data)
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
    console.log(messsage)
    return res.send("Send infor succesfully!")
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render("displayCRUD.ejs", { dataTable: data })
}


module.exports = {
    //key:       value
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD
}