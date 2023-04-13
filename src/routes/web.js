import express from "express";
import homeController from "../controller/homeController"
import userController from "../controller/userController"
import doctorController from '../controller/doctorController'

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
    // API
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-user', userController.handleGetAllUser)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/update-user', userController.handleUpdateUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/get-all-code', userController.getAllCode)

    // Doctor API
    router.get('/api/doctor', doctorController.getDoctor)
    router.get('/api/get-all-doctors', doctorController.getAllDoctor)


    return app.use("/", router)
}

module.exports = initWebRoutes;