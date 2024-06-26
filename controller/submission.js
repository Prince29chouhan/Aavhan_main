import Submission from "../model/submission.js";
import User from "../model/user.js";

export const submitLink = async (req, res) => {
  try {
    const { link } = req.body;
    // const userId = req.User._id;

    // Check if user exists
    // const user = await User.findOne({ userId });
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    // Create new submission
    const newSubmission = new Submission({ link,  });
    await newSubmission.save();

    res.status(201).json({
      message: "Submitted successfully",
      submission: newSubmission,
    });
  } catch (error) {
    console.error("Failed to submit link:", error);
    res.status(500).json({ message: 'Failed to submit link', error: error.message });
  }
};
