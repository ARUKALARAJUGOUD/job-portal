import express from "express";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
  searchSkills,
} from "../controllers/skills.controller.js";

const router = express.Router();

router.post("/", createSkill);

router.get("/get-all-skills", getAllSkills);

router.get("/search", searchSkills);

router.get("/:id", getSkillById);

router.put("/:id", updateSkill);

router.delete("/:id", deleteSkill);

export default router;