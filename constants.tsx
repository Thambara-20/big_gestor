import React from 'react';
import { JobStatus, ServiceType } from './types';
import { 
  Home as HomeIcon, Briefcase as BriefcaseIcon, Users as UsersIcon, CreditCard as CreditCardIcon, 
  BarChartBig as BarChartIcon, MessageCircle, FolderArchive as FolderArchiveIcon, 
  Sparkles as SparklesIcon, Cog as SettingsIcon, PlusCircle as PlusCircleIcon, X as XIcon, Trash2 as TrashIcon, 
  Edit3 as PencilIcon, CheckCircle as CheckCircleIcon, AlertCircle as AlertCircleIcon, Clock as ClockIcon, 
  DollarSign as CurrencyDollarIcon, Eye as EyeOpenIcon, EyeOff as EyeClosedIcon, List as ListBulletIcon, 
  ArrowRight as ArrowRightIcon, Settings, CalendarDays as CalendarIcon, FileText, Bot as BotIcon,
  Save as SaveIcon, Check as CheckIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, 
  Wallet as WalletIcon, ExternalLink as ExternalLinkIcon, Plus as PlusIcon, Minus as MinusIcon, 
  Table as TableCellsIcon, ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon, Paperclip as PaperclipIcon, 
  Bell as BellIcon, RotateCw as RotateCwIcon, Download as DownloadIcon, Upload as UploadIcon, 
  LogOut as LogOutIcon, Printer as PrinterIcon, CheckSquare as CheckSquareIcon, GripVertical as GripVerticalIcon, 
  ImageUp as ImageUpIcon, ImageOff as ImageOffIcon, SendHorizonal, Link as LinkIcon, Link2 as RemoveLinkIcon,
  Archive as ArchiveIcon, GitCommitVertical as SyncIcon, MessageSquare as WhatsAppIcon
} from 'lucide-react';

export const APP_NAME = "BIG";
export const ACCENT_COLOR = "custom-brown"; // This will be dynamically overridden by settings

// BIG SOLUÇÕES logo (black text for light theme)
export const LOGO_LIGHT_THEME_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2gAAAFKCAMAAADuAABeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEbC3/IAAAAkdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ASrC5+gAAAAlwSFlzAAAF/wAABf8Byms24gAAA1pJREFUeJzt2+tyJAUQhuEw2ChS/A94h0QxUv6/Yx3aE1qCnd1VVTv7rL2EIAgCg04KAIJOAYCgUwAg6BQA6HQKAIJOAYCgUwAg6BQA6HQKAO0+AECgKQDQ6RQACDoFAIIuAEDSKQACgSYAQKNTAECgKQDQ6RQACDoFAIIuAEDSKQAQ7QMAgSYAQKNTAECgKQDQ6RQACDoFAIIuAEDSKQACgSYAQKNTAEA7BwACgSYAQKNTAECgKQDQ6RQACDoFAIIuAEDSKQACgSYAQKNTAADqHgBAoAkA0HQKAIIuAEDSKQACgSYAQKNTAECgKQDQ6RQACDoFAIIuAECgCQCajgB0igAEXQCApFMAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAk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';

