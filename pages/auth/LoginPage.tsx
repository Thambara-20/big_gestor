import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppData } from '../../hooks/useAppData'; // To get settings for logo
import { APP_NAME, BellIcon, ExclamationCircleIcon, LOGO_LIGHT_THEME_BASE64, LOGO_DARK_THEME_BASE64 } from '../../constants';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal';

const ChangelogContent: React.FC = () => (
  <div className="space-y-4 text-sm text-text-secondary max-h-[60vh] overflow-y-auto pr-2">
     <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-text-primary">Versão 2.5.0 (Cloud & Equipes)</h3>
      <ul className="list-disc list-inside mt-1 space-y-1">
        <li><strong>Dados na Nuvem com Supabase:</strong> Seus dados agora são salvos de forma segura e automática na nuvem!</li>
        <li><strong>Sistema de Equipes:</strong> Adicione membros e compartilhe informações.</li>
        <li><strong>Kanban de Equipe:</strong> Compartilhe jobs específicos com sua equipe para colaboração focada.</li>
        <li><strong>Calendário de Gravações Compartilhado:</strong> Visualize a agenda de gravações de toda a equipe com cores para cada membro.</li>
        <li><strong>Agendamento Avançado:</strong> Adicione data e hora de gravação aos jobs.</li>
        <li><strong>Filtro Financeiro:</strong> Filtre a Central Financeira por status (inadimplentes, concluídos, em dia).</li>
        <li><strong>Editor de Roteiro Interativo:</strong> Arraste e solte cenas para reordená-las com renumeração automática.</li>
        <li><strong>Novos Gráficos de Desempenho:</strong> Métricas adicionais para uma análise mais profunda do seu negócio.</li>
      </ul>
    </div>
    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-text-primary">Versão 2.1.0</h3>
      <ul className="list-disc list-inside mt-1 space-y-1">
        <li>Interface Monocromática: O aplicativo agora usa um tema em tons de cinza para um visual mais sóbrio e focado. Cores são usadas para alertas.</li>
        <li>Fonte Robuck: A identidade visual "BIG" foi atualizada com a nova fonte.</li>
        <li>Tela de Login: Adicionado alerta de novidades e design refinado.</li>
      </ul>
    </div>
    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-text-primary">Versão 2.0.0</h3>
      <ul className="list-disc list-inside mt-1 space-y-1">
        <li>Novo Módulo de Rascunhos: Crie roteiros e anotações de texto diretamente no sistema.</li>
        <li>Editor de Roteiro: Ferramenta para estruturar cenas, descrições e calcular a duração total do vídeo.</li>
        <li>Anexos de Imagens: Adicione referências visuais aos seus rascunhos.</li>
      </ul>
    </div>
    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-text-primary">Versão 1.5.0</h3>
      <ul className="list-disc list-inside mt-1 space-y-1">
        <li>Sistema de Autenticação: Introdução de login e registro de usuários para segurança dos dados.</li>
        <li>Tela de Abertura: Nova animação de boas-vindas com a marca da aplicação.</li>
      </ul>
    </div>
  </div>
);


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatesModalOpen, setUpdatesModalOpen] = useState(false);
  const { login } = useAuth();
  const { settings } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('big_rememberedUser');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const errorMessage = await login(username, password);
    setIsLoading(false);
    
    if (errorMessage) {
      setError(errorMessage);
    } else {
      if (rememberMe) {
        localStorage.setItem('big_rememberedUser', username);
      } else {
        localStorage.removeItem('big_rememberedUser');
      }
      toast.success('Login bem-sucedido!');
      navigate('/dashboard');
    }
  };
  
  const commonInputClass = "w-full px-4 py-3 border border-border-color rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow bg-card-bg text-text-primary placeholder-text-secondary";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <button
        onClick={() => setUpdatesModalOpen(true)}
        className="fixed top-4 right-4 p-3 bg-card-bg rounded-full shadow-lg hover:bg-slate-100 transition-colors z-10 text-accent hover:text-yellow-500"
        title="Ver novidades e atualizações"
      >
        <BellIcon size={24} />
      </button>

      <div className={`w-full max-w-md transition-transform duration-500 ${error ? 'animate-shake' : ''}`}>
        <div className="text-center mb-6 sm:mb-8">
          <img src={LOGO_LIGHT_THEME_BASE64} alt={`${APP_NAME} Logo`} className="logo-light h-12 sm:h-16 mx-auto mb-2 object-contain" />
          <img src={LOGO_DARK_THEME_BASE64} alt={`${APP_NAME} Logo`} className="logo-dark h-12 sm:h-16 mx-auto mb-2 object-contain" />
          <p className="text-text-secondary">Acesse sua conta para continuar.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card-bg shadow-xl rounded-xl p-6 sm:p-8 space-y-6">
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center" role="alert">
              <ExclamationCircleIcon size={20} className="mr-3" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-1">Usuário ou Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(null); }}
              className={commonInputClass}
              placeholder="seu_usuario ou seu@email.com"
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              className={commonInputClass}
              placeholder="••••••••"
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                Lembrar-me
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-white py-3 px-4 rounded-lg shadow-md hover:brightness-90 transition-all duration-150 ease-in-out font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          <div className="space-y-2 text-center">
             <p className="text-sm text-text-secondary">
                Não tem uma conta?{' '}
                <Link to="/register" className="font-medium text-accent hover:underline">
                Registrar-se
                </Link>
            </p>
          </div>
        </form>
      </div>
      <footer className="text-center text-xs text-slate-500 mt-8 sm:mt-12">
        <p>&copy; {new Date().getFullYear()} {APP_NAME} Soluções. Todos os direitos reservados.</p>
      </footer>

      <Modal isOpen={isUpdatesModalOpen} onClose={() => setUpdatesModalOpen(false)} title="Novidades e Atualizações" size="lg">
        <ChangelogContent />
      </Modal>
    </div>
  );
};

export default LoginPage;