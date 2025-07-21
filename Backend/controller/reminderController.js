// @created on 9-7-25
const MedicineReminder = require("../models/MedicineReminder");

const createReminder = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      medicineName,
      dosage,
      instructions,
      times,
      startDate,
      endDate,
      reminderType
    } = req.body;
    console.log(1)
    // Basic field validation
    // if (!medicineName || !dosage  || !times || !startDate || !endDate) {
    //   return res.status(400).json({ message: "Missing required fields." });
    // }

    const Reminders = new MedicineReminder({
      userId,
      medicineName,
      dosage,
      instructions,
      times,
      startDate,
      endDate,
      reminderType
    });
    console.log(Reminders)

    await Reminders.save();

    res.status(201).json({
      message: "Reminder created successfully.",
      Reminders
    });

  } catch (error) {
    console.error("Create reminder error:", error);
    res.status(500).json({ message: "Server error while creating reminder." });
  }
};
// @created on 10-70-25
const getMyReminders = async (req, res) => {
  try {
    const userId = req.userId;

    const reminders = await MedicineReminder.find({ userId }).sort({ startDate: -1 });

    res.status(200).json({
      message: "Reminders fetched successfully.",
      reminders
    });

  } catch (error) {
    console.error("Get reminders error:", error);
    res.status(500).json({ message: "Server error while fetching reminders." });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const userId = req.userId;

    const reminder = await MedicineReminder.findOneAndDelete({
      _id: reminderId,
      userId
    });

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found." });
    }

    res.status(200).json({ message: "Reminder deleted successfully." });

  } catch (error) {
    console.error("Delete reminder error:", error);
    res.status(500).json({ message: "Server error while deleting reminder." });
  }
};


const updateReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const userId = req.userId;

    const updatedReminder = await MedicineReminder.findOneAndUpdate(
      { _id: reminderId, userId },
      req.body,
      { new: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found." });
    }

    res.status(200).json({
      message: "Reminder updated successfully.",
      reminder: updatedReminder
    });

  } catch (error) {
    console.error("Update reminder error:", error);
    res.status(500).json({ message: "Server error while updating reminder." });
  }
};

module.exports = { createReminder , getMyReminders , deleteReminder, updateReminder};
