const TenantProfile = require("../models/TenantProfile");
// const User = require("../models/User");

exports.saveTenantProfile = async (req, res) => {
  try {
    const { userId, ...otherData } = req.body;

    // Update or create tenant profile
    let profile = await TenantProfile.findOne({ userId });

    if (profile) {
      profile = await TenantProfile.findOneAndUpdate(
        { userId },
        { ...otherData},
        { new: true }
      );
    } else {
      profile = new TenantProfile({ userId,  ...otherData });
      await profile.save();
    }

    // Update User collection for name and phone
    //await User.findByIdAndUpdate(userId, { name, phone }, { new: true });

    res.status(201).json(profile);
  } catch (err) {
    console.error("Error saving tenant profile:", err.message);
    res.status(500).json({ message: "Failed to save profile" });
  }
};

exports.getTenantProfile = async (req, res) => {
  try {
    const profile = await TenantProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json(null);
    res.json(profile);
  } catch (err) {
    console.error("Error fetching tenant profile:", err.message);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
