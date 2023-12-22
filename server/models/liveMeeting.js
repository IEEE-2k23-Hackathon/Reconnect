const mongoose = require("mongoose");

const liveMeeting = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },

  roomID: {
    type: String,
    required: true,
  },

  isLive: {
    type: Boolean,
    required: true,
  },
  liveUrl: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
  },
});

module.exports = new mongoose.model("live", liveMeeting);
