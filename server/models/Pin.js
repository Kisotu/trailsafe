import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PinSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    default: '#000000'
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

PinSchema.index({ location: '2dsphere' });

const Pin = mongoose.model('Pin',PinSchema)

export { Pin }