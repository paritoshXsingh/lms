import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const formatUserProfile = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  bio: user.bio ?? "",
  university: user.university ?? "",
  yearOfPassing: user.yearOfPassing ?? null,
  contact: user.contact ?? "",
  role: user.role,
});

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(formatUserProfile(user));
  } catch (error) {
    console.error("Error fetching user profile", error);
    return res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, university, yearOfPassing, contact } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (typeof name === "string") {
      const trimmedName = name.trim();
      if (!trimmedName) {
        return res.status(400).json({ message: "Name is required" });
      }
      user.name = trimmedName;
    }

    if (typeof bio === "string") {
      user.bio = bio.trim();
    }

    if (typeof university === "string") {
      user.university = university.trim();
    }

    if (typeof contact === "string") {
      user.contact = contact.trim();
    }

    if (yearOfPassing !== undefined) {
      if (yearOfPassing === "" || yearOfPassing === null) {
        user.yearOfPassing = null;
      } else {
        const parsedYear = Number(yearOfPassing);

        if (
          !Number.isInteger(parsedYear) ||
          parsedYear < 1900 ||
          parsedYear > 3000
        ) {
          return res
            .status(400)
            .json({ message: "Please enter a valid passing year" });
        }

        user.yearOfPassing = parsedYear;
      }
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: formatUserProfile(updatedUser),
    });
  } catch (error) {
    console.error("Error updating user profile", error);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters long" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from the current password",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating user password", error);
    return res.status(500).json({ message: "Failed to update password" });
  }
};

//become instructor
export const becomeInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "instructor") {
      return res.status(400).json({
        message: "Already an instructor",
      });
    }

    user.role = "instructor";

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    return res.status(200).json({
      message: "You are now an instructor",
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update role",
    });
  }
};
