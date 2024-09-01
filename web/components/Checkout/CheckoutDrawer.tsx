import { Button } from '@nextui-org/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../drawer';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { useState } from 'react';
import { CheckCircleIcon, CreditCardIcon, DollarSignIcon } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { Divider, ScrollShadow, Spinner } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PurchaseService from '@/service/purchase.service';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export const CheckoutDrawer = ({
  total,
  open,
  onOpenChange,
}: {
  total: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const { operations, checkoutProducts, storeId } = useCart();

  const [step, setStep] = useState(0);
  const [meioPagamento, setMeioPagamento] = useState<Set<any> | any>(
    new Set([]),
  );

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (storeId: number) =>
      PurchaseService.create({
        studentId: user.id,
        storeId,
        products: checkoutProducts.map(product => ({
          productId: product.id,
          productName: product.name,
          quantity: operations.get(product.id),
        })),
      }),
    onSuccess: async () => {
      setStep(2);
      await new Promise(resolve => setTimeout(resolve, 2000));
      await queryClient.fetchQuery({
        queryKey: ['purchases'],
      });
      onOpenChange(false);
      setStep(0);
    },
  });

  const handleNextStep = () => {
    if (!storeId) return;
    if (step === 1) return mutate(storeId);
    setStep(prev => prev + 1);
  };

  const stepsTitle = [
    {
      title: 'Meio de pagamento',
    },
    {
      title: 'Finalizar',
      description: 'Tudo certo! agora é só confirmar seu pedido',
    },
    {
      title: isPending ? 'Aguarde...' : 'Pedido finalizado!',
      description: isPending
        ? 'Estamos confirmando seu pedido'
        : 'Agora é só aguardar o pedido e aproveitar!',
    },
  ];

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
                {isPending ? (
                  <div className="grid place-content-center min-h-[200px]">
                    <Spinner className="w-32 h-32" />
                  </div>
                ) : (
                  <>
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
                  </>
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
                    onClick={handleNextStep}
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
