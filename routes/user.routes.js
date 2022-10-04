const express = require('express');
const { getRandomUser, getAllUser, saveAUser, updateAUser, updateBulkUser, deleteUser } = require('../controller/user.controller');
const router = express.Router()

router.get('/random', getRandomUser)

router.get('/all', getAllUser)

router.post('/save', saveAUser)

router.patch('/update/:id', updateAUser)

router.patch('/bulk-update', updateBulkUser)

router.delete('/delete/:id', deleteUser)


module.exports = router;