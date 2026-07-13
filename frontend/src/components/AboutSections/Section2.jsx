const Section2 = () => {
  return (
    <>
      {/* ======================================================
                OUR JOURNEY SECTION
====================================================== */}

      <section className="journey-section">
        <div className="section-heading">
          <span>Our Journey</span>

          <h2>
            Building Careers,
            <span> One Opportunity at a Time</span>
          </h2>

          <p>
            Every successful company begins with an idea. Our mission started
            with solving one of the biggest problems faced by job seekers and
            recruiters — connecting the right talent with the right opportunity.
          </p>
        </div>

        {/* Story */}

        <div className="journey-story">
          <div className="journey-left">
            <h3>From an Idea to a Career Platform</h3>

            <p>
              JobSphere was founded with a simple vision — make recruitment
              faster, smarter, and more transparent for everyone.
            </p>

            <p>
              We realized that many talented candidates struggled to find
              genuine opportunities, while recruiters spent countless hours
              searching for qualified professionals.
            </p>

            <p>
              That's why we built a platform where companies can publish
              opportunities, job seekers can showcase their skills, and hiring
              becomes easier for everyone.
            </p>
          </div>

          <div className="journey-right">
            <img src="/about/journey.png" alt="Journey" />
          </div>
        </div>

        {/* Timeline */}

        <div className="journey-timeline">
          <div className="timeline-card">
            <span>2026</span>

            <h4>Project Started</h4>

            <p>The idea of creating a modern recruitment platform was born.</p>
          </div>

          <div className="timeline-card">
            <span>2026</span>

            <h4>Platform Development</h4>

            <p>
              Built using the MERN Stack with scalable backend architecture.
            </p>
          </div>

          <div className="timeline-card">
            <span>2026</span>

            <h4>First Recruiters Joined</h4>

            <p>
              Companies started posting jobs and hiring candidates through our
              platform.
            </p>
          </div>

          <div className="timeline-card">
            <span>Future</span>

            <h4>Global Expansion</h4>

            <p>
              Expanding worldwide with AI-powered hiring and personalized career
              recommendations.
            </p>
          </div>
        </div>

        {/* Achievements */}

        <div className="journey-achievements">
          <div className="achievement-card">
            <h2>500+</h2>

            <p>Companies Registered</p>
          </div>

          <div className="achievement-card">
            <h2>10K+</h2>

            <p>Job Seekers</p>
          </div>

          <div className="achievement-card">
            <h2>2K+</h2>

            <p>Jobs Posted</p>
          </div>

          <div className="achievement-card">
            <h2>95%</h2>

            <p>Customer Satisfaction</p>
          </div>
        </div>

        {/* Future */}

        <div className="future-vision">
          <h3>Looking Ahead</h3>

          <p>
            Our journey has only just begun. We are continuously improving our
            platform by introducing AI-powered job matching, smarter recruiter
            tools, resume analysis, interview preparation, and career guidance.
            Our vision is to become one of the most trusted career platforms
            connecting millions of professionals with companies around the
            world.
          </p>
        </div>
      </section>
    </>
  );
};

export default Section2;
