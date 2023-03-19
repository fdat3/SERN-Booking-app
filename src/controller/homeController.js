let getHomePage = (req, res) => {
    return res.render("home.ejs")
}


module.exports = {
    //key:       value
    getHomePage: getHomePage
}