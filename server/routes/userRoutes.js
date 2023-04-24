const requiredUser = require('../middlewares/requiredUser');
const UserController = require('../controllers/userController')

const router = require('express').Router();

router.post('/follow' , requiredUser, UserController.followOrUnfollowUser);
router.get('/getFeedData' , requiredUser, UserController.getPostsOfFollowing);
router.get('/getMyPost' , requiredUser, UserController.getMyPostsController);
router.get('/getUserPost' , requiredUser, UserController.getUserPost);
router.delete('/deleteUser' , requiredUser, UserController.deleteMyProfile );
router.get('/getMyInfo' , requiredUser, UserController.getMyInfo );
router.put('/' , requiredUser, UserController.updateUserProfile );
router.post('/getUserProfile' , requiredUser, UserController.getUserProfile );



module.exports = router;