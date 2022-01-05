const { transactions ,users , products , order , rating} = require('../../models')
const Op = require('Sequelize').Op;
const { userCheck, admin, owner } = require('../middleware/userCheck')
const jwt = require('jsonwebtoken');

const socketIo = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token ) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });
  io.on('connection', (socket) => {
    console.log('client connect:', socket.id)

    socket.on('loadTransaction', async (payload) => {
      try {
        const token = socket.handshake.auth.token

        console.log(payload)
        
        const verified = jwt.verify(token, process.env.JWT_TOKEN )
        // console.log('verified.id')
        // console.log(verified?.id)
        const{id} = verified
        console.log(id)
        let data = await transactions.findAll({
          where : {
            [Op.or]: [
              {buyerId: id},
              {sellerId: id}
            ],
            status: {
              [Op.or] : ['Success','Cancel' , 'On The Way' , 'Waiting Approve']
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
          order: [['createdAt', 'DESC']]
        })
        const path = 'http://localhost:5000/img/'
        data = JSON.parse(JSON.stringify(data))
        data = data.map(x => {
            return {
                ...x,
                product: x.product.map(x => {
                    return {
                        ...x,
                        img: path + x.img
                    }
                })
               
            }
        })
        socket.emit("transaction", data)
      } catch (err) {
        console.log(err.message)
      }
    })

    socket.on('order', async (payload) => {
      console.log(payload)
      const id = payload
      try {
        let data = await transactions.update({status :  'Waiting Approve'},{
          where: { id : id }
      })
        socket.emit("OrderData", data)
      } catch (err) {
        console.log(err.message)
      }
    })

    socket.on('confirm', async (payload) => {
    try {
      let data = await transactions.update({ status: 'Success' }, {
        where: {id: payload}
      })

      socket.emit('ConfirmData', data)
      } catch (err) {
          console.log(err.massage)
      }
    }
    )
    socket.on('cancel', async (payload) => {
      try {
        let data = await transactions.update({ status: 'Cancel' }, {
          where: {id: payload}
        })
        socket.emit('cancelData', data)
        } catch (err) {
            console.log(err.massage)
        }
      }
    )
    socket.on('accept', async (payload) => {
      try {
        let data = await transactions.update({ status: 'On The Way' }, {
          where: {id: payload}
        })
        data = await transactions.findOne({
          where: { id: payload },
          include:  {
            model: products,
            as: 'product',
            through: {
                model: order
            },
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        }
        })
        console.log(data)
        data = data.product.map(x => {
          return ({
            productsId: x.id,
            userId: data.buyerId,
            status: 'token'
          })
        })
        await rating.bulkCreate(data)

        socket.emit('acceptData', data)
        } catch (err) {
            console.log(err.massage)
        }
      }
    )
    socket.on('transaction', async (payload) => {
      try {
        const token = socket.handshake.auth.token
        const verified = jwt.verify(token, process.env.JWT_TOKEN)
        
        const data = await transactions.findAll({
          where: {
            [Op.or]: [
            {buyerId: verified.id},
            {sellerId: verified.id}
          ], status: {
            [Op.or] : ['Success','Cancel' , 'On The Way' , 'Waiting Approve']
          }
          },
          include: [
            {
                model: users,
                as: "buyer",
                attributes: {
                    exclude: ['password','createdAt','updatedAt']
                }
            },{
              model: products,
              as: 'product',
              through: {
                  model: order
              },
              attributes: {
                  exclude: ['createdAt','updatedAt']
              }
          }
        ],
          order: [['createdAt', 'DESC']]
        })
        // console.log(data)
        socket.emit('transactionData', data)
      } catch (err) {
        console.log(err.message)
      }
    })
    socket.on('onTheWay', async (payload) => {
      try {
        let data = transactions.findOne({
          where: {
            buyerId: payload,
            status: 'On The Way'
          }
        })
        console.log(data)
        socket.emit('otwData', data)
        } catch (err) {
            console.log(err.massage)
        }
    })
    socket.on("disconnect", () => {
      console.log("client disconnect")
    })
  })
}

module.exports = socketIo