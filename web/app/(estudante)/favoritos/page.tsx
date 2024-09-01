'use client';

import { Skeleton } from '@nextui-org/react';
import { StoreCard } from '../components/StoreCard';
import { useQuery } from '@tanstack/react-query';
import StoreService from '@/service/store.service';

export default function Home() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: () => StoreService.findAll(),
  });

  return (
    <>
      <div className="mt-6 space-y-2">
        {isLoading ? (
          <>
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
          </>
        ) : (
          <>
            {data.map((cantina, index) => (
              <StoreCard store={cantina} key={index} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
