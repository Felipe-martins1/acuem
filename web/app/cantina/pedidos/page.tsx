'use client';

import { cn } from '@/utils/cn';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  ScrollShadow,
} from '@nextui-org/react';
import { XIcon } from 'lucide-react';

const data = Array.from({ length: 10 }).map(() => ({
  products: [
    {
      productName: 'Salgado Frito',
      quantity: 2,
    },
    {
      productName: 'Cola Cola',
      quantity: 1,
    },
  ],
}));

const cards = [
  {
    title: 'Aguardando',
    status: 'PENDING',
  },
  {
    title: 'Preparando',
    status: 'STARTED',
  },
  {
    title: 'Pronto',
    status: 'FINISHED',
  },
  {
    title: 'Recebido',
    status: 'RECEIVED',
  },
];

export default function Home() {
  return (
    <section className="flex items-center gap-10 max-w-full overflow-x-auto p-1">
      {cards.map((card, index) => (
        <Card
          className={cn(
            'flex-1 min-w-[400px] max-w-[400px] shadow-none border-1',
            card.status === 'STARTED' && 'bg-yellow-200',
            card.status === 'FINISHED' && 'bg-green-200',
            card.status === 'RECEIVED' && 'bg-purple-200',
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
              {data.map((pedido, index) => (
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
                  <Button
                    size="sm"
                    isIconOnly
                    color="danger"
                    className="self-end mt-4"
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
            </ScrollShadow>
          </CardBody>
        </Card>
      ))}
    </section>
  );
}
