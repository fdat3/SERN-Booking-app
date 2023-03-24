import express from "express";
import homeController from "../controller/homeController"
import userController from "../controller/userController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send("Hello!")
    });

    router.get('/home', homeController.getHomePage)
    router.get('/get-crud', homeController.getCRUD)
    router.get('/display-crud', homeController.displayCRUD)
    router.get('/edit-crud', homeController.editCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)
    router.post('/update-crud', homeController.updateCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.post('/api/login', userController.handleLogin)
    console.log(router.stack)
    return app.use("/", router)
}

module.exports = initWebRoutes;