'use client';

import '@/styles/globals.css';

import {
  BookLock,
  HeartIcon,
  HomeIcon,
  MapPin,
  PartyPopper,
  SearchIcon,
  ShoppingCart,
  UserIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import useIsMobile from '@/hooks/useIsMobile';
import { Button } from '@nextui-org/button';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { useRouter } from 'next/navigation';
import { CartContextProvider, useCart } from '@/context/CartContext';

const navItems = [
  {
    href: '/',
    icon: HomeIcon,
  },
  {
    href: '/perfil',
    icon: UserIcon,
  },
  {
    href: '/carrinho',
    icon: ShoppingCart,
    isCart: true,
  },
  {
    href: '/favoritos',
    icon: HeartIcon,
  },
  {
    href: '/premios',
    icon: PartyPopper,
  },
];

export default function EstudanteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useQueryState('s');
  const [checkout] = useQueryState('checkout');
  const { authenticated } = useAuth();
  const isMobile = useIsMobile();

  const pathname = usePathname();
  const router = useRouter();

  const isItemSelected = (href: string, isCart: boolean) => {
    if (isCart && checkout) return true;
    return pathname === href;
  };

  const handleSearch = () => {
    if (isItemSelected('/', false)) {
      return setSearch('');
    }
    router.push('/?s=');
  };

  if (!isMobile) {
    return (
      <div className="w-screen h-screen bg-primary flex items-center justify-center flex-col gap-4">
        <BookLock size={100} color="white" />
        <h1 className="text-2xl text-white font-semibold max-w-lg text-center">
          Para acessar todas as funcionalidades, acesse de um dispositivo móvel.
        </h1>
      </div>
    );
  }

  if (!authenticated) return 'ESTUDANTE';

  return (
    <CartContextProvider>
      <div className="bg-slate-100 h-screen max-h-screen flex flex-col">
        <header className="sticky top-0 w-screen p-4 font-semibold flex justify-between items-center bg-slate-100 min-h-max">
          <div className="flex gap-1">
            <MapPin />
            UEM
          </div>
          {search === null && (
            <Button
              className="bg-transparent"
              isIconOnly
              onClick={() => {
                handleSearch();
              }}
            >
              <SearchIcon />
            </Button>
          )}
        </header>
        <main className="w-full overflow-y-auto px-4 overflow-x-hidden flex-1 no-scrollbar relative">
          {children}
        </main>
        <footer className="sticky bottom-0 mx-4 my-2 min-h-max bg-white p-2 rounded-md flex justify-evenly">
          {navItems.map(({ href, icon: Icon, isCart = false }, index) => (
            <Link href={href} key={index} className="relative">
              {isCart && (
                <div className="text-xs absolute -right-3 -top-1 bg-slate-300 rounded-md w-5 h-5 flex items-center justify-center">
                  <CartCount />
                </div>
              )}
              <Button isIconOnly className="bg-transparent">
                <Icon
                  className={cn(isItemSelected(href, isCart) && 'text-primary')}
                />
              </Button>
            </Link>
          ))}
        </footer>
      </div>
    </CartContextProvider>
  );
}

const CartCount = () => {
  const { size } = useCart();

  console.log(size);

  return size;
};
