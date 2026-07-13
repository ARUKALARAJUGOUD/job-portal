import cloudinary from "../config/cloudinary.js";
import { connection } from "../config/redis.js";
import { Company } from "../models/company.model.js";
import { companyEmailQueue } from "../queues/companyEmailQueue.js";
export const registerCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyEmail,
      website,
      industry,
      foundedYear,

      description,
      companyType,
      companySize,
      totalEmployees,
      headquarters,

      linkedin,
      twitter,
      github,

      location,
    } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is required",
        success: false,
      });
    }

    if (!website || !industry || !foundedYear || !companyEmail) {
      return res.status(400).json({
        message: "Fill all required fields",
        success: false,
      });
    }

    //-------------------------------------------------
    // Check Duplicate Company
    //-------------------------------------------------

    let company = await Company.findOne({
      companyName: companyName.trim(),
    });

    if (company) {
      return res.status(409).json({
        message: "Company already registered.",
        success: false,
      });
    }

    //-------------------------------------------------
    // Upload Logo
    //-------------------------------------------------

    let logoURL = null;

    if (req.files?.logoUrl?.length > 0) {
      const LOGO = req.files.logoUrl[0];

      logoURL = await cloudinary.uploader.upload(
        `data:${LOGO.mimetype};base64,${LOGO.buffer.toString("base64")}`,
        {
          folder: "logo",
        },
      );
    }

    //-------------------------------------------------
    // Create Company
    //-------------------------------------------------

    const userId = req.id;

    company = await Company.create({
      userId,

      companyName: companyName.trim(),

      companyEmail,

      logo: logoURL
        ? {
            url: logoURL.secure_url,
            public_id: logoURL.public_id,
          }
        : undefined,

      website,

      industry,

      foundedYear,

      description,

      companyType,

      companySize,

      totalEmployees,

      headquarters,

      location: Array.isArray(location) ? location : location ? [location] : [],

      socialLinks: {
        linkedin,

        twitter,

        github,
      },
    });

    //-------------------------------------------------
    // Queue Email
    //-------------------------------------------------

    await companyEmailQueue.add("companyRegister", {
      companyName,
      industry,
      website,
      email: companyEmail,
    });

    //-------------------------------------------------
    // Redis
    //-------------------------------------------------

    await connection.del("allCompanies");

    await connection.del(`AllCompaniesBy:${userId}`);

        await connection.del(`company:${company._id}`);

    //-------------------------------------------------
    // Response
    //-------------------------------------------------

    return res.status(201).json({
      success: true,

      message: "Company registered successfully.",

      company,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
// get the companies which are created by the user
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id

    const cachedKey = `AllCompaniesBy:${userId}`;
    const cachedData = await connection.get(cachedKey);

    if (cachedData) {
      try {
        return res.status(200).json({
          success: true,
          source: "redis",
          companies: JSON.parse(cachedData),
        });
      } catch (error) {
        await connection.del(cachedKey);
      }
    }

    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "companies not found ",
        success: false,
      });
    }

    await connection.set(cachedKey, JSON.stringify(companies), "EX", 3600);

    return res.status(200).json({
      message: "successfully fetched companies",
      source: "mongodb",
      success: true,
      companies,
    });
  } catch (error) {
    console.log("error in getCompany ", error);
    return res.status(500).json({
      message: "server error ",
      error,
    });
  }
};

// get the company details  by the company id
export const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;

    const cacheKey = `company:${companyId}`;
    const cachedData = await connection.get(cacheKey);
    if (cachedData) {
      try {
        return res.status(200).json({
          success: true,
          source: "redis",
          company: JSON.parse(cachedData),
        });
      } catch (error) {
        await connection.del(cacheKey);
      }
    }
    const company = await Company.findById(companyId).populate(
      "userId",
      "fullName email headline phoneNumber profile",
    );
    if (!company) {
      return res.status(404).json({
        message: "company not Found ",
        success: false,
      });
    }

    await connection.set(cacheKey, JSON.stringify(company), "EX", 3600);

    return res.status(200).json({
      success: true,
      source: "mongo db ",
      company,
    });
  } catch (error) {
    console.log("error in the getCompanyByUserId");
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error,
    });
  }
};

// Get all companies (User Dashboard)
export const getAllCompanies = async (req, res) => {
  try {
    const cacheKey = "allCompanies";

    // Check Redis
    const cachedData = await connection.get(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        source: "redis",
        companies: JSON.parse(cachedData),
      });
    }

    const companies = await Company.find({})
      .populate({
        path: "userId",
        select: "fullName email phoneNumber headline profile",
      })
      .sort({ createdAt: -1 });

    if (companies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No companies found.",
      });
    }

    // Store in Redis
    await connection.set(cacheKey, JSON.stringify(companies), "EX", 3600);

    return res.status(200).json({
      success: true,
      source: "mongodb",
      companies,
    });
  } catch (error) {
    console.log("Error in getAllCompanies:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      errorMessage: error.message,
    });
  }
};

// update the company
export const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    console.log(req.body);
    console.log(req.files);

    const { linkedin, twitter, github, location, ...rest } = req.body;

    const updateData = {
      ...rest,

      location: Array.isArray(location) ? location : location ? [location] : [],

      socialLinks: {
        linkedin,
        twitter,
        github,
      },
    };

    // upload logo
    const logo = req.files?.logoUrl?.[0];

    if (logo) {
      const uploadedLogo = await cloudinary.uploader.upload(
        `data:${logo.mimetype};base64,${logo.buffer.toString("base64")}`,
        {
          folder: "logo",
        },
      );

      updateData.logo = {
        url: uploadedLogo.secure_url,
        public_id: uploadedLogo.public_id,
      };
    }

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    await connection.del("allCompanies");
    await connection.del(`company:${company._id}`);
    await connection.del(`AllCompaniesBy:${company.userId}`);

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      company,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

// get all the companies to display on the user interface and recruiter dashboard
// export const get
