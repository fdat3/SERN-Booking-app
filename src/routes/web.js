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
    router.get('/api/get-all-user', userController.handleGetAllUser)

    router.post('/update-crud', homeController.updateCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.post('/api/login', userController.handleLogin)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.post('/api/update-user', userController.handleUpdateUser)
    router.get('/api/delete-user', userController.handleDeleteUser)



    return app.use("/", router)
}

module.exports = initWebRoutes;