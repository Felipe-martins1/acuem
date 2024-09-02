import PurchaseService from '@/service/purchase.service';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const CancelPurchaseModal = ({
  id,
  setOpen,
}: {
  id?: number;
  setOpen: (open: boolean) => void;
}) => {
  const [reason, setReason] = useState('');
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () => PurchaseService.storeCancel(id!, reason),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['purchases'],
      });
      setOpen(false);
      setReason('');
    },
  });

  return (
    <Modal isDismissable={!isPending} isOpen={!!id} onOpenChange={setOpen}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>Deseja mesmo cancelar o pedido?</ModalHeader>
            <ModalBody>
              <Textarea
                value={reason}
                onValueChange={setReason}
                maxLength={255}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Não</Button>
              <Button
                color="danger"
                onClick={() => mutate()}
                isLoading={isPending}
              >
                Sim
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
