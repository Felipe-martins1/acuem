import CategoryService from '@/service/category.service';
import { Category } from '@/types/api';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

export const DeleteCategory = ({
  category,
  isOpen,
  onOpenChange,
}: { category: Category } & Pick<ModalProps, 'isOpen' | 'onOpenChange'>) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => CategoryService.delete(category.id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['categories'],
      });
      onOpenChange?.(false);
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <form
              onSubmit={e => {
                e.preventDefault();
                mutate();
              }}
            >
              <ModalHeader>Deletar categoria</ModalHeader>
              <ModalBody>
                Tem certeza que deseja deletar a categoria:
                <br /> {category.id} - {category.name}?
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} disabled={isPending}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit" isLoading={isPending}>
                  Deletar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
