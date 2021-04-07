const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/cartController') 
const authController = require('../app/http/controllers/authControllers')
const orderController = require('../app/http/controllers/orderController')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
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
}
module.exports = indexRoutes