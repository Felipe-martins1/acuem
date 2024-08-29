import CategoryService from '@/service/category.service';
import { Category } from '@/types/api';
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const CategoryForm = ({
  onClose,
  initial,
}: {
  onClose: () => void;
  initial?: Category;
}) => {
  const [nome, setNome] = useState(initial?.name || '');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      initial?.id
        ? CategoryService.update(initial?.id, {
            name: nome,
          })
        : CategoryService.create({
            name: nome,
          }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['categories'],
      });
      onClose();
    },
  });

  useEffect(() => {
    setNome(initial?.name || '');
  }, [initial]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        mutate();
      }}
    >
      <ModalHeader>{initial?.id ? 'Editar' : 'Criar'} Categoria</ModalHeader>
      <ModalBody>
        <Input
          placeholder="Nome"
          onChange={e => setNome(e.target.value || '')}
          value={nome}
          disabled={isPending}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button color="primary" type="submit" isLoading={isPending}>
          {initial?.id ? 'Editar' : 'Criar'}
        </Button>
      </ModalFooter>
    </form>
  );
};
