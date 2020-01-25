var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({storage: storage});

/* GET home page. */
router.get('/', controllers.Users.getUserDetails);
router.post('/addUser', controllers.Users.addUser);
router.post('/login', controllers.Users.login);
router.post('/createGroup', controllers.User_groups.add);
router.post('/addItem', upload.single("uploadfile"), controllers.Items.add);
router.get('/getItem', controllers.Items.get);
router.get('/getItemByGroup', controllers.Items.get_item_by_group);
module.exports = router;
