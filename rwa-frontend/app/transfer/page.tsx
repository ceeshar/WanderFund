'use client';

import { useState, useEffect } from 'react';
import { useWalletStore } from '@/stores/wallet';
import { useContractStore } from '@/stores/contract';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Info,
  Wallet,
  Hotel,
  Users,
  Globe
} from 'lucide-react';
import { formatTokenAmount, isValidStellarAddress, toContractAmount, estimateNetworkFee } from '@/lib/stellar';
import { toast } from 'sonner';
import Link from 'next/link';

export default function TransferPage() {
  const { isConnected, address, connect } = useWalletStore();
  const { 
    userBalance, 
    isWhitelisted, 
    compliance,
    transfer,
    isLoading,
    fetchUserData,
    fetchContractData
  } = useContractStore();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isValidRecipient, setIsValidRecipient] = useState(false);
  const [recipientCompliance, setRecipientCompliance] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load data on mount and when wallet connects
  useEffect(() => {
    fetchContractData();
    if (isConnected && address) {
      fetchUserData(address);
    }
  }, [isConnected, address, fetchContractData, fetchUserData]);

  // Validate recipient address
  useEffect(() => {
    if (recipient) {
      const valid = isValidStellarAddress(recipient);
      setIsValidRecipient(valid);
      
      if (valid) {
        // In a real app, this would check recipient compliance
        setRecipientCompliance({
          isWhitelisted: true,
          kyc_verified: true,
          jurisdiction: 'US'
        });
      } else {
        setRecipientCompliance(null);
      }
    } else {
      setIsValidRecipient(false);
      setRecipientCompliance(null);
    }
  }, [recipient]);

  const handleMaxAmount = () => {
    setAmount(formatTokenAmount(userBalance));
  };

  const canTransfer = () => {
    if (!isConnected || !address) return false;
    if (!isWhitelisted) return false;
    if (!isValidRecipient) return false;
    if (!amount || parseFloat(amount) <= 0) return false;
    if (parseFloat(amount) > parseFloat(formatTokenAmount(userBalance))) return false;
    return true;
  };

  const handleTransfer = async () => {
    if (!canTransfer() || !address) return;

    try {
      const contractAmount = toContractAmount(amount);
      const success = await transfer(address, recipient, contractAmount);
      
      if (success) {
        toast.success('Transfer completed successfully!');
        setAmount('');
        setRecipient('');
        setShowConfirmation(false);
      } else {
        toast.error('Transfer failed. Please try again.');
      }
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error('Transfer failed. Please check the details and try again.');
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] space-y-6">
            <Card className="w-full max-w-md text-center">
              <CardHeader>
                <Wallet className="h-16 w-16 mx-auto text-muted-foreground" />
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>
                  You need to connect your Freighter wallet to transfer RWA tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={connect} className="w-full">
                  Connect Freighter Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Transfer Travel Rights</h1>
            <p className="text-lg text-muted-foreground">
              Transfer your property tokens and associated stay benefits
            </p>
          </div>

          {!isConnected ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Globe className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
                    <p className="text-sm text-muted-foreground">
                      Please connect your wallet to manage your travel tokens
                    </p>
                  </div>
                  <Button onClick={connect} disabled={isLoading}>
                    <Wallet className="h-4 w-4 mr-2" />
                    {isLoading ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Balance Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Travel Portfolio</CardTitle>
                  <CardDescription>Current holdings and benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Token Balance</p>
                      <p className="text-2xl font-bold">
                        {formatTokenAmount(userBalance)} TRVL
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Stay Credits</p>
                      <p className="text-2xl font-bold">
                        {Math.floor(parseFloat(formatTokenAmount(userBalance)) / 1000) * 7} nights
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex items-center gap-2">
                        {isWhitelisted ? (
                          <Badge className="bg-[#40E0D0]">Verified Explorer</Badge>
                        ) : (
                          <Badge variant="secondary">Pending Verification</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transfer Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Transfer Details</CardTitle>
                  <CardDescription>
                    Enter the recipient's address and amount to transfer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input
                      id="recipient"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="G..."
                    />
                    {recipient && !isValidRecipient && (
                      <p className="text-sm text-red-500">
                        Please enter a valid Stellar address
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (TRVL Tokens)</Label>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      type="number"
                    />
                    {amount && (
                      <p className="text-sm text-muted-foreground">
                        ≈ {Math.floor(parseFloat(amount) / 1000) * 7} stay nights
                      </p>
                    )}
                  </div>

                  <Alert className="mt-4">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Stay credits are tied to token ownership. Transferring tokens will also transfer the associated stay benefits.
                    </AlertDescription>
                  </Alert>

                  <div className="pt-4">
                    <Button 
                      className="w-full"
                      onClick={() => setShowConfirmation(true)}
                      disabled={
                        !isValidRecipient || 
                        !amount || 
                        parseFloat(amount) <= 0 || 
                        parseFloat(amount) > parseFloat(formatTokenAmount(userBalance))
                      }
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Review Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Hotel className="h-8 w-8 text-[#40E0D0] mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">About Token Transfers</h3>
                      <p className="text-sm text-muted-foreground">
                        TRVL tokens represent ownership rights in our curated properties. 
                        Each token holder receives stay credits proportional to their holdings, 
                        which can be used to book stays at any of our properties.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}