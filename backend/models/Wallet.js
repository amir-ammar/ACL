const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const WalletSchema = new Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'please provide an owner of the wallet'],
  },
  balance: {
    type: Number,
    min: [0, 'please provide valid balance'],
    default: 0,
  },
});

module.exports = mongoose.model('Wallet', WalletSchema);
