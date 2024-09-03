'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ReaderIcon } from '@radix-ui/react-icons';
import { NavLink, RemixNavLinkProps } from '@remix-run/react/dist/components';

export function MainNav() {
  return (
    <div className="min-h-16 flex gap-4 items-center">
      <NavigationMenu>
        <NavigationMenuList className="flex justify-center">
          <NavigationMenuItem>
            <LinkItem to={'/categories'} className="h-12 w-12">
              <ReaderIcon className="h-7 w-7" />
            </LinkItem>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & RemixNavLinkProps
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const LinkItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & RemixNavLinkProps
>(({ className, title, children, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <NavLink
        ref={ref}
        className={navigationMenuTriggerStyle({
          className,
        })}
        {...props}
      >
        {children}
      </NavLink>
    </NavigationMenuLink>
  );
});
LinkItem.displayName = 'LinkItem';
