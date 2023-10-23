const express = require("express")
const categoryController = require("../controllers/categoryController")
const menuController = require("../controllers/menuController")
const customerController = require("../controllers/customerController")
const orderController = require("../controllers/orderController")
const router = express.Router()

//Route Category
router.get('/categories', categoryController.getAllCategory)
router.post('/categories', categoryController.createCategory)
router.delete('/categories/:id', categoryController.deleteCategory)
router.put('/categories/:id', categoryController.updateCategory)

//Router Menu
router.get('/menus', menuController.getAllMenu)
router.post('/menus', menuController.createMenu)
router.delete('/menus/:id', menuController.deleteMenu)
router.put('/menus/:id', menuController.updateMenu)

//Router Cust
router.get('/cust', customerController.getAllCust)
router.post('/cust', customerController.createCust)
router.delete('/cust/:id', customerController.deleteCust)
router.put('/cust/:id', customerController.updateCust)

//Router Order
router.get('/order', orderController.getAllOrder)
router.post('/order', orderController.createOrder)
router.get('/order/history', orderController.getHistory)

module.exports = router
