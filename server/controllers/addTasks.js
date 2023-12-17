const AddictTask = require('../models/addictTasks');

const addTask = async (req, res) => {
  const { addictType, title, description } = req.body;

  const taskObj = {
    title,
    description,
  };

  try {
    let existingTask = await AddictTask.findOne({ addictType });

    if (existingTask) {
      // If the addictTask already exists, push the task to Level1 array
      existingTask.Level1.tasks.push(taskObj);
      await existingTask.save();

      return res.status(200).json({
        message: 'Task added to existing addictTask',
        addictTask: existingTask,
      });
    } else {
      // If addictTask doesn't exist, create a new one and add the task to its Level1 array
      const newAddictTask = await AddictTask.create({
        addictType,
        Level1: {
          tasks: [taskObj],
        },
      });

      return res.status(201).json({
        message: 'New addictTask created with task added to Level1',
        addictTask: newAddictTask,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = addTask;
