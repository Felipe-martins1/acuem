import { Button } from '@nextui-org/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../../../components/drawer';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Key, useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircleIcon,
  CreditCardIcon,
  DollarSignIcon,
} from 'lucide-react';
import { Product } from '@/types/api';
import { formatCurrency } from '@/utils/format';
import { Divider, ScrollShadow } from '@nextui-org/react';

export const CheckoutDrawer = ({
  checkoutProducts,
  total,
  open,
  onOpenChange,
}: {
  checkoutProducts: Product[];
  total: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [step, setStep] = useState(0);
  const [meioPagamento, setMeioPagamento] = useState<Set<any> | any>(
    new Set([]),
  );

  const stepsTitle = [
    {
      title: 'Meio de pagamento',
    },
    {
      title: 'Finalizar',
      description: 'Tudo certo! agora é só confirmar seu pedido',
    },
    {
      title: 'Pedido finalizado!',
      description: 'Agora é só aguardar o pedido e aproveitar!',
    },
  ];

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        onOpenChange(false);
        setStep(0);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, onOpenChange]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} onClose={() => setStep(0)}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{stepsTitle[step].title}</DrawerTitle>
            <DrawerDescription>
              {stepsTitle[step].description}
            </DrawerDescription>
          </DrawerHeader>
          <div>
            {step === 0 ? (
              <Listbox
                aria-label="Meios de pagamento"
                selectionMode="single"
                selectedKeys={meioPagamento}
                onSelectionChange={setMeioPagamento}
                className="space-y-4"
              >
                <ListboxItem
                  key="Cartão de crédito"
                  startContent={<CreditCardIcon />}
                >
                  Cartão de crédito
                </ListboxItem>
                <ListboxItem
                  key="Cartão de debito"
                  startContent={<CreditCardIcon />}
                >
                  Cartão de debito
                </ListboxItem>
                <ListboxItem key="Pix" startContent={<DollarSignIcon />}>
                  Pix
                </ListboxItem>
                <ListboxItem key="Dinheiro" startContent={<DollarSignIcon />}>
                  Dinheiro
                </ListboxItem>
              </Listbox>
            ) : (
              <div className="px-5">
                {step === 1 ? (
                  <>
                    <ScrollShadow className="max-h-[200px]">
                      <ul>
                        {checkoutProducts.map(product => (
                          <li>
                            {product.quantity}x - {product.name}
                          </li>
                        ))}
                      </ul>
                    </ScrollShadow>
                    <Divider />
                    <div className="mt-4 flex gap-1">
                      <CreditCardIcon /> {meioPagamento}
                    </div>

                    <div className="font-semibold text-lg text-end mt-6">
                      {formatCurrency(total)}
                    </div>
                  </>
                ) : (
                  <div className="grid place-content-center min-h-[200px]">
                    <CheckCircleIcon className="text-success w-32 h-32" />
                  </div>
                )}
              </div>
            )}
          </div>
          {step < 2 && (
            <DrawerFooter>
              <div className="flex justify-between gap-4">
                <DrawerClose asChild>
                  <Button className="flex-1">Cancelar</Button>
                </DrawerClose>
                {!!meioPagamento.size && (
                  <Button
                    className="flex-1"
                    color="primary"
                    onClick={() => setStep(step + 1)}
                  >
                    {step === 0 ? 'Confirmar' : 'Finalizar'}
                  </Button>
                )}
              </div>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
