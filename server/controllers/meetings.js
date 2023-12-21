const Schedule = require("../models/ScheduleMeeting");

const scheduleMeetings = async (req, res) => {
  const { roomName, time, roomID } = req.body;
  const meeting = {
    roomName,
    time,
    roomID,
  };
  try {
    const newMeeting = await Blog.create(meeting);
    return res.status(201).json({
      message: "New meeting scheduled successfully",
      meeting: newMeeting,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getScheduledMeetings = async (req, res) => {
  const { roomName, time, roomID } = req.body;
  //   const meeting = {
  //     roomName,
  //     time,
  //     roomID,
  //   };

  try {
    let existingMeeting = await Schedule.findOne({ roomName });
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

module.exports = { getScheduledMeetings, scheduleMeetings };
