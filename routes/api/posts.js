const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer()
const postsCtrl = require('../../controllers/posts');

router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index)
router.get('/posts/:id', postsCtrl.show);
router.put('/posts/:id', postsCtrl.update);
router.delete('/posts/:id', postsCtrl.delete);

module.exports = router;