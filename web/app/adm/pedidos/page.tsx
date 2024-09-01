'use client';

import PurchaseService from '@/service/purchase.service';
import { Purchase, PurchaseStatus } from '@/types/api';
import { cn } from '@/utils/cn';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  ScrollShadow,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckIcon, XIcon } from 'lucide-react';
import { CancelPurchaseModal } from './components/CancelPurchaseModal';
import { useState } from 'react';
import { formatCurrency } from '@/utils/format';

const cards = [
  {
    title: 'Aguardando',
    status: PurchaseStatus.PENDING,
    bg: 'bg-yellow-200',
  },
  {
    title: 'Preparando',
    status: PurchaseStatus.STARTED,
    bg: 'bg-purple-200',
  },
  {
    title: 'Pronto',
    status: PurchaseStatus.FINISHED,
    bg: 'bg-green-200',
  },
  {
    title: 'Recebido',
    status: PurchaseStatus.RECEIVED,
    bg: '',
  },
];

export default function Home() {
  const [cancelPurchaseId, setCancelPurchaseId] = useState<number>();

  const {
    data: purchases = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => PurchaseService.findAllByStore(),
    refetchInterval: 5000,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => PurchaseService.nextStatus(id, true),
    onSuccess: () => refetch(),
  });

  const loading = isPending || isLoading;

  const filterByStatus = (status: PurchaseStatus) => {
    return purchases.filter(purchase => purchase.status === status);
  };

  const canCancel = (purchase: Purchase) => {
    return purchase.status === PurchaseStatus.PENDING;
  };

  const canRenderNext = (purchase: Purchase) => {
    return [PurchaseStatus.PENDING, PurchaseStatus.STARTED].includes(
      purchase.status,
    );
  };

  return (
    <section className="flex items-center gap-10 max-w-full overflow-x-auto p-1">
      <CancelPurchaseModal
        id={cancelPurchaseId}
        setOpen={open => !open && setCancelPurchaseId(undefined)}
      />
      {cards.map((card, index) => (
        <Card
          className={cn(
            'flex-1 min-w-[400px] max-w-[400px] shadow-none border-1',
            card.bg,
          )}
        >
          <CardHeader className="sticky top-0 bg-background">
            {card.title}
          </CardHeader>
          <CardBody>
            <ScrollShadow
              className="h-[calc(100vh-200px)] gap-4 flex flex-col"
              hideScrollBar
            >
              {filterByStatus(card.status).map((pedido, index) => (
                <div
                  className="border bg-foreground-50 p-4 rounded-md space-y-2 flex flex-col"
                  key={index}
                >
                  <div className="space-y-1">
                    {pedido.products.map((prod, prodIndex) => (
                      <p className="font-semibold" key={prodIndex}>
                        {prod.quantity}x - {prod.productName}
                      </p>
                    ))}
                  </div>
                  <p>Cliente: {pedido.studentName}</p>
                  <p>Total: {formatCurrency(pedido.total)}</p>
                  <div className="self-end mt-4 flex items-center gap-2">
                    {canRenderNext(pedido) && (
                      <Button
                        size="sm"
                        isIconOnly
                        color="success"
                        isLoading={loading}
                        onClick={() => mutate(pedido.id)}
                      >
                        <CheckIcon />
                      </Button>
                    )}
                    {canCancel(pedido) && (
                      <Button
                        size="sm"
                        isIconOnly
                        color="danger"
                        isDisabled={loading}
                        onClick={() => setCancelPurchaseId(pedido.id)}
                      >
                        <XIcon />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </ScrollShadow>
          </CardBody>
        </Card>
      ))}
    </section>
  );
}
