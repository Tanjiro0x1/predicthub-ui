import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, TrendingUp, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  const dummyData = [
    {
      company: "TechVision Inc",
      role: "Senior Data Scientist",
      salary: "$120,000",
      match: "95%"
    },
    {
      company: "CloudScale Solutions",
      role: "Machine Learning Engineer",
      salary: "$105,000",
      match: "89%"
    },
    {
      company: "AI Innovations Co",
      role: "Full Stack Developer",
      salary: "$95,000",
      match: "87%"
    }
  ];

  const features = [
    {
      icon: Briefcase,
      title: "Smart Job Matching",
      description: "AI-powered predictions for better job fit"
    },
    {
      icon: TrendingUp,
      title: "Salary Insights",
      description: "Market-based compensation analysis"
    },
    {
      icon: Award,
      title: "Role Optimization",
      description: "Match your skills with perfect positions"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get predictions in real-time"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Job Prediction AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Enter job details and get AI-powered predictions on job fit, salary expectations, and career insights
            </p>
            <Link to="/predict">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
          </header>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur border-primary/10">
                <CardContent className="pt-6">
                  <feature.icon className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Dummy Data Examples */}
      <div className="container mx-auto px-4 py-12 bg-muted/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Recent Predictions</h2>
          <p className="text-muted-foreground">See how our AI matches jobs with candidates</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {dummyData.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-primary">{item.match}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.role}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                <div className="pt-3 border-t">
                  <p className="text-sm font-medium">Expected Salary: <span className="text-primary">{item.salary}</span></p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <footer className="border-t mt-16 py-8 text-center text-sm text-muted-foreground">
        <p>Powered by Flask ML API • Real-time predictions • Secure data handling</p>
      </footer>
    </div>
  );
};

export default Index;
