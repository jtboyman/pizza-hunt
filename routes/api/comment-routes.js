const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId> (need to know which pizza comment came from)
router.route('/:pizzaId/:commentId').delete(removeComment);


module.exports = router;