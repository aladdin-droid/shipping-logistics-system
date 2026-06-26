const mongoose = require('mongoose');

// نموذج أمر التشغيل
const OperationOrderSchema = new mongoose.Schema({
  operationNumber: {
    type: String,
    unique: true,
    required: true
  },
  salesOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesOrder',
    required: true
  },
  operatingOffice: {
    type: String,
    enum: ['قبلى', 'بني سويف', 'السخنه', 'العريش', 'الإسكندرية'],
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
    required: true
  },
  tripNumber: Number,
  loadingInfo: {
    loadingDate: Date,
    loadingTime: String,
    actualQuantity: Number,
    wieghtBefore: Number,
    weightAfter: Number,
    notes: String
  },
  inspectionInfo: {
    inspectionDate: Date,
    inspectionTime: String,
    sealNumber: String,
    inspectorName: String,
    status: {
      type: String,
      enum: ['تم', 'معلق'],
      default: 'تم'
    }
  },
  shipmentTracking: {
    departureDate: Date,
    departureTime: String,
    arrivalDate: Date,
    arrivalTime: String,
    gpsTracking: String
  },
  status: {
    type: String,
    enum: ['مُنشأ', 'قيد التحميل', 'محمل', 'في الطريق', 'تم التسليم', 'مكتمل'],
    default: 'مُنشأ'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('OperationOrder', OperationOrderSchema);