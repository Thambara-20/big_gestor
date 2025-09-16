import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useAppData } from '../hooks/useAppData';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { APP_NAME, SettingsIcon as PageIcon, LinkIcon, DownloadIcon, UploadIcon, UsersIcon, XIcon, ImageUpIcon, ImageOffIcon } from '../constants'; 
import LoadingSpinner from '../components/LoadingSpinner'; 
import { User } from '../types';
import { isPersistenceEnabled } from '../services/blobStorageService';
import { ShieldCheck } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    loading, 
    exportData,
    importData,
    allUsers,
  } = useAppData();
  const { currentUser, changePassword } = useAuth();
  
  const [asaasUrlInput, setAsaasUrlInput] = useState(settings.asaasUrl || '');
  const [userNameInput, setUserNameInput] = useState(settings.userName || '');
  const [teamMemberInput, setTeamMemberInput] = useState('');
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const teamInputRef = useRef<HTMLInputElement>(null);
  
  // State for password change
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);


  useEffect(() => {
    if (!loading) {
      setAsaasUrlInput(settings.asaasUrl || 'https://www.asaas.com/login');
      setUserNameInput(settings.userName || '');
    }
  }, [settings, loading]);

  const handleSaveChanges = () => {
    try {
        if (asaasUrlInput && !isValidHttpUrl(asaasUrlInput)) {
            toast.error('URL do Asaas inválida. Deve começar com http:// ou https://');
            return;
        }
    } catch(e) {
        toast.error('Formato de URL inválido.');
        return;
    }

    updateSettings({
      asaasUrl: asaasUrlInput || undefined, 
      userName: userNameInput || undefined,
    });
    toast.success('Configurações salvas com sucesso!');
  };

  const isValidHttpUrl = (string: string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.type !== 'application/json') {
          toast.error("Por favor, selecione um arquivo .json válido.");
          return;
      }
      
      if (!window.confirm("Atenção: A importação de dados substituirá TODOS os dados atuais (jobs, clientes, configurações, etc.). Esta ação não pode ser desfeita. Deseja continuar?")) {
          if (event.target) event.target.value = '';
          return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
          const text = e.target?.result;
          if (typeof text === 'string') {
              await importData(text);
          }
      };
      reader.onerror = () => {
          toast.error("Falha ao ler o arquivo.");
      };
      reader.readAsText(file);
      
      if (event.target) event.target.value = '';
  };

  const handleTeamMemberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTeamMemberInput(input);
    if (input.length > 1) {
        const filtered = allUsers.filter(user => 
            (user.username.toLowerCase().includes(input.toLowerCase()) || 
             user.email.toLowerCase().includes(input.toLowerCase())) &&
            user.id !== currentUser?.id &&
            !settings.teamMembers?.includes(user.username)
        );
        setSuggestions(filtered);
    } else {
        setSuggestions([]);
    }
  };

  const addMember = (username: string) => {
    const updatedMembers = [...(settings.teamMembers || []), username];
    updateSettings({ teamMembers: updatedMembers });
    toast.success(`${username} foi adicionado à equipe.`);
    setTeamMemberInput('');
    setSuggestions([]);
  };

  const handleRemoveTeamMember = (usernameToRemove: string) => {
    const updatedMembers = (settings.teamMembers || []).filter(member => member !== usernameToRemove);
    updateSettings({ teamMembers: updatedMembers });
    toast.success(`${usernameToRemove} foi removido da equipe.`);
  };
  
  const handleThemeChange = (theme: 'light' | 'dark') => {
    updateSettings({ theme });
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("As novas senhas não coincidem.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setIsChangingPassword(true);
    const error = await changePassword(oldPassword, newPassword);
    setIsChangingPassword(false);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Senha alterada com sucesso!");
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (teamInputRef.current && !teamInputRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  const commonInputClass = "w-full p-2 border border-border-color rounded-md focus:ring-2 focus:ring-accent focus:border-accent text-text-primary outline-none transition-shadow bg-card-bg";
  const sectionCardClass = "bg-card-bg p-6 rounded-xl shadow-lg border border-border-color";

  if (loading) return <div className="flex justify-center items-center h-full"><LoadingSpinner /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <PageIcon size={32} className="text-accent mr-3" />
        <h1 className="text-3xl font-bold text-text-primary">Configurações</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className={sectionCardClass}>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Dados do Usuário</h2>
            <div>
                <label htmlFor="userName" className="block text-sm font-medium text-text-secondary mb-1">Seu Nome (para saudação no Dashboard)</label>
                <input 
                  type="text" 
                  id="userName" 
                  value={userNameInput} 
                  onChange={(e) => setUserNameInput(e.target.value)} 
                  className={commonInputClass}
                  placeholder="Ex: João Silva"
                />
              </div>
          </div>

          <div className={sectionCardClass}>
            <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center"><UsersIcon size={22} className="mr-2 text-accent"/>Gerenciamento de Equipe</h2>
            <p className="text-sm text-text-secondary mb-3">Adicione membros para visualizar seus jobs e calendários.</p>
            <div className="relative" ref={teamInputRef}>
                <input
                    type="text"
                    value={teamMemberInput}
                    onChange={handleTeamMemberInputChange}
                    className={commonInputClass}
                    placeholder="Buscar usuário por nome ou email..."
                />
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-card-bg border border-border-color rounded-md shadow-lg max-h-40 overflow-y-auto">
                        {suggestions.map(user => (
                            <li key={user.id} onClick={() => addMember(user.username)} className="p-2 hover:bg-hover-bg cursor-pointer">
                                <span className="font-semibold">{user.username}</span> <span className="text-sm text-text-secondary">- {user.email}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-base font-medium text-text-primary mb-2">Membros Atuais:</h3>
                <div className="flex flex-wrap gap-2">
                    {(settings.teamMembers || []).length > 0 ? (
                        (settings.teamMembers || []).map(member => (
                            <div key={member} className="flex items-center p-2 bg-highlight-bg rounded-full">
                                <span className="text-text-primary font-medium text-sm ml-2">{member}</span>
                                <button onClick={() => handleRemoveTeamMember(member)} className="p-1 text-red-500 hover:bg-red-100 rounded-full ml-2">
                                    <XIcon size={14} />
                                </button>
                            </div>
                        ))
                    ) : <p className="text-sm text-text-secondary">Nenhum membro na equipe ainda.</p>}
                </div>
            </div>
          </div>
          
          <div className={sectionCardClass}>
            <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center"><LinkIcon size={22} className="mr-2 text-accent"/>Links Externos</h2>
            <div>
              <label htmlFor="asaasUrl" className="block text-sm font-medium text-text-secondary mb-1">URL da Página de Pagamentos (Asaas)</label>
              <input type="url" id="asaasUrl" value={asaasUrlInput} onChange={(e) => setAsaasUrlInput(e.target.value)} className={commonInputClass} placeholder="Ex: https://www.asaas.com/login" />
            </div>
          </div>
          
          {isPersistenceEnabled && (
            <div className={sectionCardClass}>
              <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center"><ShieldCheck size={22} className="mr-2 text-accent"/>Alterar Senha</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-text-secondary mb-1">Senha Antiga</label>
                  <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={commonInputClass} required disabled={isChangingPassword} />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-text-secondary mb-1">Nova Senha (mín. 6 caracteres)</label>
                  <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={commonInputClass} required disabled={isChangingPassword} />
                </div>
                 <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">Confirmar Nova Senha</label>
                  <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={commonInputClass} required disabled={isChangingPassword} />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-accent text-white px-4 py-2 rounded-lg shadow hover:brightness-90 transition-all disabled:opacity-50" disabled={isChangingPassword}>
                        {isChangingPassword ? <LoadingSpinner size="sm" color="text-white"/> : 'Salvar Nova Senha'}
                    </button>
                </div>
              </form>
            </div>
          )}

        </div>

        <div className="space-y-8">

          <div className={sectionCardClass}>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Aparência</h2>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Tema da Interface</label>
              <div className="flex space-x-4">
                <button onClick={() => handleThemeChange('light')} className={`w-1/2 p-2 rounded-lg border-2 ${settings.theme !== 'dark' ? 'border-accent ring-2 ring-accent' : 'border-border-color'}`}>
                  <div className="w-full h-20 bg-white border border-slate-200 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-black">Claro</span>
                  </div>
                </button>
                <button onClick={() => handleThemeChange('dark')} className={`w-1/2 p-2 rounded-lg border-2 ${settings.theme === 'dark' ? 'border-accent ring-2 ring-accent' : 'border-border-color'}`}>
                  <div className="w-full h-20 bg-[#1E1E1E] border border-gray-700 rounded-md flex items-center justify-center">
                    <span className="font-semibold text-white">Escuro</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className={sectionCardClass}>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Backup e Restauração</h2>
            <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium text-text-primary">Exportar Dados</h3>
                  <p className="text-sm text-text-secondary mt-1 mb-2">Crie um backup de todos os seus dados. Salve este arquivo em um local seguro.</p>
                  <button onClick={exportData} className="w-full flex items-center justify-center gap-2 p-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors">
                      <DownloadIcon size={18} /> Exportar
                  </button>
                </div>
                <div>
                  <h3 className="text-base font-medium text-text-primary">Importar Dados</h3>
                  <p className="text-sm text-text-secondary mt-1 mb-2"><span className="font-bold text-red-500">Atenção:</span> Isto substituirá todos os dados existentes.</p>
                  <button onClick={handleImportClick} className="w-full flex items-center justify-center gap-2 p-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-colors">
                      <UploadIcon size={18} /> Importar
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
                </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSaveChanges}
          className="bg-accent text-white px-6 py-3 rounded-lg shadow hover:brightness-90 transition-all text-lg font-semibold"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;