import db from "../models/index";

let getDoctor = (limitInput) => {
    return new Promise((resolve, reject) => {
        try {
            let doctors = db.Users.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attribute: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attribute: ['value_en', 'value_vi'] },
                    { model: db.Allcode, as: 'genderData', attribute: ['value_en', 'value_vi'] }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = getDoctor