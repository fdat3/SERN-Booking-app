import doctorSERVICE from '../services/DOCTORService'

let getDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 5;

    try {
        let response = await doctorSERVICE.getDoctor(+limit);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let response = await doctorSERVICE.getAllDoctor()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let createDoctorInfo = async (req, res) => {
    try {
        let response = await doctorSERVICE.createDoctorInfo(req.body)
        return res.status(200).json(response)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getDoctorDetail = async (req, res) => {
    try {
        let response = await doctorSERVICE.getDoctorDetail(req.query.id)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

module.exports = {
    getDoctor: getDoctor,
    getAllDoctor: getAllDoctor,
    createDoctorInfo: createDoctorInfo,
    getDoctorDetail: getDoctorDetail
}