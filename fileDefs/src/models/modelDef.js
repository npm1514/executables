module.exports = (collection) => {
  return `const mongoose = require('mongoose');

  var ${collection}Schema = new mongoose.Schema({
    prop1: {type: String, required: true},
    prop2: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
  });

  module.exports = mongoose.model('${collection}s', ${collection}Schema);`;
}
