import { HomeIcon } from '@radix-ui/react-icons';
import CustomLink from '@/components/custom-link';

import { Button } from '@/components/ui/button';

export default function HomeButton() {
  return (
    <CustomLink href="/">
      <Button variant="outline" size="icon" className="rounded-full">
        <HomeIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Home</span>
      </Button>
    </CustomLink>
  );
}
