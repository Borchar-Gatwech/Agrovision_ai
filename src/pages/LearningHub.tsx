
// Updated Leanring Hub

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, Languages, Download, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const lessons = [
  {
    id: 1,
    title: "Sustainable Soil Management",
    category: "Soil Health",
    duration: "15 min",
    language: ["English", "Swahili"],
    type: "video",
    description: "Learn techniques to improve soil fertility and prevent erosion using organic methods.",
    level: "Beginner",
    videos: [
      "https://www.youtube.com/embed/rU2nhcLbLak",
      "https://www.youtube.com/embed/rU2nhcLbLak",
      "https://www.youtube.com/embed/rU2nhcLbLak",
      "https://www.youtube.com/embed/rU2nhcLbLak",
      "https://www.youtube.com/embed/rU2nhcLbLak",
    ],
  },
  {
    id: 2,
    title: "Integrated Pest Management",
    category: "Pest Control",
    duration: "20 min",
    language: ["English", "Swahili"],
    type: "video",
    description: "Natural and effective ways to control pests without harmful chemicals.",
    level: "Intermediate",
    videos: [
      "https://www.youtube.com/embed/p8kzxgYeAqQ",
      "https://www.youtube.com/embed/p8kzxgYeAqQ",
      "https://www.youtube.com/embed/p8kzxgYeAqQ",
      "https://www.youtube.com/embed/p8kzxgYeAqQ",
    ],
  },
  {
    id: 3,
    title: "Water Conservation Techniques",
    category: "Irrigation",
    duration: "12 min",
    language: ["English", "Swahili"],
    type: "video",
    description: "Maximize water efficiency with drip irrigation and rainwater harvesting.",
    level: "Beginner",
    videos: [
      "https://www.youtube.com/embed/v1k6BKsTELc",
      "https://www.youtube.com/embed/v1k6BKsTELc",
      "https://www.youtube.com/embed/v1k6BKsTELc",
    ],
  },
  {
    id: 4,
    title: "Crop Rotation Strategies",
    category: "Planting",
    duration: "18 min",
    language: ["English", "Swahili"],
    type: "video",
    description: "Improve yields and soil health through strategic crop rotation planning.",
    level: "Intermediate",
    videos: [
      "https://www.youtube.com/embed/64YapgN6G2w",
      "https://www.youtube.com/embed/64YapgN6G2w",
      "https://www.youtube.com/embed/64YapgN6G2w",
    ],
  },
  {
    id: 5,
    title: "Organic Fertilizer Production",
    category: "Fertilizers",
    duration: "25 min",
    language: ["English", "Swahili"],
    type: "video",
    description: "Create your own compost and organic fertilizers from farm waste.",
    level: "Beginner",
    videos: [
      "https://www.youtube.com/embed/xP3_B6G3P0o",
      "https://www.youtube.com/embed/xP3_B6G3P0o",
      "https://www.youtube.com/embed/xP3_B6G3P0o",
    ],
  },
  {
    id: 6,
    title: "Climate-Smart Agriculture",
    category: "Climate",
    duration: "22 min",
    language: ["English", "Swahili"],
    type: "video",
    description: "Adapt your farming practices to changing climate conditions.",
    level: "Advanced",
    videos: [
      "https://www.youtube.com/embed/i0V2xzEw44Y",
      "https://www.youtube.com/embed/i0V2xzEw44Y",
      "https://www.youtube.com/embed/i0V2xzEw44Y",
    ],
  },
  {
  id: 7,
  title: "Shamba Shape Up Sn 9 - Ep 4: Beef Cattle, Mangoes, Macadamia (English)",
  category: "Farming",
  duration: "22 min",
  language: ["English"],
  type: "video",
  description: "Learn practical tips on beef cattle management, mango, and macadamia farming from experts on Shamba Shape Up.",
  level: "Intermediate",
  videos: [
    "https://www.youtube.com/embed/xA17KKdXFiU",
    "https://www.youtube.com/embed/xA17KKdXFiU",
    "https://www.youtube.com/embed/xA17KKdXFiU",
  ],
},

{
  id: 8,
  title: "Shamba Shape Up Season 15 – Episode 22: Polyculture, Crab Shack, Solar Freezing & Dagaa Processor (English)",
  category: "Farming",
  duration: "22 min",
  language: ["English"],
  type: "video",
  description: "Explore sustainable aquaculture practices, solar freezing technology, and efficient fish processing in this  episode.",
  level: "Intermediate",
  videos: [
    "https://www.youtube.com/embed/FX7OH9u58qs",
    "https://www.youtube.com/embed/FX7OH9u58qs",
    "https://www.youtube.com/embed/FX7OH9u58qs",
  ],
},

{
  id: 9,
  title: "Shamba Shape Up Season 15 – Episode 15: Mastitis, Brush Cutter and Shamba ni Biz Drama (English)",
  category: "Farming",
  duration: "22 min",
  language: ["English"],
  type: "video",
  description: "Learn about mastitis prevention in dairy cows, efficient use of brush cutters, and insights from the Shamba ni Biz drama in this informative episode.",
  level: "Intermediate",
  videos: [
    "https://www.youtube.com/embed/rjvfhaAsaDo",
    "https://www.youtube.com/embed/rjvfhaAsaDo",
    "https://www.youtube.com/embed/rjvfhaAsaDo",
  ],
}



];

const categories = ["All", "Soil Health", "Pest Control", "Irrigation", "Planting", "Fertilizers", "Climate"];

export default function LearningHub() {
  const [language, setLanguage] = useState<"English" | "Swahili">("English");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [videoIndex, setVideoIndex] = useState(0);

  const filteredLessons =
    selectedCategory === "All"
      ? lessons
      : lessons.filter((lesson) => lesson.category === selectedCategory);

  const handleNext = () => {
    if (!selectedLesson) return;
    setVideoIndex((prev) =>
      prev < selectedLesson.videos.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    if (!selectedLesson) return;
    setVideoIndex((prev) =>
      prev > 0 ? prev - 1 : selectedLesson.videos.length - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">Learning Hub</h1>
              <p className="text-muted-foreground text-lg">
                Multilingual education on sustainable farming practices
              </p>
            </div>
            <div className="flex items-center gap-2 bg-card p-2 rounded-lg border border-border">
              <Languages className="h-5 w-5 text-muted-foreground" />
              <Button
                variant={language === "English" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("English")}
              >
                English
              </Button>
              <Button
                variant={language === "Swahili" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("Swahili")}
              >
                Swahili
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson, index) => (
            <motion.div key={lesson.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="h-full hover:shadow-lg transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-primary/10 rounded-lg p-2">
                      {lesson.type === "video" ? (
                        <Video className="h-6 w-6 text-primary" />
                      ) : (
                        <BookOpen className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <Badge variant="outline">{lesson.level}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {lesson.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {lesson.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{lesson.category}</Badge>
                    <Badge variant="secondary">
                      {lesson.type === "video" ? "Video" : "Article"}
                    </Badge>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={() => { setSelectedLesson(lesson); setVideoIndex(0); }}>
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal (Single Player + Navigation) */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3"
              onClick={() => setSelectedLesson(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <h2 className="text-xl font-bold mb-4">{selectedLesson.title}</h2>
            <div className="relative">
              <iframe
                key={videoIndex}
                src={selectedLesson.videos[videoIndex]}
                className="w-full h-64 md:h-96 rounded-lg shadow-md"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handlePrev}>
                  <ChevronLeft className="h-4 w-4 mr-2" /> Prev
                </Button>
                <Button variant="outline" onClick={handleNext}>
                  Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







