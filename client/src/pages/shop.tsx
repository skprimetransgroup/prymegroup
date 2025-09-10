import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Star, Filter, Grid, List } from "lucide-react";
import { useState } from "react";

// Mock product data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Premium Safety Gear Set",
    price: 149.99,
    originalPrice: 199.99,
    category: "Safety Equipment",
    rating: 4.8,
    reviews: 124,
    image: "/api/placeholder/300/300",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Industrial Work Boots",
    price: 89.99,
    originalPrice: null,
    category: "Footwear",
    rating: 4.6,
    reviews: 89,
    image: "/api/placeholder/300/300",
    inStock: true,
    featured: false
  },
  {
    id: 3,
    name: "High-Visibility Vest",
    price: 29.99,
    originalPrice: 39.99,
    category: "Safety Equipment",
    rating: 4.9,
    reviews: 156,
    image: "/api/placeholder/300/300",
    inStock: false,
    featured: true
  },
  {
    id: 4,
    name: "Tool Belt Professional",
    price: 79.99,
    originalPrice: null,
    category: "Tools",
    rating: 4.7,
    reviews: 67,
    image: "/api/placeholder/300/300",
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: "Work Gloves Set (5 pairs)",
    price: 34.99,
    originalPrice: 44.99,
    category: "Safety Equipment",
    rating: 4.5,
    reviews: 203,
    image: "/api/placeholder/300/300",
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "LED Work Light",
    price: 59.99,
    originalPrice: null,
    category: "Tools",
    rating: 4.8,
    reviews: 92,
    image: "/api/placeholder/300/300",
    inStock: true,
    featured: true
  }
];

const categories = ["All Categories", "Safety Equipment", "Footwear", "Tools", "Apparel"];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Shop Quality Products - Prime Trans Group</title>
      <meta name="description" content="Browse our comprehensive catalog of quality products from trusted suppliers. Shop safety equipment, tools, and work gear with secure online transactions." />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-background via-background to-muted py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6" data-testid="page-title-shop">
                Quality Products Store
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="page-description-shop">
                Browse our comprehensive catalog of quality products from trusted suppliers. 
                Shop with confidence and enjoy secure online transactions with reliable delivery.
              </p>
              <div className="mt-8">
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  Trusted by 1000+ Customers
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-product-search"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-product-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    data-testid="button-view-grid"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    data-testid="button-view-list"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground" data-testid="results-count">
              {filteredProducts.length} Products Found
            </h2>
            <Button variant="outline" size="sm" data-testid="button-filter-toggle">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No products found matching your search criteria.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
                data-testid="button-clear-search"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`} data-testid="products-grid">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300" data-testid={`product-card-${product.id}`}>
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-t-lg bg-muted h-48">
                      <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
                      </div>
                      {product.featured && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          Featured
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary" className="absolute top-2 right-2">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="p-4">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`product-name-${product.id}`}>
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-foreground" data-testid={`product-price-${product.id}`}>
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                        {product.originalPrice && (
                          <Badge variant="destructive" className="text-xs">
                            Save ${(product.originalPrice - product.price).toFixed(2)}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Add to Cart Button */}
                      <Button 
                        className="w-full" 
                        disabled={!product.inStock}
                        data-testid={`button-add-to-cart-${product.id}`}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Coming Soon Notice */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Full E-commerce Platform Coming Soon
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're working hard to bring you a complete online shopping experience with secure payments, 
              order tracking, and expanded product catalog. Stay tuned for updates!
            </p>
            <Button size="lg" data-testid="button-notify-launch">
              Notify Me When Available
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}