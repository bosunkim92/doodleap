const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
const multer = require('multer');
const upload = multer();

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/username/:username', usersCtrl.profile);
router.put('/username/:username', upload.single('photo'), usersCtrl.update);

module.exports = router;