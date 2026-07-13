import { useState } from "react";
import "../../cssStyle/Home.css";

const Section4 = () => {
  const faqData = [
    {
      question: "How do I apply for a job?",
      answer:
        "Create an account, complete your profile, upload your resume, and click the Apply button on any job that matches your skills.",
    },
    {
      question: "Is creating an account free?",
      answer:
        "Yes. Job seekers can create an account, search jobs, save jobs, and apply to unlimited opportunities without any cost.",
    },
    {
      question: "Can recruiters post jobs for free?",
      answer:
        "Recruiters can create a company profile and publish job openings based on the available plans provided by the platform.",
    },
    {
      question: "How can I track my job applications?",
      answer:
        "You can visit the 'My Applications' page from your dashboard to monitor the current status of every application.",
    },
    {
      question: "Can I edit my profile after registration?",
      answer:
        "Yes. You can update your profile information, resume, skills, education, experience, and social links anytime from your dashboard.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We use secure authentication, encrypted passwords, and industry-standard security practices to protect your personal information.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section className="faq-section">
        <div className="section-heading">
          <span>FAQ</span>

          <h2>
            Frequently Asked
            <span> Questions</span>
          </h2>

          <p>
            Find answers to the most common questions asked by job seekers and
            recruiters using JobSphere.
          </p>
        </div>

        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>

                <span>{activeIndex === index ? "−" : "+"}</span>
              </div>

              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Section4;
