'use client';

import { useState } from 'react';
import { useWalletStore } from '@/stores/wallet';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Hotel, 
  FileText, 
  Shield, 
  Clock,
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertCircle,
  Globe,
  Users,
  Palmtree,
  Coins,
  Calculator,
  Info,
  Sunrise,
  DollarSign
} from 'lucide-react';
import { formatCurrency } from '@/lib/stellar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const ASSET_TYPES = [
  {
    id: 'boutique_hotel',
    name: 'Boutique Hotel',
    description: 'Unique and luxury hotel properties',
    icon: Hotel,
    minValue: 1000000,
    examples: ['Luxury resorts', 'Boutique hotels', 'Beach villas', 'Historic properties']
  },
  {
    id: 'eco_resort',
    name: 'Eco Resort',
    description: 'Sustainable and eco-friendly tourism facilities',
    icon: PalmTree,
    minValue: 800000,
    examples: ['Eco lodges', 'Treehouse resorts', 'Wilderness retreats', 'Mountain chalets']
  },
  {
    id: 'experience_venue',
    name: 'Experience Venue',
    description: 'Unique venues for cultural and tourism experiences',
    icon: Globe,
    minValue: 500000,
    examples: ['Wineries', 'Cultural centers', 'Adventure bases', 'Wellness retreats']
  }
];

const TOKENIZATION_STEPS = [
  {
    id: 1,
    title: 'Property Details',
    description: 'Provide information about your tourism property'
  },
  {
    id: 2,
    title: 'Experience Design',
    description: 'Define the unique experiences and amenities'
  },
  {
    id: 3,
    title: 'Legal Documentation',
    description: 'Upload required permits and certifications'
  },
  {
    id: 4,
    title: 'Token Structure',
    description: 'Configure token economics and stay benefits'
  },
  {
    id: 5,
    title: 'Review & Launch',
    description: 'Review all details and launch your property'
  }
];

