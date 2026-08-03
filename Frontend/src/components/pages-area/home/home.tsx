import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export function Home() {
    const [serverOnline, setServerOnline] = useState(true);
    const navigate = useNavigate();
    const [productsCount, setProductsCount] = useState(0);
    const [employeesCount, setEmployeesCount] = useState(0);
    const [suppliersCount, setSuppliersCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        async function fetchDashboardTelemetry() {
            try {
                const productsResponse = await fetch("http://localhost:4000/api/products");
                const productsData = await productsResponse.json();
                setProductsCount(productsData.length);

                const employeesResponse = await fetch("http://localhost:4000/api/employees");
                const employeesData = await employeesResponse.json();
                setEmployeesCount(employeesData.length);

                const suppliersResponse = await fetch("http://localhost:4000/api/suppliers");
                const suppliersData = await suppliersResponse.json();
                setSuppliersCount(suppliersData.length);

                setServerOnline(true);
            } catch (error) {
                console.error("Database telemetry synchronization failure:", error);
                setServerOnline(false);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDashboardTelemetry();
    }, []);

    // Products Grid Reactive Tail (Base: 78) -> +1 pulls tail up significantly, -1 drops it down
    const productP4 = Math.max(2, Math.min(28, 18 - (productsCount - 78) * 2.0));
    const productP5 = Math.max(2, Math.min(28, 12 - (productsCount - 78) * 4.5));
    const productLine = `M0,22 L25,15 L50,23 L75,${productP4} L100,${productP5}`;

    // Employees Grid Reactive Tail (Base: 9) -> +1 pulls tail up significantly, -1 drops it down
    const employeeE4 = Math.max(2, Math.min(28, 20 - (employeesCount - 9) * 2.5));
    const employeeE5 = Math.max(2, Math.min(28, 14 - (employeesCount - 9) * 5.0));
    const employeeLine = `M0,14 L25,22 L50,15 L75,${employeeE4} L100,${employeeE5}`;

    // Suppliers Grid Reactive Tail (Base: 29) -> +1 pulls tail up significantly, -1 drops it down
    const supplierS4 = Math.max(2, Math.min(28, 16 - (suppliersCount - 29) * 2.0));
    const supplierS5 = Math.max(2, Math.min(28, 10 - (suppliersCount - 29) * 4.5));
    const supplierLine = `M0,21 L25,12 L50,20 L75,${supplierS4} L100,${supplierS5}`;

    return (
        <div className="Home">
            <div className="home-glow"></div>
            
            {/* Rigidly Constrained Liquid Glass Header Panel */}
            <header className="dashboard-header interactive-node">
                <div className="header-title-block">
                    <h2 className="home-main-title">Management Console</h2>
                    <p className="header-subtitle">Real-time control center for Northwind products and workforce workflows.</p>
                </div>
                
                <div className="system-meta-controls">
                    <div className={`live-indicator ${!serverOnline ? "offline" : ""}`}>
                        <span className="pulse-dot"></span>
                        {serverOnline ? "App Active" : "App Offline"}
                    </div>
                </div>
            </header>
            
            {/* Metrics Content Row Grid */}
            <div className="dashboard-grid">
                
                {/* Products Telemetry Card */}
                <div className="dash-card interactive-node" onClick={() => navigate("/products")}>
                    <div className="dash-details">
                        <span className="stat-category">Inventory Catalog</span>
                        <h3 className={`stat-value ${!serverOnline ? "offline" : ""}`}>
                            {!serverOnline ? 0 : isLoading ? "..." : productsCount}
                        </h3>
                        
                        <p className="stat-title">Active Products Displayed</p>
                        
                        <div className="sparkline-container">
                            <svg className="sparkline-graph" viewBox="0 0 100 30" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="cyan-glow-mesh" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d={serverOnline ? `${productLine} L100,30 L0,30 Z` : "M0,18 L100,18 L100,30 L0,30 Z"}
                                    fill={serverOnline ? "url(#cyan-glow-mesh)" : "rgba(160,160,160,.08)"}
                                />
                                <path
                                    className={serverOnline ? "live-pulse-path" : "offline-path"}
                                    d={serverOnline ? productLine : "M0,18 L100,18"}
                                    fill="none"
                                    stroke={serverOnline ? "#00ffcc" : "#9ca3af"}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        
                        <div className="stat-footer">
                            <span className="trend-badge positive">View Grid</span>
                            <span className="footer-subtext">Explore current inventory catalog</span>
                        </div>
                    </div>
                    <div className="stat-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-svg-icon">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        </svg>
                    </div>
                </div>

                {/* Personnel Telemetry Card */}
                <div className="dash-card interactive-node" onClick={() => navigate("/employees")}>
                    <div className="dash-details">
                        <span className="stat-category">Workforce Management</span>
                        <h3 className={`stat-value ${!serverOnline ? "offline" : ""}`}>
                            {!serverOnline ? 0 : isLoading ? "..." : employeesCount}
                        </h3>
                        <p className="stat-title">Registered Corporate Employees</p>
                        
                        <div className="sparkline-container">
                            <svg className="sparkline-graph" viewBox="0 0 100 30" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="purple-glow-mesh" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#d1b3ff" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#d1b3ff" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d={serverOnline ? `${employeeLine} L100,30 L0,30 Z` : "M0,18 L100,18 L100,30 L0,30 Z"}
                                    fill={serverOnline ? "url(#purple-glow-mesh)" : "rgba(160,160,160,.08)"}
                                />
                                <path
                                    className={serverOnline ? "live-pulse-path" : "offline-path"}
                                    d={serverOnline ? employeeLine : "M0,18 L100,18"}
                                    fill="none"
                                    stroke={serverOnline ? "#d1b3ff" : "#9ca3af"}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        
                        <div className="stat-footer">
                            <span className="trend-badge neutral">View Staff</span>
                            <span className="footer-subtext">Manage operational personnel teams</span>
                        </div>
                    </div>
                    <div className="stat-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-svg-icon">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                        </svg>
                    </div>
                </div>

                {/* Suppliers Telemetry Card */}
                <div className="dash-card interactive-node" onClick={() => navigate("/suppliers")}>
                    <div className="dash-details">
                        <span className="stat-category">Supplier Network</span>
                        <h3 className={`stat-value ${!serverOnline ? "offline" : ""}`}>
                            {!serverOnline ? 0 : isLoading ? "..." : suppliersCount}
                        </h3>
                        <p className="stat-title">Registered Supply Partners</p>
                        
                        <div className="sparkline-container">
                            <svg className="sparkline-graph" viewBox="0 0 100 30" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="orange-glow-mesh" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#ffb347" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d={serverOnline ? `${supplierLine} L100,30 L0,30 Z` : "M0,18 L100,18 L100,30 L0,30 Z"}
                                    fill={serverOnline ? "url(#orange-glow-mesh)" : "rgba(160,160,160,.08)"}
                                />
                                <path
                                    className={serverOnline ? "live-pulse-path" : "offline-path"}
                                    d={serverOnline ? supplierLine : "M0,18 L100,18"}
                                    fill="none"
                                    stroke={serverOnline ? "#ffb347" : "#9ca3af"}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        
                        <div className="stat-footer">
                            <span
                                className="trend-badge"
                                style={{
                                    color: "#ffb347",
                                    background: "rgba(255,179,71,.08)",
                                    border: "1px solid rgba(255,179,71,.18)"
                                }}
                            >
                                View Suppliers
                            </span>
                            <span className="footer-subtext">Browse supplier network</span>
                        </div>
                    </div>
                    <div className="stat-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-svg-icon">
                            <path d="M3 21h18" />
                            <path d="M5 21V7l7-4 7 4v14" />
                            <path d="M9 9h6" />
                            <path d="M9 13h6" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Fully Interactive Application Session Logs Panel */}
            <div className="analytics-single-layout interactive-node">
                <div className="analytics-block log-panel">
                    <header className="block-header">
                        <h5>Application Activity Stream</h5>
                        <span className={`realtime-pill ${!serverOnline ? "offline" : ""}`}>
                            <span className="pulse-dot"></span>
                            {serverOnline ? "Active Session" : "Offline Session"}
                        </span>
                    </header>
                    
                    <div className="log-stream">
                        <div className="log-item success">
                            <span className="log-status-dot"></span>
                            <span className="log-time">Database</span>
                            <span className="log-msg">Catalog structures synchronized with REST API Server context successfully.</span>
                        </div>
                        <div className="log-item info">
                            <span className="log-status-dot"></span>
                            <span className="log-time">Router</span>
                            <span className="log-msg">Single-page navigation mapping completed. Links bound to end match parameters.</span>
                        </div>
                        <div className="log-item warning">
                            <span className="log-status-dot"></span>
                            <span className="log-time">Interface</span>
                            <span className="log-msg">Glassmorphic rendering tree layout calculated and optimized for responsive devices.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fully Interactive System Controller Operations Bar */}
            <div className="control-bar-panel interactive-node">
                <div className="panel-info">
                    <h4>Global System Operations</h4>
                    <p>Instant pipeline controllers to execute dynamic modifications across storage maps.</p>
                </div>
                <div className="action-flex-group">
                    <button className="operation-trigger-btn" onClick={(e) => { e.stopPropagation(); navigate("/products/new"); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="12" x2="12" y2="22"></line>
                        </svg>
                        Create Product
                    </button>
                    <button className="operation-trigger-btn" onClick={(e) => { e.stopPropagation(); navigate("/employees/new"); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <line x1="19" y1="8" x2="19" y2="14"></line>
                            <line x1="16" y1="11" x2="22" y2="11"></line>
                        </svg>
                        Enroll Employee
                    </button>
                    <button className="operation-trigger-btn" onClick={(e) => { e.stopPropagation(); navigate("/suppliers/new"); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                            <path d="M3 21h18"/>
                            <path d="M5 21V7l7-4 7 4v14"/>
                            <path d="M9 9h6"/>
                            <path d="M9 13h6"/>
                        </svg>
                        Add Supplier
                    </button>
                </div>
            </div>
        </div>
    );
}