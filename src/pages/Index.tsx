import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cloud, Sprout, ShoppingBag, BookOpen, TrendingUp, Users, Leaf } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-farm.jpg";
import farmerTechImage from "@/assets/farmer-tech.jpg";

const features = [
  {
    icon: Cloud,
    title: "AI Weather Prediction",
    description: "Get accurate rainfall and soil moisture forecasts powered by machine learning.",
  },
  {
    icon: Sprout,
    title: "Crop Recommendations",
    description: "Receive personalized crop suggestions based on your location, soil, and climate data.",
  },
  {
    icon: ShoppingBag,
    title: "Market Connection",
    description: "Connect directly with buyers, cooperatives, and local markets in your region.",
  },
  {
    icon: BookOpen,
    title: "Farmer Education",
    description: "Access multilingual lessons and videos on sustainable farming practices.",
  },
];

const stats = [
  { value: "10K+", label: "Active Farmers" },
  { value: "95%", label: "Prediction Accuracy" },
  { value: "50+", label: "Crop Varieties" },
  { value: "24/7", label: "Support Available" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-primary-foreground"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Farmers for Food Security
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Make data-driven agricultural decisions with AI-powered insights, weather predictions, and market connections.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              How AgroVision AI Helps You
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with practical farming insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={farmerTechImage}
                alt="Farmer using technology"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Join Thousands of Successful Farmers
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Access AI-powered tools that help you increase yields, reduce risks, and connect with better markets.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 flex-shrink-0 mt-1" />
                  <span className="text-lg">Increase crop yields by up to 30%</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-6 w-6 flex-shrink-0 mt-1" />
                  <span className="text-lg">Connect with verified buyers and cooperatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 flex-shrink-0 mt-1" />
                  <span className="text-lg">Learn sustainable farming techniques</span>
                </li>
              </ul>
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Start Your Journey
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary rounded-lg p-2">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">AgroVision AI</span>
              </div>
              <p className="text-muted-foreground">
                Empowering farmers with AI-driven insights for sustainable agriculture.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/crops" className="hover:text-primary transition-colors">Crop Advisor</Link></li>
                <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
                <li><Link to="/learn" className="hover:text-primary transition-colors">Learning Hub</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Access</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2025 AgroVision AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
