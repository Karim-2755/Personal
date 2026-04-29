const express = require('express');
const { list, create, update, remove, monthly, category } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.use(authMiddleware);
router.get('/', list);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/monthly', monthly);
router.get('/category', category);

module.exports = router;
