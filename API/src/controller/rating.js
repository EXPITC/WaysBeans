const { rating } = require('../../models')



exports.token = async(req, res) => {
    try {
        const token = await rating.findOne({
            where: {
                userId: req.user.id,
                status: 'token',
                productsId: req.params.id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        if (!token) {
            return(
                res.status(201).send({
                    status: 'clear'
                })
            )
        }
        res.status(200).send({
            token
        })
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}

exports.comments = async (req, res) => {
    try {
        const comments = await rating.findAll({
            where: {
                status: 'done',
                productsId: req.params.id
            },
            attributes: {
                exclude: ['updateAt']
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        res.status(200).send({
            status: 'Success',
            comments
        })
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server err: '+ err.message
        })
    }
}

exports.updateRating = async (req, res) => {
    try {
        const { id } = req.params
        let data = await req.body
        await rating.update({
            ...data,
            status:'done'
        }, {
            where: {
                id,
                userId : req.user.id
            }
        })
        res.status(200).send({
            status:'success'
        })
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}