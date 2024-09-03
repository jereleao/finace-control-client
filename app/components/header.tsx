import HomeButton from '@/components/home-button';
import UserButton from '@/components/user-button';
import ThemeButton from './theme-button';

export default function Header() {
  return (
    <header className="flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-2xl px-4 mx-auto sm:px-6">
        <HomeButton />
        <div className="flex gap-3">
          <UserButton />
          <ThemeButton />
        </div>
      </div>
    </header>
  );
}
