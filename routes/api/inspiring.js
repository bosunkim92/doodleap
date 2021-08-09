const express = require('express');
const router = express.Router();
const inspiringCtrl = require('../../controllers/inspiring')

router.post('/posts/:id/inspiring', inspiringCtrl.create)
router.delete('/inspiring/:id', inspiringCtrl.deleteInspiring)

module.exports = router;