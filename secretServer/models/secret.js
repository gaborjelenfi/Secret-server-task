const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secretSchema = new Schema({
  hash: {
    type: String,
    required: true
  },
  secretText: {
    type: String,
    required: true
  },
  remainingViews: {
    type: Number,
    require: true,
    default: 0
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Schema.Types.Mixed,
    required: true
  }}
);

secretSchema.index({ expiresAt: 1}, {expireAfterSeconds: 0});
module.exports = mongoose.model('Secret', secretSchema);