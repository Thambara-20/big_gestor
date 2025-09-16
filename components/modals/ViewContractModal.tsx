import React from 'react';
import { Contract } from '../../types';
import { useAppData } from '../../hooks/useAppData';
import Modal from '../Modal';

interface ViewContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: Contract;
}

const ViewContractModal: React.FC<ViewContractModalProps> = ({ isOpen, onClose, contract }) => {
  const { clients } = useAppData();
  const client = clients.find(c => c.id === contract.clientId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={contract.title} size="lg">
      <div className="space-y-4 max-h-[70vh] flex flex-col">
        <div className="flex-shrink-0">
            <p className="text-sm font-medium text-text-secondary">Cliente</p>
            <p className="font-semibold text-text-primary">{client?.name || 'Desconhecido'}</p>
        </div>
        <div className="flex-grow overflow-y-auto border border-border-color rounded-md p-3 bg-subtle-bg">
          <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans">
            {contract.content || 'Nenhum conteúdo no contrato.'}
          </pre>
        </div>
        <div className="flex justify-end pt-2">
            <button onClick={onClose} className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg shadow transition-colors">
                Fechar
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewContractModal;