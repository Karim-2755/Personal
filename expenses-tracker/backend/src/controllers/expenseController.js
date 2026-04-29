const Expense = require('../models/Expense');

const buildQuery = (query, userId) => {
  const filters = { userId };
  if (query.search) {
    filters.$or = [
      { note: { $regex: query.search, $options: 'i' } },
      { category: { $regex: query.search, $options: 'i' } }
    ];
  }
  if (query.category) {
    filters.category = query.category;
  }
  if (query.from || query.to) {
    filters.date = {};
    if (query.from) filters.date.$gte = new Date(query.from);
    if (query.to) filters.date.$lte = new Date(query.to);
  }
  return filters;
};

exports.list = async (req, res, next) => {
  try {
    const filters = buildQuery(req.query, req.user._id);
    const expenses = await Expense.find(filters).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { amount, category, date, note } = req.body;
    if (!amount || !category || !date) {
      return res.status(400).json({ message: 'Amount, category, and date are required.' });
    }
    const expense = await Expense.create({ userId: req.user._id, amount, category, date, note });
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    const { amount, category, date, note } = req.body;
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.date = date ? new Date(date) : expense.date;
    expense.note = note ?? expense.note;
    await expense.save();
    res.json(expense);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }
    res.json({ message: 'Expense deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.monthly = async (req, res, next) => {
  try {
    const data = await Expense.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: { month: { $month: '$date' }, year: { $year: '$date' } }, total: { $sum: '$amount' } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    const result = data.map((item) => ({ month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`, total: item.total }));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.category = async (req, res, next) => {
  try {
    const data = await Expense.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);
    const result = data.map((item) => ({ category: item._id, total: item.total }));
    res.json(result);
  } catch (error) {
    next(error);
  }
};
