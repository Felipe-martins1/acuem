'use client';

import CategoryService from '@/service/category.service';
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { EditIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import ProductService from '@/service/product.service';
import { CategorySelect } from './components/CategorySelect';
import { ProductEditableQuantity } from './components/ProductEditableQuantity';
import { Product } from '@/types/api';
import { ProductForm } from './components/ProductForm';
import { ProductActive } from './components/ProductActive';

export default function Home() {
  const [productFormStatus, setProductFormStatus] = useState<{
    open: boolean;
    productId: number | null;
  }>({
    open: false,
    productId: null,
  });
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => ProductService.findAll(categoryId),
  });

  const product =
    productFormStatus.productId &&
    products.find(p => p.id === productFormStatus.productId);

  return (
    <section className="">
      <Modal
        isOpen={productFormStatus.open}
        onOpenChange={() =>
          setProductFormStatus({
            open: false,
            productId: null,
          })
        }
      >
        <ModalContent>
          {onClose => (
            <ProductForm onClose={onClose} product={product || undefined} />
          )}
        </ModalContent>
      </Modal>

      <div className="flex justify-between">
        <CategorySelect
          categoryId={categoryId}
          onCategoryIdChange={setCategoryId}
          isLoading={isLoadingProducts}
        />
        <Button
          color="primary"
          onClick={() =>
            setProductFormStatus({
              open: true,
              productId: null,
            })
          }
        >
          Criar Produto
        </Button>
      </div>
      <Table aria-label="Example static collection table" className="mt-4">
        <TableHeader>
          <TableColumn>Código</TableColumn>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Qtd. Disp</TableColumn>
          <TableColumn>Valor</TableColumn>
          <TableColumn>Ativo</TableColumn>
          <TableColumn>Ações</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <ProductEditableQuantity product={product} />
              </TableCell>
              <TableCell>R$ {product.price}</TableCell>
              <TableCell>
                <ProductActive product={product} />
              </TableCell>
              <TableCell>
                <div>
                  <Tooltip
                    color="foreground"
                    content="Editar"
                    placement="top-start"
                  >
                    <span
                      className="text-lg cursor-pointer active:opacity-50"
                      onClick={() =>
                        setProductFormStatus({
                          open: true,
                          productId: product.id,
                        })
                      }
                    >
                      <EditIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
