import db from "../models/index";

let getDoctor = (limitInput) => {
    return new Promise((resolve, reject) => {
        try {
            let doctors = db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['value_en', 'value_vi'] }
                ],
                raw: true,
                nest: true
            })

            resolve(doctors)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllDoctor = () => {
    return new Promise((resolve, reject) => {
        try {
            let doctors = db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve(doctors)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getDoctor: getDoctor,
    getAllDoctor: getAllDoctor
}