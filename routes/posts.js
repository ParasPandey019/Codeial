const express =  require('express');
const router = express.Router();

// posts controller
const postController = require('../controllers/posts_controller');

router.post('/create', postController.create);


module.exports = router;
