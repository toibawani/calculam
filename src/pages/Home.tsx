import { ArrowRight, Calculator, Command, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="calculam-home">
      <div className="home-glow home-glow-one" />
      <div className="home-glow home-glow-two" />

      <nav className="home-nav">
        <Link to="/" className="brand">
          <div className="brand-mark">
            <Calculator size={20} strokeWidth={2.4} />
          </div>

          <span>Calculam</span>
        </Link>

        <div className="nav-actions">
          <Link to="/workspace" className="nav-link">
            Workspace
          </Link>

          <Link to="/workspace" className="nav-cta">
            Open Calculam
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={15} />
          <span>A smarter way to calculate</span>
        </div>

        <h1>
          Calculation,
          <br />
          <span>beautifully simplified.</span>
        </h1>

        <p className="hero-description">
          Calculam is a modern calculation workspace designed for
          everyday math, conversions, quick answers and everything
          in between.
        </p>

        <div className="hero-actions">
          <Link to="/workspace" className="primary-action">
            Get Started
            <ArrowRight size={18} />
          </Link>

          <Link to="/workspace" className="secondary-action">
            <Command size={17} />
            Explore Workspace
          </Link>
        </div>

        <div className="hero-preview">
          <div className="preview-window">
            <div className="preview-topbar">
              <div className="window-dots">
                <span />
                <span />
                <span />
              </div>

              <div className="preview-title">
                Calculam Workspace
              </div>

              <div className="preview-status">
                Ready
              </div>
            </div>

            <div className="preview-content">
              <div className="preview-sidebar">
                <div className="preview-sidebar-logo">
                  <Calculator size={16} />
                </div>

                <div className="preview-sidebar-item active">
                  Calculator
                </div>

                <div className="preview-sidebar-item">
                  Converter
                </div>

                <div className="preview-sidebar-item">
                  History
                </div>
              </div>

              <div className="preview-main">
                <div className="preview-heading">
                  <span>Good to see you.</span>
                  <strong>What are we calculating?</strong>
                </div>

                <div className="preview-cards">
                  <div className="preview-card">
                    <span>Basic Calculator</span>
                    <strong>1,248.50</strong>
                  </div>

                  <div className="preview-card">
                    <span>Quick Conversion</span>
                    <strong>12.4 km</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}