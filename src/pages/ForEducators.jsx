import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ForEducators.css';

function ForEducators() {
  return (
    <div className="for-educators">
      <Navbar />
      
      <main className="educators-main">
        <section className="educators-hero">
          <div className="hero-content">
            <h1>Empower Your Students with Real-World Experience</h1>
            <p className="hero-description">
              Integrate job simulations into your curriculum and prepare students for successful careers
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request Demo
              </Link>
              <Link to="/blog" className="btn btn-outline btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section className="why-educators">
          <div className="section-container">
            <h2 className="section-title">Why Educators Choose CAREERZ.AZ</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🎓</div>
                <h3>Bridge Theory and Practice</h3>
                <p>Help students apply classroom knowledge to real-world scenarios from leading companies in Azerbaijan.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📊</div>
                <h3>Track Student Progress</h3>
                <p>Monitor student performance, identify strengths and areas for improvement with detailed analytics.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🤝</div>
                <h3>Industry Partnerships</h3>
                <p>Connect your students with top employers through authentic job simulations and recruitment opportunities.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Easy Integration</h3>
                <p>Seamlessly incorporate simulations into your existing curriculum with our educator resources and support.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works-educators">
          <div className="section-container">
            <h2 className="section-title">How It Works for Educators</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Create Your Classroom</h3>
                <p>Set up a virtual classroom and invite your students to join with a simple class code.</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Assign Simulations</h3>
                <p>Choose from our library of industry simulations or request custom ones for your curriculum.</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Monitor Progress</h3>
                <p>Track student engagement, completion rates, and performance in real-time through your dashboard.</p>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <h3>Provide Feedback</h3>
                <p>Review student submissions and provide personalized feedback to enhance their learning experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="use-cases">
          <div className="section-container">
            <h2 className="section-title">Use Cases</h2>
            <div className="use-cases-grid">
              <div className="use-case-card">
                <h3>🏫 Universities & Colleges</h3>
                <p>Enhance business, IT, and engineering programs with practical simulations that prepare students for their first job.</p>
                <ul>
                  <li>Career preparation courses</li>
                  <li>Capstone projects</li>
                  <li>Internship preparation</li>
                </ul>
              </div>
              <div className="use-case-card">
                <h3>🎯 Vocational Schools</h3>
                <p>Provide hands-on training in specific industries and help students develop job-ready skills.</p>
                <ul>
                  <li>Technical skill development</li>
                  <li>Industry certifications</li>
                  <li>Job placement support</li>
                </ul>
              </div>
              <div className="use-case-card">
                <h3>📚 Career Centers</h3>
                <p>Support students in exploring career paths and building confidence before entering the job market.</p>
                <ul>
                  <li>Career exploration</li>
                  <li>Interview preparation</li>
                  <li>Resume building</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="features-educators">
          <div className="section-container">
            <h2 className="section-title">Features for Educators</h2>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h4>Class Management Dashboard</h4>
                  <p>Organize students, assign simulations, and track progress all in one place</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h4>Performance Analytics</h4>
                  <p>Detailed insights into student performance, completion rates, and skill development</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h4>Custom Simulations</h4>
                  <p>Request tailored simulations that align with your specific curriculum needs</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h4>Educator Resources</h4>
                  <p>Access teaching guides, discussion prompts, and assessment rubrics</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h4>Student Feedback Tools</h4>
                  <p>Provide personalized feedback and guidance on student submissions</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h4>Free for Educators</h4>
                  <p>No cost for verified educators and educational institutions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-educators">
          <div className="section-container">
            <h2 className="section-title">What Educators Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "CAREERZ.AZ has transformed how we prepare students for the job market. 
                  The simulations provide real-world context that textbooks simply can't match."
                </p>
                <div className="testimonial-author">
                  <strong>Dr. Aysel Mammadova</strong>
                  <span>Professor, Azerbaijan State University of Economics</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "Our students are more confident and better prepared for interviews after 
                  completing simulations. The platform is intuitive and easy to integrate."
                </p>
                <div className="testimonial-author">
                  <strong>Rashad Aliyev</strong>
                  <span>Career Services Director, ADA University</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "The analytics help me identify which students need extra support. 
                  It's been invaluable for personalizing my teaching approach."
                </p>
                <div className="testimonial-author">
                  <strong>Leyla Hasanova</strong>
                  <span>Business Instructor, Baku Higher Oil School</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-box">
            <h2>Ready to Get Started?</h2>
            <p>Join hundreds of educators across Azerbaijan who are preparing students for successful careers</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request Educator Access
              </Link>
              <Link to="/blog" className="btn btn-outline btn-lg">
                View Resources
              </Link>
            </div>
            <p className="cta-note">Free for verified educators and educational institutions</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ForEducators;
