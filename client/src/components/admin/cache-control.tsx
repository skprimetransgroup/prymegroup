import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Trash2, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { forceRefreshCache, clearAllCaches, getCacheStatus } from '@/utils/pwa';

interface CacheStatus {
  version: string;
  cacheSize: number;
}

export default function CacheControl() {
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>({ version: 'unknown', cacheSize: 0 });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    loadCacheStatus();
    
    // Check cache status every 30 seconds
    const interval = setInterval(loadCacheStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadCacheStatus = async () => {
    try {
      const status = await getCacheStatus();
      setCacheStatus(status);
    } catch (error) {
      console.error('Failed to load cache status:', error);
    }
  };

  const handleForceRefresh = async () => {
    setIsRefreshing(true);
    setMessage({ text: 'Refreshing cache...', type: 'info' });
    
    try {
      const success = await forceRefreshCache();
      if (success) {
        setMessage({ text: 'Cache refreshed successfully!', type: 'success' });
        setLastRefresh(new Date());
        await loadCacheStatus();
      } else {
        setMessage({ text: 'Failed to refresh cache. Please try again.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error refreshing cache. Please try again.', type: 'error' });
    } finally {
      setIsRefreshing(false);
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleClearCache = async () => {
    if (!confirm('Are you sure you want to clear all caches? This will remove all stored content and may slow down the initial page loads.')) {
      return;
    }
    
    setIsClearing(true);
    setMessage({ text: 'Clearing all caches...', type: 'info' });
    
    try {
      const success = await clearAllCaches();
      if (success) {
        setMessage({ text: 'All caches cleared successfully!', type: 'success' });
        setCacheStatus({ version: 'unknown', cacheSize: 0 });
        setLastRefresh(null);
      } else {
        setMessage({ text: 'Failed to clear caches. Please try again.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error clearing caches. Please try again.', type: 'error' });
    } finally {
      setIsClearing(false);
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const getStatusIcon = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5" />
            <span>Auto Cache Refresher</span>
          </CardTitle>
          <CardDescription>
            Manage website cache to ensure users get the latest content. The system automatically refreshes content in the background every 10 minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cache Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {cacheStatus.version}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Cache Version
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {cacheStatus.cacheSize}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Cached Items
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {lastRefresh ? lastRefresh.toLocaleTimeString() : 'Never'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last Manual Refresh
              </div>
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
              message.type === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
              'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
            }`}>
              {getStatusIcon(message.type)}
              <span>{message.text}</span>
            </div>
          )}

          <Separator />

          {/* Cache Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Cache Management</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleForceRefresh}
                disabled={isRefreshing}
                size="lg"
                className="h-16 flex-col space-y-1"
                data-testid="button-force-refresh-cache"
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Refreshing...' : 'Force Refresh Cache'}</span>
              </Button>

              <Button
                onClick={handleClearCache}
                disabled={isClearing}
                variant="destructive"
                size="lg"
                className="h-16 flex-col space-y-1"
                data-testid="button-clear-cache"
              >
                <Trash2 className="h-5 w-5" />
                <span>{isClearing ? 'Clearing...' : 'Clear All Caches'}</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Auto Cache Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Auto Cache Features</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Background Refresh</span>
                <Badge variant="outline" className="text-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Update Notifications</span>
                <Badge variant="outline" className="text-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Enabled
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Smart Caching Strategy</span>
                <Badge variant="outline" className="text-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Stale-While-Revalidate
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto Update Check</span>
                <Badge variant="outline" className="text-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Every 60 seconds
                </Badge>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
              How Auto Cache Refresh Works
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Automatically checks for updates every 60 seconds when users are active</li>
              <li>• Refreshes cached content in the background every 10 minutes</li>
              <li>• Shows update notifications when new content is available</li>
              <li>• Uses smart caching strategies: Network-first for API, Stale-while-revalidate for assets</li>
              <li>• Automatically cleans up old cache versions to prevent storage bloat</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}