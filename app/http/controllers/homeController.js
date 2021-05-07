const Menu = require('../../../app/models/menu')
function homeController() {
    return {
        async index(req, res) {
            const response = res
            const pizzas = await Menu.find()
            return response.render('home', { pizzas: pizzas })
        }
    }
}
module.exports = homeController