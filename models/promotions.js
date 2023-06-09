const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;