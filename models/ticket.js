const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  title: String,
  content: String,
  userEmail: String,
  done: Boolean,
  creationTime: Date,
  labels: Array,
});

// personSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });
module.exports = mongoose.model("Ticket", ticketSchema);
