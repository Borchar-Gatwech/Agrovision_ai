import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Droplets,
  Sun,
  Wind,
  TrendingUp,
  AlertCircle,
  Loader2,
  History,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

// 🌍 Supported regions
const REGIONS = ["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru"];

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState("Nairobi");
  const [weatherForecast, setWeatherForecast] = useState<any[]>([]);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ⛅ New: history states
  const [showHistory, setShowHistory] = useState(false);
  const [weatherHistory, setWeatherHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchRegionData(selectedRegion);
  }, [selectedRegion]);

  const fetchRegionData = async (city: string) => {
    setLoading(true);
    console.log("🌍 Fetching weather data for:", city);

    try {
      const API_KEY = import.meta.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
      const response = await fetch(
        `${BASE_URL}?q=${city},KE&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("Failed to fetch weather forecast");

      const data = await response.json();

      // 📊 Group 3-hour data into daily averages
      const dailyForecast = data.list.reduce((acc: any, item: any) => {
        const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
        });
        if (!acc[date]) {
          acc[date] = { day: date, rainfall: 0, temperature: 0, count: 0 };
        }
        acc[date].rainfall += item.rain?.["3h"] || 0;
        acc[date].temperature += item.main.temp;
        acc[date].count += 1;
        return acc;
      }, {});

      const forecast = Object.values(dailyForecast)
        .slice(0, 7)
        .map((d: any) => ({
          ...d,
          temperature: (d.temperature / d.count).toFixed(1),
          soilMoisture: Math.min(100, Math.max(40, 80 + (d.rainfall - 10) * 2)),
        }));

      setWeatherForecast(forecast);

      // ✅ Save to Supabase
      const { error: weatherError } = await supabase.from("weather_data").insert([
        {
          city,
          forecast,
          timestamp: new Date().toISOString(),
        },
      ]);
      if (weatherError) {
        console.warn("⚠️ Weather data not saved:", weatherError.message);
      } else {
        console.log("✅ Weather data saved to Supabase!");
      }

      // 🧠 AI Insights generation
      const summary = forecast
        .map(
          (f: any) =>
            `${f.day}: ${f.temperature}°C, ${f.rainfall.toFixed(
              1
            )}mm rainfall, ${f.soilMoisture.toFixed(1)}% soil moisture`
        )
        .join("\n");

      const aiPrompt = `
      You are an agricultural weather assistant. Based on this 7-day forecast for ${city},
      give 3 short, actionable insights for farmers.
      Forecast:
      ${summary}
      `;

      const aiResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-insights`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt: aiPrompt }),
        }
      );


      if (!aiResponse.ok) throw new Error("AI insights request failed");
      const aiData = await aiResponse.json();

      const insightsText =
        aiData?.insight ||
        aiData[0]?.generated_text ||
        aiData?.generated_text ||
        aiData?.output_text ||
        "";

      const parsedInsights = insightsText
        .split(/\d+\.\s|[-•]\s/)
        .filter((i) => i.trim() !== "")
        .slice(0, 3)
        .map((text, i) => ({
          title: `Insight ${i + 1}`,
          description: text.trim(),
          icon: i === 0 ? Cloud : i === 1 ? TrendingUp : Droplets,
        }));

      setAiInsights(parsedInsights);

      await supabase.from("ai_insights").insert([
        {
          region: city,
          insight: JSON.stringify(parsedInsights),
        },
      ]);
    } catch (error) {
      console.error("Error in fetchRegionData:", error);
      const fallbackInsights = [
        {
          title: "Insight 1",
          description: `Monitor soil moisture in ${city}.`,
          icon: Cloud,
        },
        {
          title: "Insight 2",
          description: "Adjust irrigation according to rainfall.",
          icon: TrendingUp,
        },
        {
          title: "Insight 3",
          description: "Good planting conditions soon.",
          icon: Droplets,
        },
      ];
      setAiInsights(fallbackInsights);
      toast.warning("Using fallback insights - AI unavailable");
    } finally {
      setLoading(false);
    }
  };

  // 📜 Fetch weather history from Supabase
  const fetchWeatherHistory = async () => {
    setShowHistory(!showHistory);
    if (showHistory) return; // collapse
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from("weather_data")
        .select("*")
        .order("timestamp", { ascending: false });
      if (error) throw error;
      setWeatherHistory(data || []);
    } catch (err) {
      console.error("Error fetching weather history:", err);
      toast.error("Failed to load history");
    } finally {
      setLoadingHistory(false);
    }
  };

  // 🖥️ UI Display
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">
                Weather Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                AI-powered weather insights for Kenyan farms
              </p>
            </div>

            <div className="flex items-center gap-3">
              {loading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
              <Select
                value={selectedRegion}
                onValueChange={(v) => setSelectedRegion(v)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={fetchWeatherHistory}
                className="flex items-center gap-2"
              >
                <History className="w-4 h-4" />
                {showHistory ? "Hide History" : "View History"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Weather Summary Cards */}
        {weatherForecast.length > 0 && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: Sun,
                label: "Avg Temperature",
                value: `${weatherForecast[0].temperature}°C`,
                color: "text-orange-500",
              },
              {
                icon: Droplets,
                label: "Soil Moisture",
                value: `${weatherForecast[0].soilMoisture.toFixed(1)}%`,
                color: "text-blue-500",
              },
              {
                icon: Cloud,
                label: "Rainfall Today",
                value: `${weatherForecast[0].rainfall.toFixed(1)}mm`,
                color: "text-slate-500",
              },
              {
                icon: Wind,
                label: "Wind Speed",
                value: "N/A",
                color: "text-cyan-500",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {item.label}
                        </p>
                        <p className="text-2xl font-bold">{item.value}</p>
                      </div>
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Weather Forecast</CardTitle>
              <CardDescription>Rainfall and temperature trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weatherForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rainfall"
                    stroke="hsl(var(--primary))"
                    name="Rainfall (mm)"
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="hsl(var(--accent))"
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Soil Moisture Forecast</CardTitle>
              <CardDescription>Predicted soil moisture</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weatherForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="soilMoisture"
                    fill="hsl(var(--primary))"
                    name="Soil Moisture (%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>AI Insights & Recommendations</CardTitle>
              <CardDescription>Smart suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.length > 0 ? (
                aiInsights.map((insight, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50"
                  >
                    <div className="bg-primary/10 rounded-lg p-2 h-fit">
                      <insight.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Generating AI insights...</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 🌦️ Weather History Section */}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Saved Weather History</CardTitle>
                <CardDescription>
                  Previously recorded forecasts from Supabase
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingHistory ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : weatherHistory.length === 0 ? (
                  <p className="text-muted-foreground text-center">
                    No history found.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {weatherHistory.map((entry, i) => (
                      <div
                        key={entry.id || i}
                        className="border rounded-lg p-4 bg-muted/20"
                      >
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() =>
                            setExpandedIndex(expandedIndex === i ? null : i)
                          }
                        >
                          <div>
                            <p className="font-semibold">{entry.city}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(entry.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {expandedIndex === i ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>

                        {expandedIndex === i && (
                          <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {entry.forecast.map((day: any, idx: number) => (
                              <div
                                key={idx}
                                className="rounded-md border p-3 bg-white/50"
                              >
                                <p className="font-semibold">{day.day}</p>
                                <p className="text-sm text-muted-foreground">
                                  Temp: {day.temperature}°C
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Rain: {day.rainfall.toFixed(1)}mm
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Soil: {day.soilMoisture.toFixed(1)}%
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}