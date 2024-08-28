import { HomeIcon } from '@radix-ui/react-icons';
import CustomLink from '@/components/custom-link';
import UserButton from '@/components/user-button';

import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <CustomLink href="/">
          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full border-foreground border p-0"
          >
            <HomeIcon className="min-w-8" />
          </Button>
        </CustomLink>
        <UserButton />
      </div>
    </header>
  );
}
