const SkillsSection = ({
  allSkills,
  formData,
  toggleSkill,
}) => {
  return (
    <div className="skills-section">

      <h2 className="section-title">
        Skills
      </h2>

      <p className="section-description">
        Select all skills that match your profile.
      </p>

      <div className="skills-container">

        {allSkills.length === 0 ? (

          <p className="no-skills">
            No skills available.
          </p>

        ) : (

          allSkills.map((skill) => {

            const selected =
              formData.skills.includes(skill._id);

            return (

              <button
                key={skill._id}
                type="button"
                className={
                  selected
                    ? "skill-chip active"
                    : "skill-chip"
                }
                onClick={() =>
                  toggleSkill(skill._id)
                }
              >
                {skill.name}
              </button>

            );

          })

        )}

      </div>

    </div>
  );
};

export default SkillsSection;