const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');

const router = express.Router();
const THIRD_PARTY_API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';


// Initialize database with seed data
router.get('/initialize', async (req, res) => {
  try {
    const response = await axios.get(THIRD_PARTY_API_URL);
    const transactions = response.data;

    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);

    res.status(200).json({ message: 'Database initialized' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

// List all transactions with search and pagination
router.get('/transactions', async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;
  const regex = new RegExp(search, 'i');
  const startOfMonth = new Date(`${month} 1`);
  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
      $or: [
        { title: regex },
        { description: regex },
        { price: regex },
      ],
    })
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get statistics for the selected month
router.get('/statistics', async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(`${month} 1`);
  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

  try {
    const totalSales = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startOfMonth, $lte: endOfMonth }, sold: true } },
      { $group: { _id: null, totalAmount: { $sum: '$price' }, totalSoldItems: { $sum: 1 } } },
    ]);

    const notSoldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
      sold: false,
    });

    res.status(200).json({
      totalAmount: totalSales[0]?.totalAmount || 0,
      totalSoldItems: totalSales[0]?.totalSoldItems || 0,
      totalNotSoldItems: notSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get bar chart data for the selected month
router.get('/bar-chart', async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(`${month} 1`);
  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

  const ranges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  try {
    const barChartData = await Promise.all(ranges.map(async (range) => {
      const count = await Transaction.countDocuments({
        dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
        price: { $gte: range.min, $lte: range.max },
      });

      return { range: `${range.min}-${range.max}`, count };
    }));

    res.status(200).json(barChartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bar chart data' });
  }
});

// Get pie chart data for the selected month
router.get('/pie-chart', async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(`${month} 1`);
  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

  try {
    const pieChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
});

// Get combined data from all the APIs
router.get('/combined-data', async (req, res) => {
  try {
    const transactions = await router.handle('GET', '/transactions', req, res);
    const statistics = await router.handle('GET', '/statistics', req, res);
    const barChart = await router.handle('GET', '/bar-chart', req, res);
    const pieChart = await router.handle('GET', '/pie-chart', req, res);

    res.status(200).json({
      transactions,
      statistics,
      barChart,
      pieChart,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});

module.exports = router;
