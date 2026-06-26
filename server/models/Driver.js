const mongoose = require('mongoose');

// نموذج السائق
const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'يرجى إدخال اسم السائق'],
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  nationalId: {
    type: String,
    unique: true,
    required: true
  },
  licenseNumber: {
    type: String,
    unique: true,
    required: true
  },
  licenseExpiryDate: {
    type: Date,
    required: true
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
    required: true
  },
  assignedVehicle: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: 'Vehicle'\n  },
  address: String,
  city: String,
  experience: Number, // سنوات الخبرة
  status: {
    type: String,
    enum: ['نشط', 'معطل', 'إجازة'],
    default: 'نشط'
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

module.exports = mongoose.model('Driver', DriverSchema);