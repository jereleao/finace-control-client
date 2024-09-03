import React from 'react';
import { cn } from '@/lib/utils';
import { useUserLoaderData } from '@/routes/_app';
import { NavLink } from '@remix-run/react';
import { RemixNavLinkProps } from '@remix-run/react/dist/components';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ReaderIcon } from '@radix-ui/react-icons';

export function MainNav() {
  const { isAuthenticated } = useUserLoaderData();

  return (
    <div className="min-h-16 flex gap-4 items-center">
      <NavigationMenu>
        <NavigationMenuList className="flex justify-center">
          {isAuthenticated && (
            <NavigationMenuItem>
              <LinkItem
                to={'/categories'}
                className="h-[3.125rem] w-[3.125rem] p-1"
              >
                <ReaderIcon className="h-6 w-6" />
              </LinkItem>
            </NavigationMenuItem>
          )}
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
