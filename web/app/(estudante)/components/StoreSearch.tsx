'use client';

import StoreService from '@/service/store.service';
import { Cantina } from '@/types/api';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

export const StoreSearch = () => {
  const [search, _] = useQueryState('s');
  const router = useRouter();

  const handleCantinaSelect = (id: number) => {
    router.push(`/cantina/${id}`);
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: () => StoreService.findAll(),
  });

  return (
    <>
      {search === null ? (
        <div className="h-24 w-full bg-gray-600 relative rounded-md overflow-hidden">
          <Image
            fill
            src="/home-banner.jpg"
            alt="Hamburguer"
            className="object-cover"
            priority
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
          defaultItems={data}
          isLoading={isLoading}
          onSelectionChange={key => key && handleCantinaSelect(Number(key))}
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
    </>
  );
};
