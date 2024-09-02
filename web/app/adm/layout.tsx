'use client';

import { Archive, HomeIcon, ScrollText } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Login from './components/login';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@nextui-org/button';

const navItems = [
  {
    title: 'Início',
    href: '/adm',
    icon: HomeIcon,
  },
  {
    title: 'Pedidos',
    href: '/adm/pedidos',
    icon: ScrollText,
  },
  {
    title: 'Estoque',
    href: '/adm/estoque',
    icon: Archive,
  },
];

export default function CantinaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated, logout } = useAuth();

  const pathname = usePathname();

  const isItemSelected = (href: string) => {
    return pathname === href;
  };

  if (!authenticated) return <Login />;

  return (
    <>
      <header
        className={`sticky top-0 w-full h-[80px] bg-red-800 px-4 z-20 flex justify-between items-center`}
      >
        <div className="max-w-[210px] flex items-center h-full">
          <Image
            src="/uem-full.svg"
            alt="Logo da UEM"
            width={150}
            height={40}
          />
        </div>

        <Button onClick={() => logout()}>Sair</Button>
      </header>
      <div className="flex">
        <div
          className={`sticky left-0 top-[80px] flex h-[calc(100vh-80px)] w-full max-w-[210px] flex-col bg-red-600 bg-clip-border shadow-xl shadow-blue-gray-900/5`}
        >
          <nav className="flex flex-col font-sans text-base font-normal text-white py-8">
            {navItems.map(({ title, icon: Icon, href }, index) => (
              <Link
                href={href}
                key={index}
                className={cn(
                  'flex gap-4 p-4 hover:bg-red-700',
                  isItemSelected(href) && 'bg-red-800',
                )}
              >
                <Icon />
                {title}
              </Link>
            ))}
          </nav>
        </div>
        <main className="w-full pt-8 px-6 overflow-x-hidden">{children}</main>
      </div>
    </>
  );
}
