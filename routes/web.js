const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/cartController') 
const authController = require('../app/http/controllers/authControllers')
const orderController = require('../app/http/controllers/orderController')
const adminOrderController = require('../app/http/controllers/adminorderController')
const adminStatusController = require('../app/http/controllers/adminstatusController')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')
function indexRoutes(app) {
    app.get('/', homeController().index)

    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, adminStatusController().update)
}
module.exports = indexRoutes