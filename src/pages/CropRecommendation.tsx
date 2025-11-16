import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, MapPin, Leaf, CheckCircle2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function CropRecommendation() {
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    soilType: "",
    pastYield: "",
  });

  // 🧠 Dynamic crop recommendations (from API)
  const [cropRecommendations, setCropRecommendations] = useState<any[]>([]);

  // 🌍 Connect React to FastAPI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.soilType || !formData.pastYield) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      toast.loading("Analyzing data with AI...");

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: formData.location,
          soilType: formData.soilType,
          pastYield: parseFloat(formData.pastYield),
        }),
      });


      if (!response.ok) throw new Error("Server error");

      const result = await response.json();

      // 🎯 Save API result to state
      setCropRecommendations([
        {
          name: result.recommended_crop,
          suitability: result.suitability,
          expectedYield: result.expected_yield,
          growthPeriod: "Varies by region",
          reasons: [
            "Based on soil type and rainfall conditions",
            "Past yield indicates strong potential",
            "Suitable for current climate patterns",
          ],
        },
      ]);

      setShowResults(true);
      toast.success("AI analysis complete!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to get AI recommendation");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Crop Recommendation System</h1>
          <p className="text-muted-foreground text-lg">
            Get AI-powered crop suggestions based on your farm's unique conditions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Farm Information
                </CardTitle>
                <CardDescription>
                  Enter your farm details to receive personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Nairobi"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  {/* Soil Type */}
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select
                      value={formData.soilType}
                      onValueChange={(value) => setFormData({ ...formData, soilType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="loam">Loam</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                        <SelectItem value="peat">Peat</SelectItem>
                        <SelectItem value="chalk">Chalk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Past Yield */}
                  <div className="space-y-2">
                    <Label htmlFor="pastYield">Previous Season Yield (tons/hectare)</Label>
                    <Input
                      id="pastYield"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 3.5"
                      value={formData.pastYield}
                      onChange={(e) => setFormData({ ...formData, pastYield: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Get AI Recommendations
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <div className="space-y-6">
            {!showResults ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="h-full flex items-center justify-center min-h-[400px]">
                  <CardContent className="text-center p-8">
                    <Sprout className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
                    <p className="text-muted-foreground">
                      Fill in your farm information to receive personalized crop recommendations powered by our AI system.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Recommended Crops</h2>

                {cropRecommendations.map((crop, index) => (
                  <motion.div
                    key={crop.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 rounded-lg p-2">
                              <Leaf className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle>{crop.name}</CardTitle>
                              <CardDescription>
                                {crop.suitability}% suitability for your farm
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Expected Yield</p>
                            <p className="font-semibold">{crop.expectedYield}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Growth Period</p>
                            <p className="font-semibold">{crop.growthPeriod}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Why this crop?</p>
                          <ul className="space-y-2">
                            {crop.reasons.map((reason: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
