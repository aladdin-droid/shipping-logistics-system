const mongoose = require('mongoose');

// نموذج أمر البيع
const SalesOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  factory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factory',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  destination_city: {
    type: String,
    required: true
  },
  numberOfTrips: {
    type: Number,
    required: [true, 'يرجى إدخال عدد النقلات'],
    min: 1
  },
  commodityType: {
    type: String,
    required: true
  },
  pricePerTrip: {
    type: Number,
    required: [true, 'يرجى إدخال السعر'],
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['قيد الانتظار', 'مؤكد', 'قيد التنفيذ', 'مكتمل', 'ملغى'],
    default: 'قيد الانتظار'
  },
  completedTrips: {
    type: Number,
    default: 0
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// حساب السعر الإجمالي قبل الحفظ
SalesOrderSchema.pre('save', function(next) {
  if (this.pricePerTrip && this.numberOfTrips) {
    this.totalPrice = this.pricePerTrip * this.numberOfTrips;
  }
  next();
});

module.exports = mongoose.model('SalesOrder', SalesOrderSchema);