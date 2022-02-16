const express = require('express');
const router = express.Router();

const { userController, commentController, recapController } = require('../controllers');

// get parent by id
router.route('/profile/parent/:id(\\d+)')
    .get(userController.getParentById)
    .patch(userController.updateUser);

// modify password
router.route('/profile/parent/:id(\\d+)/password')
    .patch(userController.updatePassword);

// get and modify child
router.route('/profile/parent/:id(\\d+)/child/:childId(\\d+)')
    .get(userController.getChildFromParent)
    .patch(userController.modifyChild);

// get all recaps from parent and child ids
router.route('/profile/parent/:id(\\d+)/child/:childId(\\d+)/allrecaps')
    .get(recapController.getAllRecapsByOneChild);

// get all of one parent's comments
router.route('/profile/parent/:parentId(\\d+)/comments')
    .get(commentController.getCommentsByParentId);

// add a comment
router.route('/profile/parent/:id(\\d+)/child/:childId(\\d+)/comments')
    .post(commentController.addComment);

// modify and delete a comment
router.route('/profile/parent/:id(\\d+)/child/:childId(\\d+)/comments/:commentId(\\d+)')
    .patch(commentController.modifyComment)
    .delete(commentController.deleteComment);

module.exports = router;