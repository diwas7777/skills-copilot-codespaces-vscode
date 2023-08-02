// Create web server

// Import required modules
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { check, validationResult } = require('express-validator');

// GET request for creating a comment. NOTE This must come before route for id (i.e. display comment).
router.get('/comment/create', commentController.comment_create_get);

// POST request for creating comment.
router.post('/comment/create', [
    // Validate fields.
    check('comment', 'Comment must not be empty.').isLength({ min: 1 }).trim(),
    check('commenter', 'Commenter must not be empty.').isLength({ min: 1 }).trim(),
    check('comment_date', 'Invalid comment date').optional({ checkFalsy: true }).isISO8601().toDate(),
    // Sanitize fields.
    check('comment').escape(),
    check('commenter').escape(),
    check('comment_date').toDate(),
    check('post').escape(),
    check('post').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('comment_form', { title: 'Create Comment', comment: req.body, errors: errors.array() });
            return;
        } else {
            // Data from form is valid. Save comment.
            commentController.comment_create_post(req, res);
        }
    }
]);

// GET request to delete comment.
router.get('/comment/:id/delete', commentController.comment_delete_get);

// POST request to delete comment.
router.post('/comment/:id/delete', commentController.comment_delete_post);

// GET request to update comment.
router.get('/comment/:id/update', commentController.comment_update_get);

// POST request to update comment.
router.post('/comment/:id/update', [
    // Validate fields.
    check('comment', 'Comment must not be empty.').isLength({ min: 1 }).trim(),
    check('commenter', 'Commenter must not be empty.').isLength({ min: 1 }).trim(),
    check('comment_date', 'Invalid comment date').optional({ checkFalsy: true }).isISO8601().toDate(),
    // Sanitize fields.
    check('comment').escape(),
    check('commenter').escape(),
    check('comment_date').toDate(),
    check('post').escape(),
    check('post').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('comment_form', { title: 'Update Comment', comment: req.body, errors: errors.array() });
            return;
        } else {
            // Data from form is valid. Save comment.
            commentController.comment_update_post(req, res);
        }
    }
]);

// GET request for one comment.
router.get('/comment/:id', commentController.comment_detail);

// GET request for list of all comment items.
router.get('/comments', commentController.comment_list);

module.exports = router;