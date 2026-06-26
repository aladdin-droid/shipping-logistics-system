const express = require('express');
const router = express.Router();

// Placeholder routes for finance
router.get('/invoices/customer', (req, res) => {
  res.json({ message: 'قائمة فواتير العملاء' });
});

router.get('/invoices/contractor', (req, res) => {
  res.json({ message: 'قائمة فواتير المقاولين' });
});

module.exports = router;