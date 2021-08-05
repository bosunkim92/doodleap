const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer()
const postsCtrl = require('../../controllers/posts');

router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index)

module.exports = router;