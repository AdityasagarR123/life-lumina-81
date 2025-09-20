import { Component as HeroSection } from '@/components/ui/horizon-hero-section';
import { Button } from '@/components/ui/button';
import CardFlip from '@/components/ui/flip-card';
import aiDiagnosticsImg from '@/assets/ai-diagnostics.jpg';
import patientManagementImg from '@/assets/patient-management.jpg';
import healthcareAnalyticsImg from '@/assets/healthcare-analytics.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [scrollCount, setScrollCount] = useState(0);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      
      // Show login button after significant scroll progress (around 70%)
      if (scrollPercentage > 0.7 && !showLoginButton) {
        setShowLoginButton(true);
      }
      
      // Count scroll events (simplified approach)
      if (Math.abs(scrollTop - lastScrollTop) > 100) {
        setScrollCount(prev => prev + 1);
        lastScrollTop = scrollTop;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showLoginButton]);

  return (
    <div className="relative">
      <HeroSection />
      
      {/* Floating Login Button */}
      {showLoginButton && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in">
          <Button
            onClick={() => navigate('/login')}
            variant="default"
            size="lg"
            className="bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-4 text-lg font-medium shadow-lg hover:shadow-glow transition-all duration-300 backdrop-blur-sm border border-primary/20"
          >
            Get Started
          </Button>
        </div>
      )}
      
      {/* Bottom section with additional content */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-background min-h-screen flex items-end">
        <div className="container mx-auto px-6 pb-20">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Platform
            </h2>
            <p className="text-xl text-muted-foreground mb-16 leading-relaxed max-w-4xl mx-auto">
              Modern solutions designed to streamline processes, enhance user experiences, 
              and drive meaningful results through innovative technology.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Smart Analytics */}
              <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="w-7 h-7 bg-primary rounded-lg opacity-80"></div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Smart Analytics</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Advanced data analysis with intelligent insights and automated reporting</p>
              </div>

              {/* User Experience */}
              <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 hover:border-accent/50 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <div className="w-7 h-7 bg-accent rounded-lg opacity-80"></div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">User Experience</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Intuitive interfaces designed for seamless interaction and productivity</p>
              </div>

              {/* Performance Optimization */}
              <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 hover:border-success/50 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-success/20 transition-colors">
                  <div className="w-7 h-7 bg-success rounded-lg opacity-80"></div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Performance Engine</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Optimized performance with scalable architecture and fast response times</p>
              </div>

              {/* Dashboard Management */}
              <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 hover:border-info/50 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-info/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-info/20 transition-colors">
                  <div className="w-7 h-7 bg-info rounded-lg opacity-80"></div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Dashboard Management</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Comprehensive dashboards with real-time monitoring and control features</p>
              </div>

              {/* Collaboration Tools */}
              <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 hover:border-warning/50 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-warning/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-warning/20 transition-colors">
                  <div className="w-7 h-7 bg-warning rounded-lg opacity-80"></div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Collaboration Hub</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Enhanced team collaboration with secure sharing and communication tools</p>
              </div>

              {/* AI Assistant */}
              <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="w-7 h-7 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">AI Assistant</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Intelligent assistant for automated tasks and instant support</p>
              </div>

              {/* Process Automation */}
              <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 hover:border-accent/50 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <div className="w-7 h-7 bg-gradient-to-br from-accent to-success rounded-lg"></div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Process Automation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Streamlined workflows with intelligent automation and optimization</p>
              </div>

              {/* Advanced Security */}
              <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 hover:border-success/50 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-success/20 transition-colors">
                  <div className="w-7 h-7 bg-gradient-to-br from-success to-info rounded-lg"></div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Advanced Security</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Enterprise-grade security with encryption and comprehensive protection</p>
              </div>
            </div>
            
            {/* Flip Card Demo Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">Interactive Components</h3>
              <div className="flex flex-wrap justify-center gap-8">
                <CardFlip 
                  title="OnCore AI Diagnostics"
                  subtitle="Advanced medical AI analysis"
                  description="Leverage cutting-edge AI algorithms to provide accurate medical diagnostics and treatment recommendations."
                  features={['AI-Powered Diagnosis', 'Medical Image Analysis', 'Treatment Recommendations', 'Risk Assessment']}
                  color="hsl(214, 100%, 60%)"
                  image={aiDiagnosticsImg}
                />
                
                <CardFlip 
                  title="Smart Patient Management"
                  subtitle="Streamlined healthcare workflows"
                  description="Intelligent patient management system with automated scheduling, monitoring, and care coordination."
                  features={['Smart Scheduling', 'Patient Monitoring', 'Care Coordination', 'Automated Reminders']}
                  color="hsl(190, 100%, 65%)"
                  image={patientManagementImg}
                />
                
                <CardFlip 
                  title="Healthcare Analytics"
                  subtitle="Data-driven medical insights"
                  description="Comprehensive analytics platform for healthcare providers with real-time insights and predictive modeling."
                  features={['Predictive Analytics', 'Real-time Dashboards', 'Population Health', 'Outcome Tracking']}
                  color="hsl(142, 71%, 45%)"
                  image={healthcareAnalyticsImg}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;