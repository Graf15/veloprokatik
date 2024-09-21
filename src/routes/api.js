// G:\mega\я умамки програмист\veloprokatik\src\routes\api.js

const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')
const bikeController = require('../controllers/bikeController');
const rentalContractsController = require('../controllers/rentalContractsController');
const rentedItemsController = require('../controllers/rentedItemsController');


// Маршрут для логина
router.post('/login', loginController.login);

// Добавляем маршрут для добавления велосипеда
router.post('/bikes', bikeController.addBike);
router.get('/bike-types', bikeController.getBikeTypes);
router.get('/bike-brands', bikeController.getBikeBrands);

// Маршрут для получения всех велосипедов
router.get('/bikes', bikeController.getAllBikes);

// Маршрут для обновления данных велосипеда
router.put('/bikes/:id', bikeController.updateBike);

// Маршруты для управления договорами аренды
router.get('/rental-contracts', rentalContractsController.getAllRentalContracts);
router.get('/rental-contracts/:id', rentalContractsController.getRentalContractById);
router.post('/rental-contracts', rentalContractsController.createRentalContract);
router.put('/rental-contracts/:id', rentalContractsController.updateRentalContract);
router.delete('/rental-contracts/:id', rentalContractsController.deleteRentalContract);

// Маршруты для управления арендованными предметами
router.get('/rented-items', rentedItemsController.getAllRentedItems);
router.get('/rented-items/:id', rentedItemsController.getRentedItemById);
router.post('/rented-items', rentedItemsController.createRentedItem);
router.put('/rented-items/:id', rentedItemsController.updateRentedItem);
router.delete('/rented-items/:id', rentedItemsController.deleteRentedItem);


module.exports = router;
