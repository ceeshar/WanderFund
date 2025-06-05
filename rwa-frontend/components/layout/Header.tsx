'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useWalletStore } from '@/stores/wallet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Hotel, 
  Wallet, 
  Network, 
  Settings, 
  LogOut,
  ExternalLink,
  Copy,
  ChevronDown,
  Globe
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { truncateAddress, getExplorerUrl } from '@/lib/stellar';
import { toast } from 'sonner';

export function Header() {
  const {
    isConnected,
    address,
    balance,
    network,
    isLoading,
    connect,
    disconnect,
    switchNetwork,
    checkConnection
  } = useWalletStore();

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully');
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info('Wallet disconnected');
  };

  const handleNetworkSwitch = async (newNetwork: 'testnet' | 'mainnet') => {
    if (newNetwork === network) return;
    
    try {
      await switchNetwork(newNetwork);
      toast.success(`Switched to ${newNetwork}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Failed to switch to ${newNetwork}`;
      
      // Check if this is a manual switch required error
      if (errorMessage.includes('Please switch to')) {
        toast.error(errorMessage, {
          duration: 6000, // Show longer for important instructions
        });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  const openInExplorer = () => {
    if (address) {
      window.open(getExplorerUrl(address, 'account', network), '_blank');
    }
  };

  const navigation = [
    { name: 'Experience Dashboard', href: '/dashboard' },
    { name: 'Travel Marketplace', href: '/marketplace' },
    { name: 'List Your Property', href: '/tokenize' },
    { name: 'Transfer Rights', href: '/transfer' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-8 flex-1">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Globe className="h-5 w-5 text-[#40E0D0]" />
            <span>TravelToken Hub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map(({ name, href }) => (
              <Link 
                key={name}
                href={href} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {network && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                  <Network className="h-4 w-4" />
                  {network.charAt(0).toUpperCase() + network.slice(1)}
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleNetworkSwitch('testnet')}>
                  Switch to Testnet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNetworkSwitch('mainnet')}>
                  Switch to Mainnet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {isConnected && address ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Hotel className="h-4 w-4 text-[#40E0D0]" />
                  {truncateAddress(address)}
                  <Badge 
                    variant="secondary" 
                    className="ml-2 hidden md:inline-flex"
                  >
                    {balance} XLM
                  </Badge>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={copyAddress}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Address
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openInExplorer}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View in Explorer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDisconnect}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              size="sm" 
              onClick={handleConnect} 
              disabled={isLoading}
              className="bg-[#40E0D0] hover:bg-[#40E0D0]/90"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}