export default function TokenizePage() {
  const { isConnected, address } = useWalletStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Property Details
    assetType: '',
    propertyName: '',
    location: '',
    description: '',
    totalValue: '',
    rooms: '',
    maxOccupancy: '',
    
    // Step 2: Experience Design
    amenities: [] as string[],
    experiences: [] as string[],
    seasonality: '',
    sustainabilityFeatures: [] as string[],
    
    // Step 3: Legal Documentation
    ownershipProof: null as File | null,
    permits: null as File | null,
    insuranceDoc: null as File | null,
    certifications: [] as File[],
    
    // Step 4: Token Structure
    totalTokens: '',
    pricePerToken: '',
    stayCredits: '',
    revenueShare: '',
    minHolding: '',
    
    // Step 5: Launch Settings
    launchDate: '',
    initialDistribution: '',
    vestingPeriod: '',
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOKENIZATION_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateTokenomics = () => {
    if (!formData.totalValue || !formData.totalTokens) return null;
    
    const totalVal = parseFloat(formData.totalValue);
    const supply = parseFloat(formData.totalTokens);
    const pricePerToken = totalVal / supply;
    
    return {
      pricePerToken: pricePerToken.toFixed(2),
      marketCap: totalVal,
      minInvestmentTokens: formData.minHolding ? Math.ceil(parseFloat(formData.minHolding) / pricePerToken) : 0
    };
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ASSET_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <Card 
                    key={type.id}
                    className={`cursor-pointer transition-all ${
                      formData.assetType === type.id ? 'border-primary' : ''
                    }`}
                    onClick={() => setFormData({...formData, assetType: type.id})}
                  >
                    <CardHeader>
                      <Icon className="h-8 w-8 mb-2 text-primary" />
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">Examples:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {type.examples.map((example) => (
                            <li key={example}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="propertyName">Property Name</Label>
                  <Input
                    id="propertyName"
                    placeholder="Enter the name of your property"
                    value={formData.propertyName}
                    onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property and its unique features"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rooms">Number of Rooms/Units</Label>
                    <Input
                      id="rooms"
                      type="number"
                      placeholder="e.g., 20"
                      value={formData.rooms}
                      onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxOccupancy">Maximum Occupancy</Label>
                    <Input
                      id="maxOccupancy"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.maxOccupancy}
                      onChange={(e) => setFormData({...formData, maxOccupancy: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="totalValue">Property Valuation (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="totalValue"
                      className="pl-9"
                      placeholder="0.00"
                      value={formData.totalValue}
                      onChange={(e) => setFormData({...formData, totalValue: e.target.value})}
                    />
                  </div>
                  {formData.assetType && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum value: {formatCurrency(ASSET_TYPES.find(t => t.id === formData.assetType)?.minValue.toString() || '0')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div>
                <Label>Property Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {[
                    'Swimming Pool', 'Spa', 'Restaurant', 'Room Service',
                    'Beach Access', 'Fitness Center', 'Business Center', 'Airport Transfer',
                    'Free WiFi', 'Parking', 'Pet Friendly', 'Conference Facilities'
                  ].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              amenities: [...formData.amenities, amenity]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              amenities: formData.amenities.filter(a => a !== amenity)
                            });
                          }
                        }}
                      />
                      <label htmlFor={amenity}>{amenity}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Unique Experiences</Label>
                <div className="grid gap-2 mt-2">
                  <Textarea
                    placeholder="List the unique experiences you offer (one per line)"
                    value={formData.experiences.join('\n')}
                    onChange={(e) => setFormData({
                      ...formData,
                      experiences: e.target.value.split('\n').filter(Boolean)
                    })}
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    Examples: Wine tasting, Cooking classes, Guided tours, Yoga sessions
                  </p>
                </div>
              </div>

              <div>
                <Label>Seasonality</Label>
                <select
                  className="w-full p-2 border rounded-md mt-1"
                  value={formData.seasonality}
                  onChange={(e) => setFormData({...formData, seasonality: e.target.value})}
                >
                  <option value="">Select season type</option>
                  <option value="year_round">Year-round destination</option>
                  <option value="summer">Summer season (May-Sep)</option>
                  <option value="winter">Winter season (Nov-Mar)</option>
                  <option value="shoulder">Shoulder seasons</option>
                </select>
              </div>

              <div>
                <Label>Sustainability Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {[
                    'Solar Power', 'Water Conservation', 'Waste Management',
                    'Local Sourcing', 'EV Charging', 'Green Building',
                    'Community Programs', 'Wildlife Protection'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        id={feature}
                        checked={formData.sustainabilityFeatures.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              sustainabilityFeatures: [...formData.sustainabilityFeatures, feature]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              sustainabilityFeatures: formData.sustainabilityFeatures.filter(f => f !== feature)
                            });
                          }
                        }}
                      />
                      <label htmlFor={feature}>{feature}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documentation</CardTitle>
                  <CardDescription>
                    Upload all necessary documents to verify your property
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label>Property Ownership Proof</Label>
                      <div className="mt-2">
                        <Button variant="outline" className="w-full" onClick={() => document.getElementById('ownershipDoc')?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Ownership Document
                        </Button>
                        <input
                          id="ownershipDoc"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setFormData({...formData, ownershipProof: e.target.files[0]});
                            }
                          }}
                        />
                        {formData.ownershipProof && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Uploaded: {formData.ownershipProof.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Tourism Permits & Licenses</Label>
                      <div className="mt-2">
                        <Button variant="outline" className="w-full" onClick={() => document.getElementById('permitsDocs')?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Permits
                        </Button>
                        <input
                          id="permitsDocs"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setFormData({...formData, permits: e.target.files[0]});
                            }
                          }}
                        />
                        {formData.permits && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Uploaded: {formData.permits.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Insurance Documentation</Label>
                      <div className="mt-2">
                        <Button variant="outline" className="w-full" onClick={() => document.getElementById('insuranceDoc')?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Insurance Documents
                        </Button>
                        <input
                          id="insuranceDoc"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setFormData({...formData, insuranceDoc: e.target.files[0]});
                            }
                          }}
                        />
                        {formData.insuranceDoc && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Uploaded: {formData.insuranceDoc.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Certifications</CardTitle>
                  <CardDescription>
                    Upload any sustainability or quality certifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={() => document.getElementById('certDocs')?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Certifications
                  </Button>
                  <input
                    id="certDocs"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setFormData({
                          ...formData,
                          certifications: Array.from(e.target.files)
                        });
                      }
                    }}
                  />
                  {formData.certifications.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.certifications.map((file, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          Uploaded: {file.name}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Economics</CardTitle>
                <CardDescription>
                  Configure how your property tokens will be structured
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalTokens">Total Number of Tokens</Label>
                    <Input
                      id="totalTokens"
                      type="number"
                      placeholder="e.g., 1,000,000"
                      value={formData.totalTokens}
                      onChange={(e) => setFormData({...formData, totalTokens: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 100,000 - 10,000,000 tokens
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="pricePerToken">Price per Token (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="pricePerToken"
                        className="pl-9"
                        placeholder="0.00"
                        value={formData.pricePerToken}
                        onChange={(e) => setFormData({...formData, pricePerToken: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stayCredits">Stay Credits (nights/year per 1000 tokens)</Label>
                    <Input
                      id="stayCredits"
                      type="number"
                      placeholder="e.g., 7"
                      value={formData.stayCredits}
                      onChange={(e) => setFormData({...formData, stayCredits: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="revenueShare">Revenue Share Percentage</Label>
                    <Input
                      id="revenueShare"
                      type="number"
                      placeholder="e.g., 70"
                      value={formData.revenueShare}
                      onChange={(e) => setFormData({...formData, revenueShare: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Percentage of revenue distributed to token holders
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="minHolding">Minimum Token Holding</Label>
                  <Input
                    id="minHolding"
                    type="number"
                    placeholder="e.g., 1000"
                    value={formData.minHolding}
                    onChange={(e) => setFormData({...formData, minHolding: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum tokens required to access stay benefits
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Launch Configuration</CardTitle>
                <CardDescription>
                  Set the parameters for your property token launch
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="launchDate">Launch Date</Label>
                    <Input
                      id="launchDate"
                      type="date"
                      value={formData.launchDate}
                      onChange={(e) => setFormData({...formData, launchDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="initialDistribution">Initial Distribution (%)</Label>
                    <Input
                      id="initialDistribution"
                      type="number"
                      placeholder="e.g., 60"
                      value={formData.initialDistribution}
                      onChange={(e) => setFormData({...formData, initialDistribution: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="vestingPeriod">Vesting Period (months)</Label>
                  <Input
                    id="vestingPeriod"
                    type="number"
                    placeholder="e.g., 12"
                    value={formData.vestingPeriod}
                    onChange={(e) => setFormData({...formData, vestingPeriod: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Period over which tokens are gradually released to investors
                  </p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Please review all details carefully. Once deployed, the token configuration cannot be changed.
                  </AlertDescription>
                </Alert>

                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-semibold">Summary</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-muted-foreground">Property Value:</p>
                    <p>{formatCurrency(formData.totalValue)}</p>
                    <p className="text-muted-foreground">Total Tokens:</p>
                    <p>{parseInt(formData.totalTokens).toLocaleString()}</p>
                    <p className="text-muted-foreground">Price per Token:</p>
                    <p>{formatCurrency(formData.pricePerToken)}</p>
                    <p className="text-muted-foreground">Stay Credits:</p>
                    <p>{formData.stayCredits} nights/1000 tokens</p>
                    <p className="text-muted-foreground">Revenue Share:</p>
                    <p>{formData.revenueShare}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to start tokenizing your property.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <p>Step {currentStep} of {TOKENIZATION_STEPS.length}</p>
              <p className="text-muted-foreground">
                {TOKENIZATION_STEPS[currentStep - 1].title}
              </p>
            </div>
            <Progress value={(currentStep / TOKENIZATION_STEPS.length) * 100} />
          </div>

          {/* Step Content */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {TOKENIZATION_STEPS[currentStep - 1].title}
            </h2>
            <p className="text-muted-foreground mb-6">
              {TOKENIZATION_STEPS[currentStep - 1].description}
            </p>

            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={() => {
                if (currentStep === TOKENIZATION_STEPS.length) {
                  // Handle form submission
                  console.log('Form submitted:', formData);
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              {currentStep === TOKENIZATION_STEPS.length ? (
                <>
                  Launch Property
                  <Sunrise className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}