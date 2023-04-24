const router = require('express').Router();
const postsController = require('../controllers/postsController');
const requireuser = require('../middlewares/requiredUser')

router.get('/getAllPost',requireuser, postsController.getAllPostController);
router.post('/',requireuser, postsController.createPostController);
router.post('/like',requireuser, postsController.likeAndUnlikePost);
router.put('/update',requireuser, postsController.updatePostController);
router.delete('/delete',requireuser, postsController.deletePostController);



module.exports = router;