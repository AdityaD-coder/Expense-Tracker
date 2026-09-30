const Expense = require('../models/Expense');

const getExpenses = async (req, res) => {
  const { search = '', category = 'All', paymentMethod = 'All', sort = 'date-desc', page = 1, limit = 10 } = req.query;

  const query = { user: req.user._id };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (category && category !== 'All') {
    query.category = category;
  }

  if (paymentMethod && paymentMethod !== 'All') {
    query.paymentMethod = paymentMethod;
  }

  let sortQuery = { date: -1, createdAt: -1 };

  if (sort === 'date-asc') {
    sortQuery = { date: 1, createdAt: -1 };
  }

  if (sort === 'amount-desc') {
    sortQuery = { amount: -1, date: -1 };
  }

  if (sort === 'amount-asc') {
    sortQuery = { amount: 1, date: -1 };
  }

  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;

  const total = await Expense.countDocuments(query);
  const expenses = await Expense.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(pageSize)
    .populate('user', 'name email');

  res.json({
    expenses,
    currentPage: pageNumber,
    totalPages: Math.ceil(total / pageSize) || 1,
    total,
  });
};

const getExpenseById = async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expense);
};

const createExpense = async (req, res) => {
  const { title, amount, category, date, paymentMethod, description } = req.body;

  if (!title || !category || !date || !paymentMethod) {
    return res.status(400).json({ message: 'Title, category, date, and payment method are required' });
  }

  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }

  const expense = await Expense.create({
    user: req.user._id,
    title,
    amount: Number(amount),
    category,
    date,
    paymentMethod,
    description: description || '',
  });

  res.status(201).json(expense);
};

const updateExpense = async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  const { title, amount, category, date, paymentMethod, description } = req.body;

  if (title) expense.title = title;
  if (amount !== undefined) {
    if (Number(amount) <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }
    expense.amount = Number(amount);
  }
  if (category) expense.category = category;
  if (date) expense.date = date;
  if (paymentMethod) expense.paymentMethod = paymentMethod;
  if (description !== undefined) expense.description = description;

  const updatedExpense = await expense.save();
  res.json(updatedExpense);
};

const deleteExpense = async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  await expense.deleteOne();
  res.json({ message: 'Expense removed successfully' });
};

const getSummary = async (req, res) => {
  const userId = req.user._id;
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const totalSummary = await Expense.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: null,
        totalExpenses: { $sum: '$amount' },
        transactionCount: { $sum: 1 },
        monthlyExpenses: {
          $sum: {
            $cond: [{ $gte: ['$date', monthStart] }, '$amount', 0],
          },
        },
        todayExpenses: {
          $sum: {
            $cond: [{ $and: [{ $gte: ['$date', todayStart] }, { $lt: ['$date', tomorrowStart] }] }, '$amount', 0],
          },
        },
      },
    },
  ]);

  const totalData = totalSummary[0] || {
    totalExpenses: 0,
    transactionCount: 0,
    monthlyExpenses: 0,
    todayExpenses: 0,
  };

  const recentExpenses = await Expense.find({ user: userId })
    .sort({ date: -1, createdAt: -1 })
    .limit(5)
    .lean();

  const categoryBreakdown = await Expense.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
    { $sort: { total: -1 } },
  ]);

  const totalSpent = totalData.totalExpenses || 0;
  const breakdownWithPercent = categoryBreakdown.map((item) => ({
    category: item._id,
    total: item.total,
    percentage: totalSpent ? Number(((item.total / totalSpent) * 100).toFixed(1)) : 0,
  }));

  const monthlyBreakdown = [];
  for (let i = 5; i >= 0; i -= 1) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);

    const monthData = await Expense.aggregate([
      { $match: { user: userId, date: { $gte: start, $lt: end } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    monthlyBreakdown.push({
      month: start.toLocaleString('en-US', { month: 'short' }),
      total: monthData[0]?.total || 0,
    });
  }

  res.json({
    totalExpenses: totalData.totalExpenses || 0,
    monthlyExpenses: totalData.monthlyExpenses || 0,
    todayExpenses: totalData.todayExpenses || 0,
    transactionCount: totalData.transactionCount || 0,
    recentExpenses,
    categoryBreakdown: breakdownWithPercent,
    monthlyBreakdown,
  });
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
};
