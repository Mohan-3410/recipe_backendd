const {getMyInfoController } = require('../controllers/userController');
const requireUser = require('../middleware/requireUser');

const router = require('express').Router();

router.get('/getMyInfo', requireUser, getMyInfoController);

module.exports = router;