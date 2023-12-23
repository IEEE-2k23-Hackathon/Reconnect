const mongoose = require("mongoose");

const liveMeeting = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
});

module.exports = new mongoose.model("live", liveMeeting);
