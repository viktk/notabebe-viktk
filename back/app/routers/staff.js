const express = require('express');
const router = express.Router();


const { userController, adminController, recapController, commentController } = require('../controllers');


// get all children
router.route('/profile/staff/children')
    .get(userController.getAllChildren);

// get all recaps
router.route('/profile/staff/allrecaps')
    .get(recapController.getAllRecaps);

// get all comments
router.route('/profile/staff/comments')
    .get(commentController.getAllComments);

// modify password
router.route('/profile/staff/:id(\\d+)/password')
    .patch(userController.updatePassword);

// get child by id
router.route('/profile/staff/child/:id(\\d+)')
    .get(adminController.getChildById);

// get staff by id
router.route('/profile/staff/:id(\\d+)')
    .get(userController.getStaffById);

// get recap by id
router.route('/profile/staff/recap/:id(\\d+)')
    .get(recapController.getRecapById);

// get recaps by child id 
router.route('/profile/staff/child/:childId(\\d+)/recaps')
    .get(recapController.getRecapsByChildId);

// get comment by id
router.route('/profile/staff/comments/:id(\\d+)')
    .get(commentController.getCommentById);

// get comments by child id
router.route('/profile/staff/comments/child/:childId(\\d+)')
    .get(commentController.getCommentsByChildId);


// get all of one parent's comments - for staff
router.route('/profile/staff/comments/parent/:parentId(\\d+)')
    .get(commentController.getCommentsByParentId);

// add a recap - with nap and meal
router.route('/profile/staff/child/recap')
    .post(recapController.addRecap);

// add a nap to a recap
router.route('/profile/staff/child/recap/:recapId(\\d+)/nap')
    .post(recapController.addNap);

// add a meal to a recap
router.route('/profile/staff/child/recap/:recapId(\\d+)/meal')
    .post(recapController.addMeal);

// modify and delete a recap
router.route('/profile/staff/child/recap/:recapId(\\d+)/')
    .patch(recapController.modifyRecap)
    .delete(recapController.deleteRecap);

// modify and delete a nap in a recap
router.route('/profile/staff/child/recap/:recapId(\\d+)/nap/:napId(\\d+)')
    .patch(recapController.modifyNap)
    .delete(recapController.deleteNap);

// modify and delete a meal in a recap
router.route('/profile/staff/child/recap/:recapId(\\d+)/meal/:mealId(\\d+)')
    .patch(recapController.modifyMeal)
    .delete(recapController.deleteMeal);

module.exports = router;