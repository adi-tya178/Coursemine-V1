const express = require('express');
const router = express.Router();

const {categoryCreateValidator, categoryUpdateValidator} = require('../validators/category');

const {runValidation} = require('../validators');

const {  requireSignin, adminMiddleware } = require('../controller/auth');  


const {create, list, read, update, remove} = require('../controller/category');

router.post('/category', requireSignin, adminMiddleware, create);
router.get('/categories', list);
router.post('/category/:slug', read);
router.post('/category/:slug', categoryUpdateValidator, runValidation, requireSignin, adminMiddleware, update);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;