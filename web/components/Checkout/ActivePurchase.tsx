import { useActivePurchase } from '@/hooks/useActivePurchase';
import PurchaseService from '@/service/purchase.service';
import { Purchase, PurchaseStatus } from '@/types/api';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/format';
import { Button, Card, CardBody, CardFooter, Link } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MapIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const statusColors = {
  [PurchaseStatus.PENDING]: ['bg-warning', 'text-warning'],
  [PurchaseStatus.CONFIRMED]: ['bg-blue-400', 'text-blue-400'],
  [PurchaseStatus.STARTED]: ['bg-purple-400', 'text-purple-400'],
  [PurchaseStatus.FINISHED]: ['bg-success', 'text-success'],
  [PurchaseStatus.RECEIVED]: ['bg-gray-400', 'text-gray-400'],
  [PurchaseStatus.REJECTED]: ['bg-danger', 'text-danger'],
};

const statusText = {
  [PurchaseStatus.PENDING]: 'Aguardando Confirmação',
  [PurchaseStatus.CONFIRMED]: 'Confirmado',
  [PurchaseStatus.STARTED]: 'Em preparação',
  [PurchaseStatus.FINISHED]: 'Pronto',
  [PurchaseStatus.RECEIVED]: 'Recebido',
  [PurchaseStatus.REJECTED]: 'Rejeitado',
};

export const ActivePurchase = ({ purchase }: { purchase: Purchase }) => {
  const router = useRouter();

  const colors = {
    text: statusColors[purchase.status][1],
    bg: statusColors[purchase.status][0],
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => PurchaseService.studentConfirmReceive(),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['purchases'],
      });
      router.push('/');
    },
  });

  return (
    <div className="relative min-h-full flex flex-col justify-between">
      <div>
        <p className="text-lg font-semibold mb-4">{purchase.storeName}</p>

        <Card shadow="sm">
          <CardBody className="items-start justify-between flex-row">
            <p>
              Seu pedido está <br />
              <span className={cn('font-semibold', colors.text)}>
                {statusText[purchase.status]}
              </span>
            </p>
            <span className="relative flex h-5 w-5">
              <span
                className={cn(
                  'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                  colors.bg,
                )}
              ></span>
              <span
                className={cn(
                  'relative inline-flex rounded-full h-5 w-5 bg-warning',
                  colors.bg,
                )}
              ></span>
            </span>
          </CardBody>

          {purchase.status === PurchaseStatus.REJECTED &&
            purchase.cancelCause && (
              <CardFooter>
                <p>Motivo: {purchase.cancelCause}</p>
              </CardFooter>
            )}
        </Card>

        <Card shadow="sm" className="mt-2">
          <CardBody className="items-start justify-between flex-row">
            <p>
              Seu código de retirada é:{' '}
              <span className={cn('font-semibold text-primary')}>1234</span>
            </p>
          </CardBody>
        </Card>
        <Link
          className="mt-2 flex items-center gap-2"
          isExternal
          href="www.google.com"
          color="foreground"
          underline="always"
        >
          Endereço da cantina <MapIcon />
        </Link>

        <div className="mt-6">
          <div className="flex items-center justify-between text-semibold mb-2">
            <p>Seu pedido</p>
            <p>{formatCurrency(purchase.total)}</p>
          </div>
          <div className="space-y-4">
            {purchase.products.map(prod => (
              <div className="p-1 bg-background rounded-lg flex gap-1 items-stretch justify-between min-h-[100px] max-h-[100px]">
                <div className="min-h-20 min-w-24 rounded-md bg-gray-600"></div>
                <div className="flex-1 text-end flex flex-col justify-between items-end pr-2 overflow-hidden">
                  <div className="flex flex-1 flex-col items-end">
                    <p className="text-md font-semibold">{prod.productName}</p>

                    <div className="-mt-1">
                      <p className="text-xs text-default-500 max-h-[30px] overflow-hidden">
                        {formatCurrency(prod.productPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {purchase.status === PurchaseStatus.FINISHED && (
        <Button
          className="sticky bottom-0"
          color="primary"
          isLoading={isPending}
          onClick={() => mutate()}
        >
          CONFIRMAR RETIRADA
        </Button>
      )}
    </div>
  );
};
