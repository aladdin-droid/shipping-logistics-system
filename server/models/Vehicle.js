const mongoose = require('mongoose');

// نموذج السيارة/المركبة
const VehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    unique: true,
    required: true
  },
  plateNumber: {
    type: String,
    unique: true,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['قاطر', 'مقطور', 'شاحنة'],
    required: true
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
    required: true
  },
  capacity: {
    type: Number,
    required: true, // الحمولة بالطن
    min: 0
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  registrationDate: Date,
  insuranceExpiryDate: Date,
  maintenanceDate: Date,
  status: {
    type: String,
    enum: ['نشطة', 'معطلة', 'تحت الصيانة'],
    default: 'نشطة'
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

module.exports = mongoose.model('Vehicle', VehicleSchema);