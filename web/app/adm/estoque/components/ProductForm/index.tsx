import { Product } from '@/types/api';
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { CategorySelect } from '../CategorySelect';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ProductService from '@/service/product.service';

type FormState = Partial<Omit<Product, 'active'>>;

const validateForm = (
  data: FormState,
): Record<keyof FormState, string | undefined> => {
  const erros: Record<keyof FormState, string | undefined> = {
    categoryId: undefined,
    description: undefined,
    id: undefined,
    name: undefined,
    price: undefined,
    quantity: undefined,
  };
  if (!data.categoryId) {
    erros.categoryId = 'Categoria é obrigatória';
  }

  if (!data.description || data.description.trim().length < 10) {
    erros.description = 'Descrição deve ter no mínimo 10 caracteres';
  }

  if (!data.name?.trim()) {
    erros.name = 'Nome é obrigatório';
  }

  if (!data.price || Number(data.price) <= 0) {
    erros.price = 'Preço deve ser um número positivo';
  }

  if (
    !data.quantity ||
    !Number.isInteger(Number(data.quantity)) ||
    Number(data.quantity) < 0
  ) {
    erros.quantity = 'Quantidade deve ser um número inteiro não negativo';
  }

  return erros;
};

const buildDefaultValues = (product?: Product) => ({
  categoryId: product?.categoryId,
  description: product?.description,
  name: product?.name,
  price: product?.price,
  quantity: product?.quantity,
});

export const ProductForm = ({
  onClose,
  product,
}: {
  onClose: () => void;
  product?: Product;
}) => {
  const [form, setForm] = useState<FormState>(buildDefaultValues(product));
  const errors = useMemo(() => validateForm(form), [form]);

  const isValidForm = (data: FormState): data is Omit<Product, 'active'> => {
    return !Object.values(errors).some(v => !!v);
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (isValidForm(form)) {
        const formWithActive = {
          ...form,
          active: product ? product.active : true,
        };

        return product?.id
          ? ProductService.update(product.id, formWithActive)
          : ProductService.create(formWithActive);
      } else {
        throw new Error('Invalid Form');
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });

      onClose();
    },
  });

  const setFieldValue = (name: keyof FormState, value: unknown) =>
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

  useEffect(() => {
    setForm(buildDefaultValues(product));
  }, [product]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!isValidForm(form)) return;
        mutate();
      }}
    >
      <ModalHeader>{product ? 'Editar Produto' : 'Criar Produto'}</ModalHeader>
      <ModalBody>
        <CategorySelect
          categoryId={form.categoryId}
          onCategoryIdChange={id => setFieldValue('categoryId', id)}
          errorMessage={errors.categoryId}
        />
        <Input
          label="Nome"
          value={form.name}
          onValueChange={value => setFieldValue('name', value)}
          errorMessage={errors.name}
          isInvalid={!!errors.name}
        />
        <Textarea
          label="Descrição"
          value={form.description}
          onValueChange={value => setFieldValue('description', value)}
          errorMessage={errors.description}
          isInvalid={!!errors.description}
        />

        <Input
          label="Qtd. Disp"
          type="number"
          value={form.quantity?.toString()}
          onValueChange={value => setFieldValue('quantity', value)}
          errorMessage={errors.quantity}
          isInvalid={!!errors.quantity}
        />
        <Input
          label="Valor"
          type="number"
          value={form.price?.toString()}
          onValueChange={value => setFieldValue('price', value)}
          errorMessage={errors.price}
          isInvalid={!!errors.price}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} isDisabled={isPending}>
          Cancelar
        </Button>
        <Button type="submit" color="primary" isLoading={isPending}>
          {product ? 'Salvar' : 'Criar'}
        </Button>
      </ModalFooter>
    </form>
  );
};
