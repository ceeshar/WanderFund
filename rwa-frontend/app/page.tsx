'use client';

import { useEffect } from 'react';
import { useWalletStore } from '@/stores/wallet';
import { useContractStore } from '@/stores/contract';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Hotel, 
  Palmtree, 
  TrendingUp, 
  Users,
  ArrowRight,
  Globe,
  AlertCircle,
  Clock,
  Sunrise
} from 'lucide-react';
import { formatTokenAmount, formatCurrency, formatPercentage } from '@/lib/stellar';
import Link from 'next/link';

export default function Dashboard() {
  const { isConnected, address, checkConnection } = useWalletStore();
  const { 
    assetMetadata, 
    userBalance, 
    isWhitelisted, 
    compliance,
    isLoading,
    fetchContractData,
    fetchUserData 
  } = useContractStore();

  // Check wallet connection and fetch data on mount
  useEffect(() => {
    checkConnection();
    fetchContractData();
  }, [checkConnection, fetchContractData]);

  // Fetch user data when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      fetchUserData(address);
    }
  }, [isConnected, address, fetchUserData]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] space-y-8">
            <div className="text-center space-y-4 max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight">
                TravelToken Experiences Hub
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover and invest in unique travel experiences - from boutique hotels 
                to eco-tourism facilities, all powered by blockchain technology on Stellar.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <Card className="text-center">
                <CardHeader>
                  <Hotel className="h-12 w-12 mx-auto text-primary" />
                  <CardTitle className="text-lg">Premium Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Invest in boutique hotels and eco-tourism facilities while enjoying exclusive accommodation benefits
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Globe className="h-12 w-12 mx-auto text-[#40E0D0]" />
                  <CardTitle className="text-lg">Sustainable Tourism</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Support eco-friendly and sustainable tourism projects that benefit local communities
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Palmtree className="h-12 w-12 mx-auto text-[#D2691E]" />
                  <CardTitle className="text-lg">Unique Experiences</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access exclusive travel experiences and earn returns through tourism revenue
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome to TravelToken Hub</h1>
            <p className="text-lg text-muted-foreground">
              Your gateway to unique travel experiences and sustainable tourism investments
            </p>
          </div>

          {/* Portfolio Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Holdings</CardTitle>
                <Hotel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatTokenAmount(userBalance)} TRVL
                </div>
                <p className="text-xs text-muted-foreground">
                  ≈ {formatCurrency(
                    (parseFloat(formatTokenAmount(userBalance)) * 1000).toString()
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Travel Status</CardTitle>
                {isWhitelisted ? (
                  <Globe className="h-4 w-4 text-[#40E0D0]" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isWhitelisted ? 'Explorer' : 'Novice'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {compliance?.kyc_verified ? 'Verified Traveler' : 'Verification Required'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projected Returns</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground">
                  Tourism revenue + appreciation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Season</CardTitle>
                <Sunrise className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25 days</div>
                <p className="text-xs text-muted-foreground">
                  Peak season starts
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Current Asset */}
          {assetMetadata && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{assetMetadata.name}</CardTitle>
                    <CardDescription className="text-base">
                      {assetMetadata.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {assetMetadata.asset_type.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Property Value</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(formatTokenAmount(assetMetadata.valuation, 7))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Your Share</p>
                    <p className="text-2xl font-bold">
                      {((parseFloat(formatTokenAmount(userBalance)) / 2500) * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Stay Credits</p>
                    <p className="text-2xl font-bold">14 nights</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button asChild>
                    <Link href="/transfer">
                      Transfer Tokens
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/marketplace">
                      Explore Properties
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Experiences</CardTitle>
                <CardDescription>
                  Discover unique travel opportunities in our curated collection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Luxury Beach Resort</p>
                      <p className="text-sm text-muted-foreground">Maldives</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">15.2% APY</p>
                      <Badge variant="outline" className="text-xs">High Season</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Mountain Eco-Lodge</p>
                      <p className="text-sm text-muted-foreground">Swiss Alps</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">12.8% APY</p>
                      <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/marketplace">
                    View All Properties
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Travel Updates</CardTitle>
                <CardDescription>
                  Your latest bookings and investment activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-[#40E0D0] rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Welcome Explorer!</p>
                      <p className="text-xs text-muted-foreground">Your travel journey begins</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-[#D2691E] rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Stay Credits Added</p>
                      <p className="text-xs text-muted-foreground">14 nights available</p>
                    </div>
                    <p className="text-xs text-muted-foreground">2 min ago</p>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/marketplace">
                    Book Your First Stay
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
