const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId> (need to know which pizza comment came from)
router.route('/:pizzaId/:commentId').delete(removeComment).put(addReply);

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply); //go to this pizza, look at this particular comment, delete this one reply


module.exports = router;