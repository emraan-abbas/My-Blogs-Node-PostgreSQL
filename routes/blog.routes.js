const express = require('express');
const router = express();

const blogController = require('../controllers/blog.controller');

router.post('/create', blogController.createBlogs);
router.get('/all', blogController.getBlogs);
router.put('/edit/:id', blogController.editBlogs);
router.delete('/delete/:id', blogController.deleteBlogs);

module.exports = router;
