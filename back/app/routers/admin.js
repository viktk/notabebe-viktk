const express = require('express');
const router = express.Router();

const { userController, adminController } = require('../controllers');

const userSchema = require('../validations/schemas/user');
const validate = require('../validations/validate');

// get all users
router.route('/profile/admin/allusers')
    .get(userController.getAllUsers);

// get all parents (with children)
router.route('/profile/admin/parents')
    .get(userController.getAllParents);

// get all staff members
router.route('/profile/admin/allstaff')
    .get(userController.getAllStaff);

// get all children
router.route('/profile/admin/children')
    .get(userController.getAllChildren);

// modify password
router.route('/profile/admin/:id(\\d+)/password')
    .patch(userController.updatePassword);

// get child by id 
router.route('/profile/admin/child/:id(\\d+)')
    .get(adminController.getChildById);

// add a user (selecting role_id in the request.body)
router.route('/profile/admin/manageprofile')
    .post(validate('body', userSchema), adminController.addUser);

// modify or delete a user
router.route('/profile/admin/manageprofile/:id(\\d+)')
    .delete(adminController.deleteUser);

// add a child to a parent
router.route('/profile/admin/parent/:id(\\d+)/managechildren')
    .post(adminController.addChild);

// modify a child
router.route('/profile/admin/parent/:id(\\d+)/managechildren/:childId(\\d+)')
    .patch(userController.modifyChild)
    .delete(adminController.deleteChild);

module.exports = router;