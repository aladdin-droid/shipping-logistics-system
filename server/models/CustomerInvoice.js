const mongoose = require('mongoose');

// نموذج الفاتورة للعميل
const CustomerInvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    unique: true,
    required: true
  },
  salesOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesOrder',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  totalAmount: {
    type: Number,
    required: true
  },
  completedTrips: {
    type: Number,
    default: 0
  },
  amountPerTrip: Number,
  paymentTerms: {
    type: Number,
    default: 7 // بالأيام
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  remainingAmount: Number,
  status: {
    type: String,
    enum: ['مسودة', 'مصدرة', 'مدفوعة جزئياً', 'مدفوعة', 'متأخرة'],
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

// حساب المبلغ المتبقي قبل الحفظ
CustomerInvoiceSchema.pre('save', function(next) {
  if (this.totalAmount && this.paidAmount) {
    this.remainingAmount = this.totalAmount - this.paidAmount;
    if (this.remainingAmount === 0) {
      this.status = 'مدفوعة';
    } else if (this.paidAmount > 0) {
      this.status = 'مدفوعة جزئياً';
    }
  }
  next();
});

module.exports = mongoose.model('CustomerInvoice', CustomerInvoiceSchema);