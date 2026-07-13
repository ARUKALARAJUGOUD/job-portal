import { Skill } from "../models/skill.model.js";

// Create Skill
export const createSkill = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required.",
      });
    }

    const skillName = name.trim();

    const exist = await Skill.findOne({
      name: { $regex: new RegExp(`^${skillName}$`, "i") },
    });

    if (exist) {
      return res.status(409).json({
        success: false,
        message: "Skill already exists.",
      });
    }

    const skill = await Skill.create({
      name: skillName,
    });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully.",
      skill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      totalSkills: skills.length,
      skills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};




export const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    return res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required.",
      });
    }

    const exist = await Skill.findOne({
      _id: { $ne: id },
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (exist) {
      return res.status(409).json({
        success: false,
        message: "Skill already exists.",
      });
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      { name: name.trim() },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
      skill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};




export const searchSkills = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const skills = await Skill.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    })
      .sort({ name: 1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};