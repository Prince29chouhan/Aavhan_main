import Submission from "../model/submission.js";
import User from "../model/user.js";

export const submitLink = async (req, res) => {
  try {
    const { email, link } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new submission
    const newSubmission = new Submission({
      link,
      author: user._id, // Set author to user's ID
    });

    await newSubmission.save();

    res.status(201).json({
      message: "Submitted successfully",
      submission: newSubmission,
    });
  } catch (error) {
    console.error("Failed to submit link:", error);
    res.status(500).json({ message: "Failed to submit link", error: error.message });
  }
};

export const getUserSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const submissions = await Submission.find({ author: userId });

    if (!submissions) {
      return res.status(404).json({ message: 'Submissions not found for this user' });
    }

    res.status(200).json(submissions);
  } catch (error) {
    console.error('Failed to fetch user submissions:', error);
    res.status(500).json({ message: 'Failed to fetch user submissions', error: error.message });
  }
};
