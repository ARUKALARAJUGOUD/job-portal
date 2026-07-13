export const calculateProfileCompletion = (resume) => {
  let completed = 0;
  const total = 12;

  // Objective
  if (resume.objective?.trim()) completed++;

  // Professional Summary
  if (resume.professionalSummary?.trim()) completed++;

  // Education
  if (resume.education?.length > 0) completed++;

  // Experience
  if (resume.experience?.length > 0) completed++;

  // Projects
  if (resume.projects?.length > 0) completed++;

  // Certifications
  if (resume.certifications?.length > 0) completed++;

  // Languages
  if (resume.languages?.length > 0) completed++;

  // Achievements
  if (resume.achievements?.length > 0) completed++;

  // Publications
  if (resume.publications?.length > 0) completed++;

  // Volunteer Experience
  if (resume.volunteerExperience?.length > 0) completed++;

  // References
  if (resume.references?.length > 0) completed++;

  // Social Links
  if (
    resume.socialLinks &&
    Object.values(resume.socialLinks).some(
      (link) => link && link.trim() !== ""
    )
  ) {
    completed++;
  }

  return Math.round((completed / total) * 100);
};