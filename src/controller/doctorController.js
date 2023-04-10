import doctorSERVICE from '../services/DOCTORService'

let getDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;

    try {
        let res = await doctorSERVICE.getDoctor(+limit);
        return res.status(200).json(res);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

module.exports = {
    getDoctor: getDoctor
}