
import "../../cssStyle/Home.css";
const Section3 = () => {
  return (
    <>
      {/* =====================================================
                WHY CHOOSE US
===================================================== */}

      <section className="why-us-section">
        <div className="section-heading">
          <span>WHY CHOOSE US</span>

          <h2>
            Everything You Need To Build
            <span> Your Career</span>
          </h2>

          <p>
            We provide modern hiring solutions that help job seekers find
            opportunities faster while enabling recruiters to hire the best
            talent with ease.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💼</div>

            <h3>Verified Jobs</h3>

            <p>
              Every job listing is reviewed to ensure authenticity and quality
              opportunities.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏢</div>

            <h3>Top Companies</h3>

            <p>
              Connect with trusted startups, enterprises and global
              organizations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>

            <h3>Quick Apply</h3>

            <p>
              Apply to your dream jobs with just a few clicks using your
              profile.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>

            <h3>Career Growth</h3>

            <p>Discover opportunities that help you grow professionally.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>

            <h3>Secure Platform</h3>

            <p>
              Your personal information is protected using industry-standard
              security.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌎</div>

            <h3>Remote Opportunities</h3>

            <p>
              Explore hybrid, remote and onsite jobs from companies worldwide.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section3;
