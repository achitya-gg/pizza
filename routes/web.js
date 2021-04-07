const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/cartController') 
const authController = require('../app/http/controllers/authControllers')
const guest = require('../app/http/middlewares/guest')
function indexRoutes(app) {
    app.get('/', homeController().index)

    app.get('/login',  authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
}
module.exports = indexRoutes