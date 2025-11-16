import { useState } from "react";
import { motion } from "framer-motion";
import { Store, MapPin, Phone, Mail, Filter } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const buyers = [
  {
    name: "Green Valley Cooperative",
    type: "Cooperative",
    location: "Nairobi, Kenya",
    products: ["Maize", "Beans", "Vegetables"],
    phone: "+254 700 123 456",
    email: "contact@greenvalley.co.ke",
    rating: 4.8,
    verified: true,
  },
  {
    name: "Fresh Harvest Traders",
    type: "Buyer",
    location: "Mombasa, Kenya",
    products: ["Fruits", "Vegetables", "Cassava"],
    phone: "+254 700 234 567",
    email: "sales@freshharvest.co.ke",
    rating: 4.5,
    verified: true,
  },
  {
    name: "Agricultural Development Co.",
    type: "Cooperative",
    location: "Kisumu, Kenya",
    products: ["Maize", "Wheat", "Coffee"],
    phone: "+254 700 345 678",
    email: "info@agridev.co.ke",
    rating: 4.7,
    verified: false,
  },
  {
    name: "East Africa Grain Merchants",
    type: "Market",
    location: "Nakuru, Kenya",
    products: ["Maize", "Beans", "Millet"],
    phone: "+254 700 456 789",
    email: "contact@eagrain.co.ke",
    rating: 4.6,
    verified: true,
  },
  {
    name: "Organic Produce Network",
    type: "Buyer",
    location: "Nairobi, Kenya",
    products: ["Organic Vegetables", "Fruits"],
    phone: "+254 700 567 890",
    email: "buy@organicproduce.co.ke",
    rating: 4.9,
    verified: true,
  },
  {
    name: "Local Farmers Market",
    type: "Market",
    location: "Eldoret, Kenya",
    products: ["All Crops", "Livestock"],
    phone: "+254 700 678 901",
    email: "market@localfarmers.co.ke",
    rating: 4.4,
    verified: false,
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredBuyers = buyers.filter((buyer) => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === "all" || buyer.type.toLowerCase() === filterType;
    
    return matchesSearch && matchesType;
  });

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
          <h1 className="text-4xl font-bold mb-2 text-foreground">Marketplace</h1>
          <p className="text-muted-foreground text-lg">
            Connect with verified buyers, cooperatives, and local markets
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, location, or product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="cooperative">Cooperatives</SelectItem>
                      <SelectItem value="buyer">Buyers</SelectItem>
                      <SelectItem value="market">Markets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Buyers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuyers.map((buyer, index) => (
            <motion.div
              key={buyer.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Store className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge variant={buyer.verified ? "default" : "secondary"}>
                        {buyer.verified ? "Verified" : "Unverified"}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">{buyer.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{buyer.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {buyer.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Type</p>
                    <Badge variant="outline">{buyer.type}</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Buying</p>
                    <div className="flex flex-wrap gap-2">
                      {buyer.products.map((product) => (
                        <Badge key={product} variant="secondary">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border">
                    <a
                      href={`tel:${buyer.phone}`}
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {buyer.phone}
                    </a>
                    <a
                      href={`mailto:${buyer.email}`}
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {buyer.email}
                    </a>
                  </div>

                  <Button className="w-full">Contact Buyer</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredBuyers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No buyers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
