"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageSquare, LayoutDashboard, ChevronRight, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function MainNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav
      className={cn(
        "transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16",
        "group hover:w-64"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col space-y-1">
        <Link
          href="/"
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/50 overflow-hidden whitespace-nowrap",
            pathname === "/" ? "bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-50" : "text-gray-600 dark:text-gray-400"
          )}
        >
          <MessageSquare className="w-5 h-5 min-w-[1.25rem]" />
          <span className={cn(
            "ml-3 transition-opacity duration-300",
            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}>
            {t('assistant')}
          </span>
        </Link>
        {isAuthenticated && (
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/50 overflow-hidden whitespace-nowrap",
              pathname === "/dashboard" ? "bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-50" : "text-gray-600 dark:text-gray-400"
            )}
          >
            <LayoutDashboard className="w-5 h-5 min-w-[1.25rem]" />
            <span className={cn(
              "ml-3 transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
              {t('dashboard')}
            </span>
          </Link>
        )}
        <Link
          href="/faq"
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/50 overflow-hidden whitespace-nowrap",
            pathname === "/faq" ? "bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-50" : "text-gray-600 dark:text-gray-400"
          )}
        >
          <HelpCircle className="w-5 h-5 min-w-[1.25rem]" />
          <span className={cn(
            "ml-3 transition-opacity duration-300",
            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}>
            FAQ
          </span>
        </Link>
      </div>
      <div className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2 transition-opacity duration-300",
        isExpanded ? "opacity-0" : "opacity-100 group-hover:opacity-0"
      )}>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </nav>
  );
}