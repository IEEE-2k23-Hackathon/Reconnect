const User = require("../models/UserModel");

//get all user data
async function getAllUserData() {
  try {
    const allUsers = await User.find({});

    return allUsers;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    throw error;
  }
}

async function GetAllUserData(req, res) {
  try {
    const allUserData = await getAllUserData();
    res.json({ data: allUserData });
  } catch (error) {
    console.error("Error in getting all user data:", error);
  }
}

module.exports = {
  GetAllUserData,
  getAllUserData,
};
