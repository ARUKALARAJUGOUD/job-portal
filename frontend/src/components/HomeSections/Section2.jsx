
import "../../cssStyle/Home.css";
const Section2 = () => {
  return (
    <>
      {/* =====================================================
                    WHO WE ARE SECTION
      ====================================================== */}

      <section className="about-company">
        {/* Left Side */}

        <div className="about-company-image">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
            alt="Our Team"
          />
        </div>

        {/* Right Side */}

        <div className="about-company-content">
          <span className="section-subtitle">ABOUT JOBSPHERE</span>

          <h2>
            Building the Future of
            <span> Recruitment</span>
          </h2>

          <p>
            JobSphere is a next-generation recruitment platform designed to
            connect talented professionals with trusted companies. Our mission
            is to make hiring faster, smarter, and more transparent for both job
            seekers and recruiters.
          </p>

          <p>
            Whether you're searching for your dream career or looking for the
            perfect candidate, our platform provides modern tools that simplify
            every stage of the hiring process.
          </p>

          {/* Feature Cards */}

          <div className="company-highlights">
            <div className="highlight-card">
              <h3>🎯 Our Mission</h3>

              <p>Empower every professional with equal career opportunities.</p>
            </div>

            <div className="highlight-card">
              <h3>🚀 Our Vision</h3>

              <p>Become India's most trusted digital hiring platform.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section2;
