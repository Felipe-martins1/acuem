'use client';

import { Modal, ModalContent, Spinner } from '@nextui-org/react';

export const Loader = ({ loading }: { loading: boolean }) => (
  <Modal backdrop={'blur'} isOpen={loading} closeButton={<></>}>
    <ModalContent className="bg-transparent shadow-none border-0">
      <Spinner size="lg" />
    </ModalContent>
  </Modal>
);
