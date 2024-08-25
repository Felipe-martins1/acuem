'use client';

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@nextui-org/react';
import { EditIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export const animals = [
  {
    label: 'Cat',
    value: 'cat',
    description: 'The second most popular pet in the world',
  },
  {
    label: 'Dog',
    value: 'dog',
    description: 'The most popular pet in the world',
  },
  {
    label: 'Elephant',
    value: 'elephant',
    description: 'The largest land animal',
  },
  { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
  { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
  {
    label: 'Giraffe',
    value: 'giraffe',
    description: 'The tallest land animal',
  },
];
export default function Home() {
  const [isOpenCatModal, setIsOpenCatModal] = useState(false);

  return (
    <section className="">
      <Modal isOpen={isOpenCatModal} onOpenChange={setIsOpenCatModal}>
        <ModalContent>
          {onClose => (
            <form onSubmit={e => e.preventDefault()}>
              <ModalHeader>Criar Categoria</ModalHeader>
              <ModalBody>
                <Input placeholder="Nome" />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Cancelar</Button>
                <Button color="primary" type="submit">
                  Criar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Autocomplete
            label="Selecione uma Categoria"
            className="max-w-xs"
            size="sm"
            listboxProps={{
              emptyContent: (
                <>
                  <Button className="w-full">Criar Categoria: XYZ</Button>
                </>
              ),
            }}
          >
            {animals.map(animal => (
              <AutocompleteItem key={animal.value} value={animal.value}>
                {animal.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Button
            size="lg"
            color="primary"
            onClick={() => setIsOpenCatModal(true)}
          >
            Criar Categoria
          </Button>
        </div>
        <Button size="lg" color="primary">
          Criar Produto
        </Button>
      </div>
      <Table aria-label="Example static collection table" className="mt-4">
        <TableHeader>
          <TableColumn>Código</TableColumn>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Qtd. Disp</TableColumn>
          <TableColumn>Valor</TableColumn>
          <TableColumn>Qtd. Vendida</TableColumn>
          <TableColumn>Ações</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>1</TableCell>
            <TableCell>Batata Frita</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button size="sm" isIconOnly variant="bordered">
                  <MinusIcon />
                </Button>
                1
                <Button size="sm" isIconOnly variant="bordered">
                  <PlusIcon />
                </Button>
              </div>
            </TableCell>
            <TableCell>R$ 100</TableCell>
            <TableCell>200</TableCell>
            <TableCell>
              <Tooltip
                color="foreground"
                content="Editar"
                placement="top-start"
              >
                <span className="text-lg cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
