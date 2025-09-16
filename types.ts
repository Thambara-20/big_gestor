export enum ServiceType {
  VIDEO = 'Vídeo',
  PHOTO = 'Fotografia',
  DESIGN = 'Design',
  SITES = 'Sites',
  STORY = 'Story',
  CASAMENTO = 'Casamento',
  CONTEUDO = 'Conteúdos',
  SET = 'Set',
  EVENTOS = 'Eventos',
  INSTITUCIONAL = 'Institucional',
  SOCIAL_MEDIA = 'Social Media',
  AUXILIAR_T = 'Auxiliar T.',
  FREELA = 'Freela',
  PROGRAMACAO = 'Programação',
  REDACAO = 'Redação',
  OTHER = 'Outro',
}

export enum JobStatus {
  BRIEFING = 'Briefing',
  PRODUCTION = 'Produção',
  REVIEW = 'Revisão',
  FINALIZED = 'Finalizado',
  PAID = 'Pago',
  OTHER = 'Outros',
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  cpf?: string;
  observations?: string;
  createdAt: string;
}

export interface JobObservation {
  id: string;
  text: string;
  timestamp: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string; // ISO String
  method?: string;
  notes?: string;
}

export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Contract {
  id: string;
  title: string;
  clientId: string;
  content: string;
  createdAt: string;
  ownerId: string;
  ownerUsername: string;
}

export interface Job {
  id: string;
  name: string;
  clientId: string;
  serviceType: ServiceType;
  value: number;
  cost?: number; // New for profitability tracking
  deadline: string; // ISO string date
  recordingDate?: string; // ISO string date and time
  status: JobStatus;
  cloudLinks?: string[]; 
  createdAt: string;
  notes?: string; // General job notes
  isDeleted?: boolean;
  observationsLog?: JobObservation[];
  payments: Payment[]; // Replaces all old payment fields
  isRecurring?: boolean;
  createCalendarEvent?: boolean;
  tasks: Task[]; // New for checklist
  linkedContractId?: string; // New for linking contracts
  linkedDraftIds: string[]; // New for linking drafts
  ownerId?: string; // User ID of the job creator
  ownerUsername?: string; // Username of the job creator
  isTeamJob?: boolean; // Flag to share job with team in Kanban/List
}

export enum FinancialJobStatus {
  PENDING_DEPOSIT = 'Aguardando Entrada',
  PARTIALLY_PAID = 'Parcialmente Pago',
  PENDING_FULL_PAYMENT = 'Aguardando Pagamento',
  PAID = 'Pago',
  OVERDUE = 'Atrasado',
}


export interface FinancialRecord extends Job {
  financialStatus: FinancialJobStatus;
  clientName?: string;
  totalPaid: number;
  remaining: number;
}

export interface AIChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  relatedData?: unknown;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  retrievedContext?: {
    uri: string;
    title: string;
  };
}

export interface AppSettings {
  asaasUrl?: string;
  userName?: string; // This is for display name in dashboard, not auth username
  primaryColor?: string;
  accentColor?: string;
  splashScreenBackgroundColor?: string;
  privacyModeEnabled?: boolean; 
  teamMembers?: string[]; // Usernames of team members
  theme?: 'light' | 'dark';
}

export interface User {
  id:string;
  username: string; 
  email: string;
}

export interface ScriptLine {
  id: string;
  scene: string;
  description: string;
  duration: number; // in seconds
}

export interface Attachment {
  id: string;
  name: string;
  dataUrl: string; // base64
}

export interface DraftNote {
  id: string;
  title: string;
  type: 'TEXT' | 'SCRIPT';
  content: string; 
  scriptLines: ScriptLine[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'deadline' | 'overdue' | 'event' | 'client';
  message: string;
  linkTo: string;
  isRead: boolean;
  entityId: string; // ID of the job or client
}