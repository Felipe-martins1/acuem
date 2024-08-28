'use client';

import CategoryService from '@/service/category.service';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
  Modal,
  ModalContent,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { EditIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { DeleteCategory } from './DeleteCategory';
import { CategoryForm } from './CategoryForm';

type Props = {
  categoryId?: number;
  onCategoryIdChange: (categoryId?: number) => void;
  isLoading?: boolean;
  errorMessage?: string;
};

export const CategorySelect = ({
  categoryId,
  onCategoryIdChange,
  isLoading: loading,
  errorMessage,
}: Props) => {
  const [isOpenCatModal, setIsOpenCatModal] = useState({
    open: false,
    edit: false,
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.findAll(),
  });

  const selectedCat = data.find(cat => cat.id == categoryId);

  return (
    <>
      <Modal
        isOpen={isOpenCatModal.open}
        onOpenChange={open => {
          setIsOpenCatModal(prev => ({
            open: open,
            edit: prev.edit,
          }));
        }}
      >
        <ModalContent>
          {onClose => (
            <CategoryForm
              onClose={onClose}
              initial={isOpenCatModal.edit ? selectedCat : undefined}
            />
          )}
        </ModalContent>
      </Modal>

      {selectedCat && (
        <DeleteCategory
          category={selectedCat}
          isOpen={isOpenDeleteModal}
          onOpenChange={setIsOpenDeleteModal}
        />
      )}

      <div>
        <div className="flex gap-4">
          <ButtonGroup>
            <Autocomplete
              label="Selecione uma Categoria"
              size="sm"
              isLoading={isLoading || loading}
              selectedKey={categoryId?.toString()}
              onSelectionChange={key => onCategoryIdChange(key as number)}
              listboxProps={{
                emptyContent: 'Nenhuma categoria encontrada',
              }}
              inputProps={{
                classNames: {
                  inputWrapper: 'rounded-r-none',
                },
              }}
              defaultItems={data}
              isInvalid={!!errorMessage}
            >
              {item => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>

            {selectedCat && (
              <>
                <Button
                  size="lg"
                  isIconOnly
                  onClick={() => setIsOpenDeleteModal(true)}
                >
                  <Trash2Icon className="text-danger" />
                </Button>
                <Button
                  size="lg"
                  isIconOnly
                  onClick={() =>
                    setIsOpenCatModal({
                      open: true,
                      edit: true,
                    })
                  }
                >
                  <EditIcon />
                </Button>
              </>
            )}
            <Button
              size="lg"
              isIconOnly
              onClick={() =>
                setIsOpenCatModal({
                  open: true,
                  edit: false,
                })
              }
            >
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </div>
        {errorMessage && (
          <div className="flex p-1 relative flex-col gap-1.5">
            <div data-slot="error-message" className="text-tiny text-danger">
              {errorMessage}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
