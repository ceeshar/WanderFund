'use client';

import { useState, useEffect } from 'react';
import { useWalletStore } from '@/stores/wallet';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Hotel, 
  MapPin, 
  TrendingUp, 
  Users,
  Filter,
  Search,
  Star,
  Globe,
  ArrowRight,
  PalmTree,
  Shield,
  Sunrise,
  DollarSign
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/stellar';
import Link from 'next/link';

// Mock marketplace data
const marketplaceAssets = [
  {
    id: '1',
    name: 'Beachfront Resort Maldives',
    location: 'Malé, Maldives',
    type: 'boutique_hotel',
    description: 'Luxury overwater villas with exceptional beach access and diving experiences',
    totalValue: '5000000',
    availableTokens: '2000000',
    pricePerToken: '2.50',
    projectedYield: '15.2',
    riskLevel: 'low' as const,
    status: 'live' as const,
    images: ['/api/placeholder/400/300'],
    launchDate: Date.now() - 86400000,
    investors: 68,
    contractId: 'CBQAAC4EHNMMHEI2W3QU6UQ5N4KSVYRLVTB5M2XMARCNS4CNLWMX3VQ6',
    amenities: ['Private Beach', 'Spa', 'Water Sports', 'Fine Dining'],
    stayCredits: 14
  },
  {
    id: '2',
    name: 'Alpine Eco-Lodge',
    location: 'Zermatt, Switzerland',
    type: 'eco_resort',
    description: 'Sustainable mountain retreat with panoramic views of the Matterhorn',
    totalValue: '3500000',
    availableTokens: '1500000',
    pricePerToken: '2.33',
    projectedYield: '12.8',
    riskLevel: 'medium' as const,
    status: 'upcoming' as const,
    images: ['/api/placeholder/400/300'],
    launchDate: Date.now() + 2592000000, // 30 days from now
    investors: 0,
    contractId: null,
    amenities: ['Ski Access', 'Wellness Center', 'Organic Restaurant', 'Nature Trails'],
    stayCredits: 10
  },
  {
    id: '3',
    name: 'Tuscany Wine Estate',
    location: 'Florence, Italy',
    type: 'experience_venue',
    description: 'Historic vineyard and villa offering wine tasting and culinary experiences',
    totalValue: '4200000',
    availableTokens: '1800000',
    pricePerToken: '2.33',
    projectedYield: '13.5',
    riskLevel: 'low' as const,
    status: 'upcoming' as const,
    images: ['/api/placeholder/400/300'],
    launchDate: Date.now() + 5184000000, // 60 days from now
    investors: 0,
    contractId: null,
    amenities: ['Vineyard Tours', 'Cooking Classes', 'Events Venue', 'Wine Cellar'],
    stayCredits: 7
  },
  {
    id: '4',
    name: 'Rainforest Treehouse Resort',
    location: 'Ubud, Bali',
    type: 'eco_resort',
    description: 'Sustainable treehouse villas immersed in tropical rainforest',
    totalValue: '2800000',
    availableTokens: '1200000',
    pricePerToken: '2.33',
    projectedYield: '14.2',
    riskLevel: 'medium' as const,
    status: 'upcoming' as const,
    images: ['/api/placeholder/400/300'],
    launchDate: Date.now() + 7776000000, // 90 days from now
    investors: 0,
    contractId: null,
    amenities: ['Yoga Studio', 'Jungle Treks', 'Infinity Pool', 'Cultural Tours'],
    stayCredits: 12
  }
];

const filters = {
  asset_type: [
    { value: 'boutique_hotel', label: 'Boutique Hotels' },
    { value: 'eco_resort', label: 'Eco Resorts' },
    { value: 'experience_venue', label: 'Experience Venues' }
  ],
  location: [
    { value: 'asia_pacific', label: 'Asia Pacific' },
    { value: 'europe', label: 'Europe' },
    { value: 'americas', label: 'Americas' }
  ],
  experience: [
    { value: 'beach', label: 'Beach & Islands' },
    { value: 'mountain', label: 'Mountain & Skiing' },
    { value: 'cultural', label: 'Cultural & Heritage' },
    { value: 'wellness', label: 'Wellness & Spa' }
  ]
};

export default function MarketplacePage() {
  const [selectedFilters, setSelectedFilters] = useState({
    asset_type: [],
    location: [],
    experience: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { isConnected } = useWalletStore();

  const filteredAssets = marketplaceAssets.filter(asset => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        asset.name.toLowerCase().includes(query) ||
        asset.location.toLowerCase().includes(query) ||
        asset.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Travel Marketplace</h1>
            <p className="text-xl text-muted-foreground">
              Discover tokenized travel experiences and start building your portfolio
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Hotel className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">15+</div>
                    <p className="text-xs text-muted-foreground">
                      Premium Properties
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#40E0D0]/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Globe className="h-8 w-8 text-[#40E0D0]" />
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      Countries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#D2691E]/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <PalmTree className="h-8 w-8 text-[#D2691E]" />
                  <div>
                    <div className="text-2xl font-bold">25+</div>
                    <p className="text-xs text-muted-foreground">
                      Unique Experiences
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">1.2k+</div>
                    <p className="text-xs text-muted-foreground">
                      Active Travelers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search experiences by name or location..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Properties
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Asset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <Card key={asset.id}>
                {/* Card Header with Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
                  <img 
                    src={asset.images[0]}
                    alt={asset.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="font-semibold text-xl text-white">{asset.name}</h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm mt-1">
                      <MapPin className="h-4 w-4" />
                      {asset.location}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  {/* Property Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Price / Token</p>
                      <p className="font-semibold">
                        {formatCurrency(asset.pricePerToken)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Stay Credits</p>
                      <p className="font-semibold">{asset.stayCredits} nights/year</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Projected Yield</p>
                      <p className="font-semibold text-green-600">
                        {formatPercentage(asset.projectedYield)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Investors</p>
                      <p className="font-semibold">{asset.investors}</p>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <p className="text-sm font-medium mb-2">Featured Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {asset.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="rounded-full">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      {asset.status === 'live' ? (
                        <Badge variant="default" className="bg-green-500">
                          Available Now
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          Coming {new Date(asset.launchDate).toLocaleDateString()}
                        </Badge>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {(parseInt(asset.availableTokens) / parseInt(asset.totalValue) * 100).toFixed(1)}% Available
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-secondary h-2 rounded-full mb-4">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ 
                          width: `${asset.status === 'live' ? Math.random() * 40 + 20 : 0}%`
                        }}
                      />
                    </div>

                    {asset.status === 'live' ? (
                      <Button className="w-full" asChild>
                        <Link href={`/tokenize?contract=${asset.contractId}`}>
                          Start Investing
                        </Link>
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* List Your Property CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">List Your Property</h3>
                  <p className="text-muted-foreground">
                    Turn your property into a tokenized travel experience
                  </p>
                </div>
                <Button asChild>
                  <Link href="/tokenize">
                    <Hotel className="h-4 w-4 mr-2" />
                    Tokenize Property
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}