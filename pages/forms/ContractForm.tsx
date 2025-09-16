import React, { useState, useEffect } from 'react';
import { useAppData } from '../../hooks/useAppData';
import { Contract, Client } from '../../types';
import toast from 'react-hot-toast';

interface ContractFormProps {
  onSuccess: () => void;
  contractToEdit?: Contract;
}

const ContractForm: React.FC<ContractFormProps> = ({ onSuccess, contractToEdit }) => {
  const { clients, addContract, updateContract } = useAppData();
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (contractToEdit) {
      setTitle(contractToEdit.title);
      setClientId(contractToEdit.clientId);
      setContent(contractToEdit.content);
    } else {
      setTitle('');
      setClientId(clients.length > 0 ? clients[0].id : '');
      setContent('');
    }
  }, [contractToEdit, clients]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !clientId) {
      toast.error('Título e Cliente são obrigatórios.');
      return;
    }

    const contractData = {
      title,
      clientId,
      content,
    };

    if (contractToEdit) {
      updateContract({ ...contractToEdit, ...contractData });
      toast.success('Contrato atualizado com sucesso!');
    } else {
      addContract(contractData);
      toast.success('Contrato adicionado com sucesso!');
    }
    onSuccess();
  };
  
  const commonInputClass = "w-full p-2 border border-border-color rounded-md focus:ring-2 focus:ring-accent focus:border-accent text-text-primary outline-none transition-shadow bg-card-bg";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
      <div>
        <label htmlFor="contractTitle" className="block text-sm font-medium text-text-secondary mb-1">Título do Contrato <span className="text-red-500">*</span></label>
        <input type="text" id="contractTitle" value={title} onChange={(e) => setTitle(e.target.value)} className={commonInputClass} required />
      </div>

      <div>
        <label htmlFor="client" className="block text-sm font-medium text-text-secondary mb-1">Cliente Associado <span className="text-red-500">*</span></label>
        <select id="client" value={clientId} onChange={(e) => setClientId(e.target.value)} className={commonInputClass} required>
          <option value="" disabled>Selecione um cliente</option>
          {clients.map((client: Client) => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-text-secondary mb-1">Corpo do Contrato</label>
        <textarea 
          id="content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          rows={10} 
          className={commonInputClass} 
          placeholder="Cole ou digite o conteúdo do contrato aqui..."
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-border-color sticky bottom-0 bg-card-bg py-2">
        <button type="submit" className="bg-accent text-white px-6 py-2 rounded-lg shadow hover:brightness-90 transition-all">
          {contractToEdit ? 'Salvar Alterações' : 'Salvar Contrato'}
        </button>
      </div>
    </form>
  );
};

export default ContractForm;
