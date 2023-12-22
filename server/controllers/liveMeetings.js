const live = require("../models/liveMeeting");

const addLiveMeetings = async (req, res) => {
  const { roomName, roomID, isLive, time } = req.body;
  const meeting = {
    roomName,
    roomID,
    time,
    isLive,
  };
  try {
    const newMeeting = await live.create(meeting);
    return res.status(201).json({
      message: "New meeting is live",
      meeting: newMeeting,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getLiveMeetings = async (req, res) => {
  const { roomName } = req.params;
  try {
    let existingMeeting = await live.findOne({ roomName });
    if (!existingMeeting) {
      return res.status(201).json({
        message: `no meetings are scheduled`,
      });
    }
    if (existingMeeting) {
      return res.status(200).json({
        message: "meetings retrieved successfully",
        existingMeeting,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { addLiveMeetings, getLiveMeetings };
