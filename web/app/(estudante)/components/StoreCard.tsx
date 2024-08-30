import { Cantina } from '@/types/api';
import { Button } from '@nextui-org/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const StoreCard = ({ store }: { store: Cantina }) => {
  const router = useRouter();

  const handleCantinaSelect = (id: number) => {
    router.push(`/cantina/${id}`);
  };

  return (
    <div
      className="p-1 bg-background rounded-lg flex gap-1 items-center justify-between"
      onClick={() => handleCantinaSelect(store.id)}
    >
      <div className="h-20 w-20 rounded-md bg-gray-600"></div>
      <div className="flex-1 self-start">
        <span className="text-md font-semibold">{store.name}</span>
        <div className="flex items-center text-sm gap-1">
          <span>Bloco D67</span>
          <MapPin size={16} />
        </div>
      </div>
      <Button
        isIconOnly
        className="bg-transparent text-gray-400"
        onClick={() => handleCantinaSelect(store.id)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};
