const express = require('express');

const adminRouter = require('./admin');
const parentRouter = require('./parent');
const staffRouter = require('./staff');

const { errorController, userController, authController } = require('../controllers');

const router = express.Router();

router.use(parentRouter);

router.use(staffRouter);

router.use(adminRouter);

router.use('/checktoken', authController.checkToken);

router.route('/login')
    .post(userController.checkLogin);

router.get('/logout', userController.logout);

router.use(errorController.notFoundResource);

module.exports = router;