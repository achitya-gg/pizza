const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/cartController') 
const authContorller = require('../app/http/controllers/authControllers')
const authController = require('../app/http/controllers/authControllers')
function indexRoutes(app) {
    app.get('/', homeController().index)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    app.get('/login', authController().login)
    app.get('/register', authContorller().register)
}
module.exports = indexRoutes