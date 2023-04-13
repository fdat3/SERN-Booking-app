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

let createDoctorInfo = (data) => {
    return new Promise((resolve, reject) => {
        try {
            if (!data) {
                resolve('Missing data')
            } else {
                db.Blog.create({
                    contentHTML: data.contentHTML,
                    content: data.content,
                    doctorId: data.doctorId,
                    specialtyId: data.specialtyId,
                    clinicId: data.clinicId,
                    description: data.description,
                })
                resolve({
                    errCode: 0,
                    message: 'Create Doctor Info Success !'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getDoctorDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMess: 'Missing data'
                })
            } else {
                let doctor = await db.User.findOne({
                    where: { id: data },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Blog,
                            attributes: ['contentHTML', 'description', 'doctorId']
                        },
                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['value_en']
                        }
                    ],
                    nest: true,
                    raw: true
                })
                if (doctor && doctor.image) {
                    doctor.image = new Buffer(doctor.image, 'base64').toString('binary')
                }
                resolve(doctor)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getDoctor: getDoctor,
    getAllDoctor: getAllDoctor,
    createDoctorInfo: createDoctorInfo,
    getDoctorDetail: getDoctorDetail
}