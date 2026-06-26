const mongoose = require('mongoose');

// نموذج المقاول
const ContractorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'يرجى إدخال اسم المقاول'],
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  nationalId: {
    type: String,
    unique: true,
    required: true
  },
  bankAccount: {
    bankName: String,
    accountNumber: String,
    accountHolder: String
  },
  numberOfVehicles: {
    type: Number,
    default: 0
  },
  totalBalance: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['نشط', 'معطل'],
    default: 'نشط'
  },
  registrationDate: {
    type: Date,
    default: Date.now
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

module.exports = mongoose.model('Contractor', ContractorSchema);