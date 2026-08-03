import { useEffect } from "react";
import "./about.css";

export function About() {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = "About | Northwind Traders";
        
        return () => {
            document.title = originalTitle;
        };
    }, []);

    return (
        <div className="About">
            {/* Animated background light blob */}
            <div className="about-glow"></div>
            
            <h2 className="about-main-title">About Northwind Traders</h2>
            
            <div className="about-card">
                <section className="about-section">
                    <h3>The Platform</h3>
                    <p>
                        Northwind Traders is a next-generation Enterprise Resource Planning (ERP) and operations management system. 
                        Designed from the ground up to streamline complex corporate workflows, this platform provides 
                        administrators with seamless control over global product lifecycles, real-time inventory adjustments, 
                        and comprehensive workplace management.
                    </p>
                </section>

                <section className="about-section">
                    <h3>Core Capabilities</h3>
                    <div className="features-grid">
                        <div className="feature-item">
                            <h4>
                                <span role="img" aria-label="products">📦</span> Product Command Center
                            </h4>
                            <p>Advanced catalog tracking with comprehensive CRUD management, top-performing product analytics, dynamic pricing displays, and immediate stock synchronization across departments.</p>
                        </div>
                        <div className="feature-item">
                            <h4>
                                <span role="img" aria-label="employees">👥</span> Human Resources Hub
                            </h4>
                            <p>Granular employee profile tracking, featuring interactive modern data displays, localized region management, and quick administration actions.</p>
                        </div>
                        <div className="feature-item">
                            <h4>
                                <span role="img" aria-label="suppliers">🏢</span> Supplier Network Hub
                            </h4>
                            <p>Full supply chain transparency enabling operators to monitor registered supply partners, handle B2B contact channels, and audit external vendor inventory streams.</p>
                        </div>
                        <div className="feature-item">
                            <h4>
                                <span role="img" aria-label="security">🔐</span> Gateways & Access Controls
                            </h4>
                            <p>Secure role-based application routing containing protected system endpoints, specialized administrative monitors, and streamlined user sign-up or sign-in registration pipelines.</p>
                        </div>
                        <div className="feature-item">
                            <h4>
                                <span role="img" aria-label="ui">💎</span> Fluid Glassmorphic UI
                            </h4>
                            <p>A premium user experience built with modern design principles, responsive flex layout structures, smooth hover transitions, and dark-mode optimization.</p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <h3>Technical Engineering</h3>
                    <p>
                        The client-side architecture leverages React's declarative state management combined with TypeScript's 
                        strict type safety to guarantee solid stability, secure single-page route guards, and predictable performance under high load.
                    </p>
                    <div className="tech-stack">
                        <span className="tech-badge react-icon">React & Hooks</span>
                        <span className="tech-badge ts-icon">TypeScript</span>
                        <span className="tech-badge vite-icon">Vite Bundler</span>
                        <span className="tech-badge css-icon">Responsive Flexbox</span>
                        <span className="tech-badge html-icon">SPA Routing & REST API</span>
                    </div>
                </section>
            </div>
        </div>
    );
}