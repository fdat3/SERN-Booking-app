import express from "express";
import homeController from "../controller/homeController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send("Hello!")
    });

    router.get('/home', homeController.getHomePage)
    router.get('/get-crud', homeController.getCRUD)
    router.get('/display-crud', homeController.displayCRUD)
    router.post('/post-crud', homeController.postCRUD)
    return app.use("/", router)
}

module.exports = initWebRoutes;