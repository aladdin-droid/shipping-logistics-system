const mongoose = require('mongoose');

// نموذج فاتورة المقاول
const ContractorInvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    unique: true,
    required: true
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
    required: true
  },
  operationOrders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OperationOrder'
  }],
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  invoicePeriod: {
    startDate: Date,
    endDate: Date
  },
  totalTrips: {
    type: Number,
    default: 0
  },
  costPerTrip: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  firstPayment: {
    type: Number,
    default: 0 // 50% من التاريخ
  },
  secondPayment: {
    type: Number,
    default: 0 // 50% بعد 7 أيام
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  remainingAmount: Number,
  paymentStatus: {
    firstPaymentStatus: {
      type: String,
      enum: ['معلقة', 'مدفوعة'],
      default: 'معلقة'
    },
    firstPaymentDate: Date,
    secondPaymentStatus: {
      type: String,
      enum: ['معلقة', 'مدفوعة'],
      default: 'معلقة'
    },
    secondPaymentDate: Date
  },
  status: {
    type: String,
    enum: ['مسودة', 'مصدرة', 'مدفوعة جزئياً', 'مدفوعة'],
    default: 'مصدرة'
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

// حساب الدفعات والمبلغ المتبقي
ContractorInvoiceSchema.pre('save', function(next) {
  if (this.totalAmount) {
    this.firstPayment = (this.totalAmount * 50) / 100;
    this.secondPayment = (this.totalAmount * 50) / 100;
    this.remainingAmount = this.totalAmount - this.paidAmount;
  }
  next();
});

module.exports = mongoose.model('ContractorInvoice', ContractorInvoiceSchema);