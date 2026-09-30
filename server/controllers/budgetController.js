const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

const getBudget = async (req, res) => {
  const budget = await Budget.findOne({ user: req.user._id });

  if (!budget) {
    return res.json({
      monthlyBudget: 0,
      spent: 0,
      remaining: 0,
      progress: 0,
    });
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const monthExpenses = await Expense.aggregate([
    { $match: { user: req.user._id, date: { $gte: startOfMonth } } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);

  const spent = monthExpenses[0]?.total || 0;
  const remaining = budget.monthlyBudget - spent;
  const progress = budget.monthlyBudget > 0 ? (spent / budget.monthlyBudget) * 100 : 0;

  res.json({
    monthlyBudget: budget.monthlyBudget,
    spent,
    remaining,
    progress,
  });
};

const setBudget = async (req, res) => {
  const { monthlyBudget } = req.body;

  if (monthlyBudget === undefined || monthlyBudget === null) {
    return res.status(400).json({ message: 'Monthly budget is required' });
  }

  if (Number(monthlyBudget) < 0) {
    return res.status(400).json({ message: 'Budget cannot be negative' });
  }

  const value = Number(monthlyBudget);

  let budget = await Budget.findOne({ user: req.user._id });

  if (budget) {
    budget.monthlyBudget = value;
    await budget.save();
    return res.json({
      monthlyBudget: budget.monthlyBudget,
      spent: 0,
      remaining: budget.monthlyBudget,
      progress: 0,
    });
  }

  budget = await Budget.create({
    user: req.user._id,
    monthlyBudget: value,
  });

  res.status(201).json({
    monthlyBudget: budget.monthlyBudget,
    spent: 0,
    remaining: budget.monthlyBudget,
    progress: 0,
  });
};

module.exports = { getBudget, setBudget };
