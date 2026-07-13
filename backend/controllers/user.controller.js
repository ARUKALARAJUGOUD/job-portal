import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import { connection } from "../config/redis.js";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { emailLoginQueue } from "../queues/emailQueue.js";
import { otp } from "../utils/getOtp.js";
// Skill
// Skill
// Skill
// Otp
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role, company } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user already exist with this email ",
        success: false,
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      let newUser;
      if (role === "recruiter") {
        newUser = await User.create({
          fullName,
          company,
          email,
          phoneNumber,
          password: hashPassword,
          role,
        });
      } else {
        newUser = await User.create({
          fullName,
          email,
          phoneNumber,
          password: hashPassword,
          role,
        });
      }

      await emailLoginQueue.add("sendRegisterEmail", {
        email: newUser.email,
        name: newUser.fullName,
      });

      return res.status(200).json({
        message: "Account created successfully ",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error,
    });
  }
};

//  login controller
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Not Registered with this email",
        success: false,
      });
    }
    const hashPassword = user.password;
    const match = await bcrypt.compare(password, hashPassword);
    if (!match) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }

    if (role != user.role) {
      return res.status(400).json({
        message: "account does not exist with this current role ",
        success: false,
      });
    }

    //  otp
    const OtpNum = otp();

    await Otp.findOneAndDelete({ email });
    const otpDocument = await Otp.create({
      email,
      otp: OtpNum,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    });

    if (!otpDocument) {
      return res.status(409).json({
        message: "Otp not saved in DB",
        success: false,
      });
    }

    await emailLoginQueue.add("sendLoginEmail", {
      email: user.email,
      name: user.fullName,
      otp: OtpNum,
    });

    const userInfo = {
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "OTP sent successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//  otp verify for login
export const otpLoginVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "missing email or otp ",
        success: false,
      });
    }

    const otpData = await Otp.findOne({ email });

    if (!otpData) {
      return res.status(409).json({
        message: "incorrect email or resend OTP ",
        success: false,
      });
    }

    if (otpData.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
        success: false,
      });
    }

    if (!otpData.otp) {
      return res.status(409).json({
        message: "otp expires ",
        success: false,
      });
    }
    if (otpData.otp !== otp) {
      return res.status(400).json({
        message: "incorrect otp ",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Not Registered with this email",
        success: false,
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //  delete the otp from the database after successfully login
    await Otp.deleteOne({
      _id: otpData._id,
    });
    return res.status(200).json({
      message: "successfully login",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      success: false,
    });
  }
};

// resend otp for login and also for the reset password
// it is used if expires the otp in the database
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(409).json({
        message: "enter email ",
      });
    }

    // Otp
    const OtpNum = otp();

    await Otp.findOneAndDelete({ email });
    const otpRecord = await Otp.create({
      email,
      otp: OtpNum,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000), // expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // const user = await User.findOne({ email });
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not registered",
      });
    }

    await emailLoginQueue.add("sendResendOtp", {
      email: user.email,
      name: user.fullName,
      otp: OtpNum,
    });

    return res.status(200).json({
      message: `Otp send to ${email}`,
      success: true,
      OtpNum,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      errorMessage: error.message,
      error,
    });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      error: error,
    });
    console.log(error);
  }
};

// used to update the user details
// used by the user
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id; // comes from the middleware

    // const file = req.file; // comes from the middleware

    // cloudinary comes here

    console.log(req.files);

    let imageResult = null;
    let resumeResult = null;

    if (req.files.profileImage) {
      const image = req.files.profileImage[0];
      imageResult = await cloudinary.uploader.upload(
        `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
        {
          folder: "profileImages",
        },
      );
    }

    if (req.files.resume) {
      const resume = req.files.resume[0];
      resumeResult = await cloudinary.uploader.upload(
        `data:${resume.mimetype};base64,${resume.buffer.toString("base64")}`,
        {
          resource_type: "raw",
          folder: "resumes",
        },
      );
    }
    // resume comes here

    console.log("body =", req.body);
    console.log("files =", req.files);
    console.log("image =", imageResult);
    console.log("resume =", resumeResult);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        profile: imageResult
          ? { url: imageResult.secure_url, public_id: imageResult.public_id }
          : undefined,

        resumeUrl: resumeResult
          ? {
              url: resumeResult.secure_url,
              public_id: resumeResult.public_id,
            }
          : undefined,
      },
      { returnDocument: "after", runValidators: true },
    );

    const cachedKey = `user:${user._id}`;
    await connection.del(cachedKey);

    return res.status(200).json({
      message: "Profile updated successfully ",
      userInfo: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      error,
    });
    console.log(error);
  }
};

// Skill
// password reset
export const PasswordReset = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "missing email or otp or newPassword",
        success: false,
      });
    }

    const otpData = await Otp.findOne({ email });

    if (!otpData) {
      return res.status(409).json({
        message: "incorrect email or resend OTP ",
        success: false,
      });
    }

    if (otpData.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
        success: false,
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({
        message: "incorrect otp ",
        success: false,
      });
    }

    const password = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password },
      { returnDocument: "after" },
    );

    if (!user) {
      return res.status(400).json({
        message: "Not Registered with this email",
        success: false,
      });
    }

    //  delete the otp from the database after successfully  login
    await Otp.deleteOne({
      _id: otpData._id,
    });
    return res.status(200).json({
      message: "successfully password change ",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      success: false,
    });
  }
};

// user details
export const userDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const cacheKey = `user:${id}`;

    const cachedUser = await connection.get(cacheKey);

    if (cachedUser) {
      try {
        return res.status(200).json({
          success: true,
          source: "redis",
          user: JSON.parse(cachedUser),
        });
      } catch (err) {
        console.log("Invalid cache data");

        await connection.del(`user:${id}`);
      }
    }

    const user = await User.findById(id)
      .select("-password")
      .populate("company")
      .populate("skills")
      .populate("resume")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await connection.set(cacheKey, JSON.stringify(user), "EX", 3600);
    // Skill
    return res.status(200).json({
      success: true,
      source: "mongodb",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logged in details
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.id)
      .select("-password")
      .populate("resume")
      .populate({
        path: "skills",
        select: "name",
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      source:"mongodb",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
