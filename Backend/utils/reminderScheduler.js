const cron = require("node-cron");
const nodemailer = require("nodemailer");
const MedicineReminder = require("../models/MedicineReminder");
const User = require("../models/user");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email transporter is ready to send messages.");
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"MediMate" <${process.env.EMAIL_USER}>`,
      to ,
      subject,
      text
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email error:", error);
  }
};

// Change to every 1 min to test
cron.schedule("* * * * *", async () => {
  console.log(" Checking reminders...");
  const now = new Date();
  const today = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM

  try {
    // Get reminders for today
    const reminders = await MedicineReminder.find({
        startDate: { $lte: now },
        endDate: { $gte: now }
    });

  console.log(`Preparing email for ${User.email} at ${currentTime}`);

    for (const reminder of reminders) {
        if (reminder.times !== currentTime) continue;
        
        if (reminder.times === currentTime) {

        const user = await User.findById(reminder.userId);

        if (!user) {
        console.warn(` No user found for reminder ${reminder._id}`);
        continue; // Skip this reminder
        }

        console.log(`📧 Preparing email for ${user.email} at ${currentTime}`);

        if (reminder.reminderType === "Email") {
        await sendEmail(
            user.email,
            `Medicine Reminder: ${reminder.medicineName}`,
            `Hi ${user.name},\n\nIt's time to take your medicine:\n\nMedicine: ${reminder.medicineName}\nDosage: ${reminder.dosage}\nTime: ${reminder.times}\n\nStay healthy!\n- MediMate`
        );
        } else {
        console.log(`Push Notification: Take ${reminder.medicineName} at ${reminder.times}`);
        }

      }
    }

    console.log(`✅ Email sent to `);

  } catch (error) {
    console.error("Reminder scheduler error:", error);
  }
});
