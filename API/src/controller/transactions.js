const { transactions ,users , products , order} = require('../../models')
const Op = require('Sequelize').Op;
exports.addTransaction = async (req, res) => {
    try {
        const thenTransaction = await transactions.findOne({
            where: {
                buyerId: req.user.id,
                status: {
                    [Op.or] : ['Waiting Approve', 'Order']
                }
           } 
        })
        if (thenTransaction) {
            return res.status(201).send({
                status: 'fail',
                message: `you still have transaction with status ${thenTransaction.status}`,
                thenTransaction
            })
        }

        let data = await req.body
        const {productId ,qty} = data.product[0]
        console.log(productId)
        let response = await transactions.create({
            sellerId: data.sellerId,
            buyerId: req.user.id,
            status: 'Order',
            price: 0,
        })
        
        data = JSON.parse(JSON.stringify(data))

        let dataOrder = data.product
        if (dataOrder) {
            dataOrder = dataOrder.map(x => {
                return {
                    ...x,
                    transactionId: response.id,
                    status: 'pending',
                    buyerId: req.user.id,
                }
            })
            await order.bulkCreate(dataOrder)
        }
        const dataProduct = await products.findOne({
            where: {id: productId}
        })
        await products.update({
            stock: dataProduct.stock - qty
        },{
            where: {
                id : dataProduct.id
            }
        })
        console.log('pass3')
       
        response = await transactions.findOne({where: {
            id: response.id,
        },
        include: [
            {
                model: users,
                as: "buyer",
                attributes: {
                    exclude: ['password','createdAt','updatedAt']
                }
            },
            {
                model: products,
                as: 'product',
                through: {
                    model: order
                },
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            },
            {
                model: users,
                as: "seller",
                attributes: {
                    exclude: ['password','createdAt','updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['sellerId', 'buyerId', 'productId', 'price','createdAt', 'updatedAt']
        }
    })
    console.log('pass4')
    let total = 0
    total = response.product.map(x =>{
        return total + x.price * x.order.qty
    })
    total = total.reduce((a,b)=>
        a + b ,0
    )
    console.log(total)
    await transactions.update({price: total}, {
        where: {id: response.id}
    })
    console.log('pass5')
    res.status(200).send({
            status: 'success add',
            data: {
                transactions: {
                    response,
                    total,
                }
            }
        })
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}

exports.getTransactionUser = async (req, res) => {
    try {
        const thenTransaction = await transactions.findOne({
            where: {
                buyerId: req.user.id,
                status: 'On The Way'
            }
        })
        res.status(200).send({
                status: 'success',
                data: thenTransaction
        })

    } catch (error) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}
exports.getTransactionUserOrder = async (req, res) => {
    try {
        const thenTransaction = await transactions.findOne({
            where: {
                buyerId: req.user.id,
                status: 'Order'
            }
        })

        res.status(200).send({
                status: 'success',
                data: thenTransaction
        })

    } catch (error) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}
exports.getTransactions = async (req, res) => {
    try {
        const id = req.user.id
        const data = await transactions.findOne({
            where: {
                buyerId: id,
                status: {
                    [Op.or] : ['Waiting Approve','On The Way','Order']
                }
            },
            include: [
                {
                    model: users,
                    as: "buyer",
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                },
                {
                    model: products,
                    as: 'product',
                    through: {
                        model: order
                    },
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    }
                },
                {
                    model: users,
                    as: "seller",
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.status(200).send({
            message: 'Success',
            data: {
                transaction : data
            }
        })
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}

exports.getTransactionActive = async (req, res) => {
    try {
        const id = req.user.id
        let data = await transactions.findAll({
            where: {
                buyerId: id,
                status: {
                    [Op.or] : ['Waiting Approve','Order']
                }
            },
            include: [
                {
                    model: users,
                    as: "buyer",
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                },
                {
                    model: products,
                    as: 'product',
                    through: {
                        model: order,
                        attributes: {
                            include: ['id']
                        }
                    },
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    }
                },
                {
                    model: users,
                    as: "seller",
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        const path = 'http://localhost:5000/img/'
        data = JSON.parse(JSON.stringify(data))
        let product = data.map(x => {
            return {
                product: x.product.map(x => {
                    return {
                        ...x,
                        img: path + x.img
                    }
                })
               
            }
        })
        product = product[0].product.map(x => {
            return {
                ...x
            }
        })
        data = data.map(x => {
            return {
                ...x,
                product
            }
        })
        res.status(200).send({
            message: 'Success',
            data: {
                transactions: data
            }
        })
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}

exports.getTransactionsAdmin = async (req, res) => {
    try {
        const data = await transactions.findAll({
            include: [
                {
                    model: users,
                    as: "buyer",
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                },
                {
                    model: products,
                    as: 'product',
                    through: {
                        model: order,
                        attributes: {
                            include: ['id']
                        }
                    },
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    }
                },
                {
                    model: users,
                    as: "seller",
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.status(200).send({
            message: 'Success',
            data: {
                transactions: data,
            }
        })
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}

exports.getTransaction = async (req, res) => {
    try {
        const { id } = req.params
        let data = await transactions.findAll({
            where: {
                id
            },
            include: [
                {
                    model: users,
                    as: "buyer",
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                },
                {
                    model: products,
                    as: 'product',
                    through: {
                        model: order,
                        attributes: {
                            include: ['id']
                        }
                    },
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    }
                },
                {
                    model: users,
                    as: "seller",
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        const path = 'http://localhost:5000/img/'
        data = JSON.parse(JSON.stringify(data))
        let product = data.map(x => {
            return {
                product: x.product.map(x => {
                    return {
                        ...x,
                        img: path + x.img
                    }
                })
               
            }
        })
        product = product[0].product.map(x => {
            return {
                ...x
            }
        })
        data = data.map(x => {
            return {
                ...x,
                product
            }
        })
        res.status(200).send({
            message: 'Success',
            data: {
                transactions: data
            }
        })
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}

exports.editTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const transactionData = await transactions.findOne({
            where: {
                id
            },
        })
        if (!transactionData) {
            return res.status(400).send({
                status: 'fail',
                message: 'transaction not found',
                data: { 
                    transaction: "transaction details not found"
                }
            })
        }
        const data = req.body
        await transactions.update({
            ...data,
            attachment : req.file.filename
        }, {
            where: {id}
        })
        res.send({
            status: 'successfully',
            message: 'transaction successfully edit',
            data
        })
        
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const buyerId = req.user.id
        const transactionData = await transactions.findOne({
            where: {
                id,
                buyerId: buyerId
            },
        })
        if (!transactionData) {
            return res.status(400).send({
                status: 'fail',
                message: 'transaction not found',
                data: { 
                    transaction: "transaction details not found"
                }
            })
        }
        await transactions.destroy({
            where: {id}
        })
        res.send({
            status: 'success',
            message: 'transaction successfully destroy' 
        })
        
    } catch (err) {
        res.status(409).send({
            status: 'failed',
            message: 'server error: ' + err.message
        })
    }
}