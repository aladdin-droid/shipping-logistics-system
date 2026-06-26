const express = require('express');
const router = express.Router();

// Placeholder routes for reports
router.get('/sales/daily', (req, res) => {
  res.json({ message: 'تقرير المبيعات اليومي' });
});

router.get('/sales/monthly', (req, res) => {
  res.json({ message: 'تقرير المبيعات الشهري' });
});

router.get('/operations/daily', (req, res) => {
  res.json({ message: 'تقرير التشغيل اليومي' });
});

router.get('/contractors', (req, res) => {
  res.json({ message: 'تقرير المقاولين' });
});

module.exports = router;