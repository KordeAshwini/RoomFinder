const bcrypt = require("bcrypt");
const User = require("../models/user");
const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail"); // ✅ use utils
require("dotenv").config();
const jwt = require("jsonwebtoken");


const OTP_LENGTH = 6;
const SALT_ROUNDS = 10;

const {
  OTP_EXPIRY_MIN = 10,
  OTP_RESEND_COOLDOWN_SEC = 60
} = process.env;

// ------------------ Utility functions ------------------ //
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000)
    .toString()
    .slice(0, OTP_LENGTH);
}

async function saveAndSendOtp(email) {
  const plainOtp = generateOtp();
  const otpHash = await bcrypt.hash(plainOtp, SALT_ROUNDS);

  const now = new Date();
  const expiresAt = new Date(now.getTime() + parseInt(OTP_EXPIRY_MIN) * 60 * 1000);

  // Remove old OTPs for this email
  //await Otp.deleteMany({ email });

  // Save new OTP
  await new Otp({
    email,
    otpHash,
    createdAt: now,
    expiresAt
  }).save();

  // Send OTP via email
  await sendEmail(
    email,
    "Your RoomFinder Verification Code",
    `Your verification code is: ${plainOtp}\nIt will expire in ${OTP_EXPIRY_MIN} minutes.`
  );

  return plainOtp; // Optional: For testing only
}

// ------------------ Controllers ------------------ //

// // POST /api/auth/signup
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, phone, role, password } = req.body;
//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({ message: "Missing required fields." });
//     }

//     // Check existing user
//     if (await User.findOne({ email: email.toLowerCase() })) {
//       return res.status(409).json({ message: "Email already registered." });
//     }

//     // Create user with emailVerified false
//     const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
//     const user = new User({ name, email: email.toLowerCase(), phone, role, passwordHash });
//     await user.save();

//     // Generate & send OTP
//     await saveAndSendOtp(email.toLowerCase());

//     res.status(201).json({ message: "User created. OTP sent to email.", email: user.email });
//   } catch (err) {
//     console.error("signup error:", err);
//     res.status(500).json({ message: "Server error at signup." });
//   }
// };

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;

    // 1. Basic empty check
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2. Name validation
    if (name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters long." });
    }

    // 3. Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // 4. Phone validation (10–15 digits, numbers only)
     const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits." });
    }

    // 5. Role validation
    const allowedRoles = ["Tenant", "Owner", "Admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role selected." });
    }

    // 6. Password strength check
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }
    // const strongPassRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    // if (!strongPassRegex.test(password)) {
    //   return res.status(400).json({ 
    //     message: "Password must include at least one letter and one number." 
    //   });
    // }

    // 7. Check if email already exists
    if (await User.findOne({ email: email.toLowerCase() })) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // 8. Hash password & save user
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      name,
      email: email.toLowerCase(),
      phone,
      role,
      passwordHash,
    });
    await user.save();

    // 9. Generate & send OTP
    await saveAndSendOtp(email.toLowerCase());

    res.status(201).json({ 
      message: "User created successfully. OTP sent to email.", 
      email: user.email 
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error at signup." });
  }
};


// POST /api/auth/verify-otp
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Missing email or OTP." });

    const otpDoc = await Otp.findOne({ email: email.toLowerCase() }).sort({ createdAt: -1 });
    if (!otpDoc) return res.status(404).json({ message: "No OTP found or it expired." });

    if (otpDoc.tries >= 5) {
      await Otp.deleteMany({ email: email.toLowerCase() });
      return res.status(429).json({ message: "Too many attempts. Request a new OTP." });
    }

    const match = await bcrypt.compare(String(otp), otpDoc.otpHash);
    if (!match) {
      otpDoc.tries = (otpDoc.tries || 0) + 1;
      await otpDoc.save();
      return res.status(400).json({ message: "Invalid OTP." });
    }

    await User.findOneAndUpdate({ email: email.toLowerCase() }, { emailVerified: true });
    //await Otp.deleteMany({ email: email.toLowerCase() });

    res.json({ message: "Email verified." });
  } catch (err) {
    console.error("verifyOtp error:", err);
    res.status(500).json({ message: "Server error at verify." });
  }
};

// POST /api/auth/resend-otp
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Missing email." });

    const lastOtp = await Otp.findOne({ email: email.toLowerCase() }).sort({ createdAt: -1 });
    if (lastOtp) {
      const secondsSince = (Date.now() - lastOtp.createdAt.getTime()) / 1000;
      if (secondsSince < parseInt(OTP_RESEND_COOLDOWN_SEC)) {
        return res.status(429).json({
          message: `Please wait ${Math.ceil(OTP_RESEND_COOLDOWN_SEC - secondsSince)} seconds before retrying.`
        });
      }
    }

    await saveAndSendOtp(email.toLowerCase());

    res.json({ message: "OTP resent." });
  } catch (err) {
    console.error("resendOtp error:", err);
    res.status(500).json({ message: "Server error at resend." });
  }
};


// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     //console.log("Login request body:", req.body); // Debug incoming data

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email,role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: { id: user._id, name: user.name, email: user.email,role: user.role  }
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Validate email format
    //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 3. Password length validation (optional, before bcrypt compare)
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // 4. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 5. Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 6. Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 7. Success response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ------------------ Forgot Password Flow ------------------ //

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required." });

     // 3. Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

    // Send OTP for password reset
    await saveAndSendOtp(email.toLowerCase());

    res.json({ message: "OTP sent to email for password reset." });
  } catch (err) {
    console.error("forgotPassword error:", err);
    res.status(500).json({ message: "Server error at forgot password." });
  }
};

// POST /api/auth/verify-reset-otp
exports.verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Missing email or OTP." });

    const otpDoc = await Otp.findOne({ email: email.toLowerCase() }).sort({ createdAt: -1 });
    if (!otpDoc) return res.status(404).json({ message: "No OTP found or expired." });

    if (otpDoc.tries >= 5) {
      await Otp.deleteMany({ email: email.toLowerCase() });
      return res.status(429).json({ message: "Too many attempts. Request a new OTP." });
    }

    const match = await bcrypt.compare(String(otp), otpDoc.otpHash);
    if (!match) {
      otpDoc.tries = (otpDoc.tries || 0) + 1;
      await otpDoc.save();
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // ✅ OTP verified
    res.json({ message: "OTP verified. You can now reset password." });
  } catch (err) {
    console.error("verifyResetOtp error:", err);
    res.status(500).json({ message: "Server error at verify reset otp." });
  }
};

// POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    //console.log("Reset Password request body:", req.body);

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

     if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // 2. Find latest OTP for this email
    const otpDoc = await Otp.findOne({ email: email.toLowerCase() })
      .sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(404).json({ message: "OTP not found." });
    }

    if (Date.now() > otpDoc.expiresAt) {
      return res.status(400).json({ message: "OTP expired." });
    }

    // 4. Hash new password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // 5. Update user password
    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: { passwordHash } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // 6. (Optional) Delete OTP after successful reset
    //await Otp.deleteMany({ email: email.toLowerCase() });

    return res.json({ message: "Password reset successful." });
  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ message: "Server error at reset password." });
  }
};