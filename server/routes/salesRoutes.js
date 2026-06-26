const express = require('express');
const router = express.Router();
const SalesOrder = require('../models/SalesOrder');

// إنشاء أمر بيع جديد
router.post('/', async (req, res) => {
  try {
    const { 
      orderNumber, customer, factory, destination, destination_city,
      numberOfTrips, commodityType, pricePerTrip, notes 
    } = req.body;

    if (!orderNumber || !customer || !factory || !destination || !numberOfTrips || !pricePerTrip) {
      return res.status(400).json({
        error: 'يرجى ملء جميع الحقول المطلوبة',
        required: ['orderNumber', 'customer', 'factory', 'destination', 'numberOfTrips', 'pricePerTrip']
      });
    }

    const existingOrder = await SalesOrder.findOne({ orderNumber });
    if (existingOrder) {
      return res.status(400).json({
        error: 'رقم الأمر موجود مسبقاً'
      });
    }

    const salesOrder = new SalesOrder({
      orderNumber,
      customer,
      factory,
      destination,
      destination_city,
      numberOfTrips,
      commodityType,
      pricePerTrip,
      notes
    });

    await salesOrder.save();
    await salesOrder.populate('customer factory');

    res.status(201).json({
      message: 'تم إنشاء أمر البيع بنجاح',
      data: salesOrder
    });
  } catch (error) {
    res.status(500).json({
      error: 'فشل في إنشاء أمر البيع',
      message: error.message
    });
  }
});

// الحصول على قائمة الأوامر
router.get('/', async (req, res) => {
  try {
    const salesOrders = await SalesOrder.find()
      .populate('customer factory')
      .sort({ createdAt: -1 });

    const summary = {
      total: salesOrders.length,
      pending: salesOrders.filter(o => o.status === 'قيد الانتظار').length,
      confirmed: salesOrders.filter(o => o.status === 'مؤكد').length,
      inProgress: salesOrders.filter(o => o.status === 'قيد التنفيذ').length,
      completed: salesOrders.filter(o => o.status === 'مكتمل').length
    };

    res.json({
      summary,
      data: salesOrders
    });
  } catch (error) {
    res.status(500).json({
      error: 'فشل في جلب الأوامر',
      message: error.message
    });
  }
});

// الحصول على أمر محدد
router.get('/:id', async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findById(req.params.id)
      .populate('customer factory');

    if (!salesOrder) {
      return res.status(404).json({
        error: 'الأمر غير موجود'
      });
    }

    res.json({
      data: salesOrder
    });
  } catch (error) {
    res.status(500).json({
      error: 'خطأ في جلب بيانات الأمر',
      message: error.message
    });
  }
});

// تحديث حالة الأمر
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['قيد الانتظار', 'مؤكد', 'قيد التنفيذ', 'مكتمل', 'ملغى'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'حالة غير صحيحة',
        validStatuses
      });
    }

    const salesOrder = await SalesOrder.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate('customer factory');

    if (!salesOrder) {
      return res.status(404).json({
        error: 'الأمر غير موجود'
      });
    }

    res.json({
      message: 'تم تحديث حالة الأمر بنجاح',
      data: salesOrder
    });
  } catch (error) {
    res.status(500).json({
      error: 'فشل في تحديث الأمر',
      message: error.message
    });
  }
});

// تحديث عدد النقلات المنجزة
router.put('/:id/completed-trips', async (req, res) => {
  try {
    const { completedTrips } = req.body;

    const salesOrder = await SalesOrder.findById(req.params.id);
    if (!salesOrder) {
      return res.status(404).json({
        error: 'الأمر غير موجود'
      });
    }

    if (completedTrips > salesOrder.numberOfTrips) {
      return res.status(400).json({
        error: 'عدد النقلات المنجزة لا يمكن أن يتجاوز عدد النقلات المطلوبة'
      });
    }

    salesOrder.completedTrips = completedTrips;
    
    if (completedTrips === salesOrder.numberOfTrips) {
      salesOrder.status = 'مكتمل';
    }

    await salesOrder.save();
    await salesOrder.populate('customer factory');

    res.json({
      message: 'تم تحديث عدد النقلات بنجاح',
      data: salesOrder
    });
  } catch (error) {
    res.status(500).json({
      error: 'فشل في تحديث النقلات',
      message: error.message
    });
  }
});

// حذف أمر
router.delete('/:id', async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findByIdAndDelete(req.params.id);

    if (!salesOrder) {
      return res.status(404).json({
        error: 'الأمر غير موجود'
      });
    }

    res.json({
      message: 'تم حذف الأمر بنجاح',
      data: salesOrder
    });
  } catch (error) {
    res.status(500).json({
      error: 'فشل في حذف الأمر',
      message: error.message
    });
  }
});

module.exports = router;