// BIG SOLUÇÕES logo (white text for dark theme)
export const LOGO_DARK_THEME_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2gAAAFKCAMAAADuAABeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8a9Gy8AAAkkdFJOU///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ANR/12YAAAAlwSFlzAAAF/wAABf8Byms24gAAA1pJREFUeJzt2+tyJAUQhuEw2ChS/A94h0QxUv6/Yx3aE1qCnd1VVTv7rL2EIAgCg04KAIJOAYCgUwAg6BQA6HQKAIJOAYCgUwAg6BQA6HQKAO0+AECgKQDQ6RQACDoFAIIuAEDSKQACgSYAQKNTAECgKQDQ6RQACDoFAIIuAEDSKQAQ7QMAgSYAQKNTAECgKQDQ6RQACDoFAIIuAEDSKQACgSYAQKNTAEA7BwACgSYAQKNTAECgKQDQ6RQACDoFAIIuAEDSKQACgSYAQKNTAADqHgBAoAkA0HQKAIIuAEDSKQACgSYAQKNTAECgKQDQ6RQACDoFAIIuAECgCQCajgB0igAEXQCApFMAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQDQdAoABF0AgKRTACDQBACNRwEC0OkUAAC6AABJp1MAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGgECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECnUwAg0AQAQdMpAF0AgECgCQDQdAoABF0AgKRTACDQBACNTgGAQFMANDoFABJ0igAEXQCApFMAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECjUwAg0AQAgUYTgE4BgKATAKDpFABoOgVAoAkA0HQKAADqHgCg6QQAaDoFoOkUAECgCQDQdAoABF0AgKRTACDQBACNTgGAQFMANDoFABJ0igAEXQCApFMAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECjUwAg0AQAgUYTgE4BgKATAKDpFABoOgVAoAkA0HQKAADqHgCg6QQAaDoFoOkUAECgCQDQdAoABF0AgKRTACDQBACNTgGAQFMANDoFABJ0igAEXQCApFMAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECjUwAg0AQAgUYTgE4BgKATAKDpFABoOgVAoAkA0HQKAADqHgCg6QQAaDoFoOkUAECgCQDQdAoABF0AgKRTACDQBACNTgGAQFMANDoFABJ0igAEXQCApFMAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECjUwAg0AQAgUYTgE4BgKATAKDpFABoOgVAoAkA0HQKAADqHgCg6QQAaDoFoOkUAECgCQDQdAoABF0AgKRTACDQBACNTgGAQFMANDoFABJ0igAEXQCApFMAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECjUwAg0AQAgUYTgE4BgKATAKDpFABoOgVAoAkA0HQKAADqHgCg6QQAaDoFoOkUAECgCQDQdAoABF0AgKRTACDQBACNTgGAQFMANDoFABJ0igAEXQCApFMAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAECLk2VbV/YCAQCaTgGAoFMAIGkGAECgCQCajgB0igAEXQCApFMAINAkAECLkwEAqPsAANJ0AgA0nQLQ6QQAINAkAEDTKQCQoFMAINAkAGg6BQACLgBA0ikAAgBNp0tLfwEB/K8h8dKwuHAAAAAASUVORK5CYII=';

// --- Icon Exports ---
// We alias and export icons here for consistent use across the app.
export {
    HomeIcon, BriefcaseIcon, UsersIcon, CreditCardIcon, BarChartIcon, FolderArchiveIcon,
    SparklesIcon, SettingsIcon, PlusCircleIcon, XIcon, TrashIcon, PencilIcon, CheckCircleIcon,
    AlertCircleIcon, ClockIcon, CurrencyDollarIcon, EyeOpenIcon, EyeClosedIcon, ListBulletIcon,
    ArrowRightIcon, CalendarIcon, BotIcon, SaveIcon, CheckIcon, ChevronLeftIcon,

    ChevronRightIcon, WalletIcon, ExternalLinkIcon, PlusIcon, MinusIcon, TableCellsIcon,
    ChevronDownIcon, ChevronUpIcon, PaperclipIcon, BellIcon, RotateCwIcon, DownloadIcon,
    UploadIcon, LogOutIcon, PrinterIcon, CheckSquareIcon, GripVerticalIcon, ImageUpIcon,
    ImageOffIcon, SendHorizonal, LinkIcon, RemoveLinkIcon, ArchiveIcon, SyncIcon, WhatsAppIcon,
    MessageCircle as MessageCircleIcon,
    AlertCircleIcon as ExclamationCircleIcon,
    FileText as ContractIcon,
    FileText as DraftIcon,
};

// --- Static Data ---
export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Jobs', path: '/jobs', icon: BriefcaseIcon },
  { name: 'Clientes', path: '/clients', icon: UsersIcon },
  { name: 'Contratos', path: '/contracts', icon: FileText },
  { name: 'Financeiro', path: '/financials', icon: CreditCardIcon },
  { name: 'Desempenho', path: '/performance', icon: BarChartIcon },
  { name: 'Calendário', path: '/calendar', icon: CalendarIcon },
  { name: 'Rascunhos', path: '/drafts', icon: FileText },
  { name: 'Comunicação', path: '/communication', icon: MessageCircle },
  { name: 'Assistente AI', path: '/ai-assistant', icon: SparklesIcon },
];

export const KANBAN_COLUMNS = [
  { id: 'col1', title: 'Briefing', status: JobStatus.BRIEFING },
  { id: 'col2', title: 'Produção', status: JobStatus.PRODUCTION },
  { id: 'col3', title: 'Revisão', status: JobStatus.REVIEW },
  { id: 'col4', title: 'Finalizado', status: JobStatus.FINALIZED },
  { id: 'col5', title: 'Pago', status: JobStatus.PAID },
  { id: 'col6', title: 'Outros', status: JobStatus.OTHER },
];

export const SERVICE_TYPE_OPTIONS = Object.entries(ServiceType).map(([key, value]) => ({
  value: value,
  label: value,
}));

export const JOB_STATUS_OPTIONS = Object.entries(JobStatus).map(([key, value]) => ({
  value: value,
  label: value,
}));