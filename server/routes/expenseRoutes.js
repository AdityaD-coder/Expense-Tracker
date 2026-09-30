const express = require('express');
const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/summary', protect, getSummary);
router.route('/').get(protect, getExpenses).post(protect, createExpense);
router.route('/:id').get(protect, getExpenseById).put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;
