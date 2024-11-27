"use client";

import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from '@/lib/utils';

type SystemStatus = 'operational' | 'degraded' | 'outage';

interface SystemStatusInfo {
  status: SystemStatus;
  lastChecked: Date;
  services: {
    name: string;
    status: SystemStatus;
  }[];
}

export function SystemStatus() {
  const [status, setStatus] = useState<SystemStatusInfo>({
    status: 'operational',
    lastChecked: new Date(),
    services: [
      { name: 'Authentication', status: 'operational' },
      { name: 'Payments', status: 'operational' },
      { name: 'Database', status: 'operational' },
      { name: 'API', status: 'operational' }
    ]
  });

  useEffect(() => {
    const checkStatus = () => {
      // In a real application, this would make an API call to check system status
      setStatus(prev => ({
        ...prev,
        lastChecked: new Date()
      }));
    };

    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: SystemStatus) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'outage':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
          <Activity className="h-4 w-4" />
          <span className={cn(
            "absolute top-1 right-1 h-2 w-2 rounded-full",
            getStatusColor(status.status)
          )} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">System Status</h4>
            <span className="text-xs text-muted-foreground">
              Last checked: {status.lastChecked.toLocaleTimeString()}
            </span>
          </div>
          <div className="space-y-2">
            {status.services.map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <span className="text-sm">{service.name}</span>
                <span className={cn(
                  "h-2 w-2 rounded-full",
                  getStatusColor(service.status)
                )} />
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            All times are in your local timezone
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}