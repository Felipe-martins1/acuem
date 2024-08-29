'use client';

import { Cantina } from '@/types/api';
import { Button, ButtonGroup } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { ArrowRight, MapIcon, MapPin, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

const cantinas: Cantina[] = [
  {
    cnpj: '123',
    id: 1,
    name: 'Cantina XYZ',
    universityId: 1,
  },
  {
    cnpj: '123',
    id: 1,
    name: 'Cantina XYZ',
    universityId: 1,
  },
  {
    cnpj: '123',
    id: 1,
    name: 'Cantina XYZ',
    universityId: 1,
  },
  {
    cnpj: '123',
    id: 1,
    name: 'Cantina XYZ',
    universityId: 1,
  },
  {
    cnpj: '123',
    id: 1,
    name: 'Cantina XYZ',
    universityId: 1,
  },
  {
    cnpj: '123',
    id: 1,
    name: 'Cantina XYZ',
    universityId: 1,
  },
  {
    cnpj: '123',
    id: 1,
    name: 'Cantina XYZ',
    universityId: 1,
  },
];

export default function Home() {
  const [search, setSearch] = useQueryState('s');
  const router = useRouter();

  const handleCantinaSelect = (id: number) => {
    router.push(`/cantina/${id}`);
  };

  return (
    <>
      {search === null ? (
        <div className="h-24 w-full bg-gray-600 relative rounded-md overflow-hidden">
          <Image
            fill
            src="/home-banner.jpg"
            alt="Hamburguer"
            className="object-cover"
          />
        </div>
      ) : (
        <Autocomplete
          label="Pesquise"
          variant="bordered"
          size="sm"
          inputProps={{
            classNames: {
              inputWrapper: 'bg-white',
            },
          }}
          defaultItems={cantinas}
          inputValue={search}
          onInputChange={setSearch}
        >
          {item => (
            <AutocompleteItem
              key={item.id}
              onClick={() => handleCantinaSelect(item.id)}
            >
              {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
      <div className="mt-6 space-y-2">
        {cantinas.map((cantina, index) => (
          <div
            key={index}
            className="p-1 bg-background rounded-lg flex gap-1 items-center justify-between"
            onClick={() => handleCantinaSelect(cantina.id)}
          >
            <div className="h-20 w-20 rounded-md bg-gray-600"></div>
            <div className="flex-1 self-start">
              <span className="text-md font-semibold">{cantina.name}</span>
              <div className="flex items-center text-sm gap-1">
                <span>Bloco D67</span>
                <MapPin size={16} />
              </div>
            </div>
            <Button
              isIconOnly
              className="bg-transparent text-gray-400"
              onClick={() => handleCantinaSelect(cantina.id)}
            >
              <ArrowRight />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
