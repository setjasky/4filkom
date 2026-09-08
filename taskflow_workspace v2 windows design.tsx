import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  LayoutGrid,
  ListTodo,
  Plus,
  CheckCircle2,
  Clock,
  Sun,
  Sparkles,
  Palette,
  Moon,
  Briefcase,
  Trash2,
  Edit3,
  Search,
  Filter,
  Check,
  ExternalLink,
  X,
  ChevronRight,
  Database,
  RefreshCw,
  AlertCircle,
  Tag,
  ArrowUpDown,
  MoreVertical,
  CheckCircle,
  ShieldCheck,
  Zap,
  Flame,
  CheckSquare,
  Copy,
  Monitor,
  Maximize2,
  Minimize2,
  Folder,
  HardDrive,
  Power,
  Grid,
  Layers,
  Computer
} from 'lucide-react';

// 6 Distinct Themes: Bright, Bubbly, Colourful, Dark, Professional, and Retro Windows 9x
const THEMES = {
  retro: {
    id: 'retro',
    name: 'Win 9x Desktop',
    icon: Monitor,
    bg: 'bg-[#008080] text-slate-900',
    card: 'bg-[#c0c0c0] text-slate-900 border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800 shadow-md',
    column: 'bg-[#d4d0c8] border-2 border-t-slate-800 border-l-slate-800 border-r-white border-b-white',
    header: 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white font-bold',
    primary: 'bg-[#c0c0c0] hover:bg-[#d4d0c8] text-black font-bold border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800 active:border-t-slate-800 active:border-l-slate-800 active:border-r-white active:border-b-white',
    primaryOutline: 'border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800 bg-[#c0c0c0] text-black',
    accentText: 'text-blue-900',
    accentBg: 'bg-blue-100 text-blue-900 border border-blue-400',
    badge: 'bg-[#000080] text-white px-2 py-0.5 text-[10px] font-mono',
    radius: 'rounded-none',
    input: 'bg-white border-2 border-t-slate-800 border-l-slate-800 border-r-white border-b-white text-slate-900 focus:outline-none font-mono',
    subtext: 'text-slate-700',
    headerBg: 'bg-blue-900/20'
  },
  bright: {
    id: 'bright',
    name: 'Bright',
    icon: Sun,
    bg: 'bg-slate-50 text-slate-900',
    card: 'bg-white text-slate-900 border-slate-200/90 shadow-xs hover:shadow-md transition-all',
    column: 'bg-slate-200/50 border-slate-200/70',
    header: 'bg-white/90 backdrop-blur-md border-b border-slate-200 text-slate-900',
    primary: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20 shadow-md',
    primaryOutline: 'border border-amber-500 text-amber-600 hover:bg-amber-50',
    accentText: 'text-amber-600',
    accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    radius: 'rounded-xl',
    input: 'bg-white border-slate-200 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500',
    subtext: 'text-slate-500',
    headerBg: 'bg-amber-500/10'
  },
  bubbly: {
    id: 'bubbly',
    name: 'Bubbly',
    icon: Sparkles,
    bg: 'bg-pink-50/70 text-pink-950',
    card: 'bg-white/95 text-pink-950 border-pink-200/80 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all',
    column: 'bg-pink-100/50 border-pink-200/60',
    header: 'bg-white/80 backdrop-blur-md border-b border-pink-200 text-pink-950',
    primary: 'bg-pink-500 hover:bg-pink-600 text-white shadow-pink-400/30 shadow-lg font-bold',
    primaryOutline: 'border border-pink-400 text-pink-600 hover:bg-pink-50',
    accentText: 'text-pink-600',
    accentBg: 'bg-pink-100 text-pink-800 border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
    radius: 'rounded-3xl',
    input: 'bg-pink-50/40 border-pink-200 text-pink-950 focus:ring-2 focus:ring-pink-400 focus:border-pink-400',
    subtext: 'text-pink-600/70',
    headerBg: 'bg-pink-500/10'
  },
  colourful: {
    id: 'colourful',
    name: 'Colourful',
    icon: Palette,
    bg: 'bg-indigo-50/30 text-slate-900',
    card: 'bg-white text-slate-900 border-indigo-100 shadow-xs hover:border-violet-300 hover:shadow-md transition-all',
    column: 'bg-slate-100/90 border-slate-200/80',
    header: 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white shadow-md',
    primary: 'bg-violet-600 hover:bg-violet-700 text-white shadow-violet-500/30 shadow-md font-medium',
    primaryOutline: 'border border-violet-500 text-violet-600 hover:bg-violet-50',
    accentText: 'text-violet-600',
    accentBg: 'bg-violet-100 text-violet-800 border-violet-200',
    badge: 'bg-indigo-100 text-indigo-800',
    radius: 'rounded-2xl',
    input: 'bg-white border-violet-200 text-slate-900 focus:ring-2 focus:ring-violet-500 focus:border-violet-500',
    subtext: 'text-slate-500',
    headerBg: 'bg-violet-500/10'
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    icon: Moon,
    bg: 'bg-slate-950 text-slate-100',
    card: 'bg-slate-900/90 text-slate-100 border-slate-800 shadow-md hover:border-sky-500/40 hover:bg-slate-900 transition-all',
    column: 'bg-slate-900/40 border-slate-800/80',
    header: 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100',
    primary: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shadow-sky-500/20 shadow-md',
    primaryOutline: 'border border-sky-500 text-sky-400 hover:bg-sky-950/50',
    accentText: 'text-sky-400',
    accentBg: 'bg-sky-950/80 text-sky-300 border-sky-800',
    badge: 'bg-slate-800 text-sky-300',
    radius: 'rounded-xl',
    input: 'bg-slate-900 border-slate-800 text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500',
    subtext: 'text-slate-400',
    headerBg: 'bg-sky-500/10'
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    icon: Briefcase,
    bg: 'bg-slate-100 text-slate-900',
    card: 'bg-white text-slate-900 border-slate-300 shadow-2xs hover:border-slate-400 transition-all',
    column: 'bg-slate-200/70 border-slate-300',
    header: 'bg-slate-900 text-white border-b border-slate-800',
    primary: 'bg-blue-700 hover:bg-blue-800 text-white shadow-xs font-medium',
    primaryOutline: 'border border-blue-700 text-blue-700 hover:bg-blue-50',
    accentText: 'text-blue-700',
    accentBg: 'bg-blue-50 text-blue-900 border-blue-200',
    badge: 'bg-slate-200 text-slate-800',
    radius: 'rounded-md',
    input: 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600',
    subtext: 'text-slate-600',
    headerBg: 'bg-blue-700/10'
  }
};

const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Deploy Next.js 14 & PostgreSQL Database',
    description: 'Setup Prisma schema, migrate database tables, and configure environment variables.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    category: 'Engineering',
    deadline: new Date(Date.now() + 86400000 * 1 + 3600000 * 4).toISOString().slice(0, 16), // Tomorrow
    gcalSynced: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Q3 Product Strategy Review & Presentation',
    description: 'Prepare key metric slides and gather quarterly feedback from leadership.',
    status: 'TODO',
    priority: 'URGENT',
    category: 'Management',
    deadline: new Date(Date.now() + 3600000 * 5).toISOString().slice(0, 16), // Today in 5 hours
    gcalSynced: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Design Multi-Theme Design Tokens',
    description: 'Implement Bright, Bubbly, Colourful, Dark, and Professional design system modes.',
    status: 'DONE',
    priority: 'MEDIUM',
    category: 'Design',
    deadline: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 16), // 2 days ago
    gcalSynced: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Connect Google Calendar OAuth API',
    description: 'Enable automated two-way synchronization for deadlines and event reminders.',
    status: 'TODO',
    priority: 'HIGH',
    category: 'Engineering',
    deadline: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16), // In 3 days
    gcalSynced: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-5',
    title: 'Audit UX Responsiveness on Mobile',
    description: 'Ensure touch targets, swipe interactions, and board scrolling are ultra-smooth.',
    status: 'REVIEW',
    priority: 'LOW',
    category: 'QA',
    deadline: new Date(Date.now() + 86400000 * 4).toISOString().slice(0, 16),
    gcalSynced: false,
    createdAt: new Date().toISOString()
  }
];

const CATEGORIES = ['All', 'Engineering', 'Management', 'Design', 'QA', 'Marketing'];

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('retro');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'todo'
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  // Windows Desktop Mode & Active Desktop state
  const [isDesktopEnvironment, setIsDesktopEnvironment] = useState(true);
  const [isActiveDesktopWidget, setIsActiveDesktopWidget] = useState(false);
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);
  const [isWindowMinimized, setIsWindowMinimized] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState('classic-teal'); // 'classic-teal' | 'grid' | 'bliss' | 'dark'
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Live System Tray Clock Update
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isGCalModalOpen, setIsGCalModalOpen] = useState(false);
  const [isPostgresModalOpen, setIsPostgresModalOpen] = useState(false);

  // Toast Notification System
  const [toast, setToast] = useState(null);

  // Google Calendar Integration State
  const [gcalAccount, setGcalAccount] = useState({
    isConnected: true,
    email: 'user.workspace@gmail.com'
  });

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState('user.workspace@gmail.com');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    category: 'Engineering',
    deadline: '',
    syncToGCal: true
  });

  const activeTheme = THEMES[currentTheme] || THEMES.retro;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'URGENT':
        return <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-rose-100 text-rose-700 border border-rose-200">URGENT</span>;
      case 'HIGH':
        return <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-700 border border-amber-200">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-sky-100 text-sky-700 border border-sky-200">MEDIUM</span>;
      case 'LOW':
      default:
        return <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-600 border border-slate-200">LOW</span>;
    }
  };

  // Show Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const getWallpaperBg = () => {
    switch (wallpaper) {
      case 'grid':
        return 'bg-[#008080] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]';
      case 'bliss':
        return 'bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-600';
      case 'dark':
        return 'bg-slate-950';
      case 'classic-teal':
      default:
        return 'bg-[#008080]';
    }
  };

  const generateGoogleCalendarUrl = (task) => {
    if (!task.title) return '#';
    const title = encodeURIComponent(`[Work] ${task.title}`);
    const details = encodeURIComponent(
      `${task.description || 'Task created in Work Manager workspace.'}\n\nPriority: ${task.priority}\nCategory: ${task.category}`
    );

    let startDateISO, endDateISO;
    if (task.deadline) {
      const start = new Date(task.deadline);
      const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration
      startDateISO = start.toISOString().replace(/-|:|\.\d\d\d/g, '');
      endDateISO = end.toISOString().replace(/-|:|\.\d\d\d/g, '');
    } else {
      const start = new Date();
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      startDateISO = start.toISOString().replace(/-|:|\.\d\d\d/g, '');
      endDateISO = end.toISOString().replace(/-|:|\.\d\d\d/g, '');
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateISO}/${endDateISO}&details=${details}&add=workspace@company.com`;
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      status: 'TODO',
      priority: 'MEDIUM',
      category: 'Engineering',
      deadline: new Date(Date.now() + 86400000).toISOString().slice(0, 16), // Tomorrow default
      syncToGCal: true
    });
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      category: task.category || 'Engineering',
      deadline: task.deadline || '',
      syncToGCal: task.gcalSynced || false
    });
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Please enter a task title', 'error');
      return;
    }

    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                ...formData,
                gcalSynced: formData.syncToGCal
              }
            : t
        )
      );
      showToast('Task updated successfully!');
    } else {
      // Add new task
      const newTask = {
        id: `task-${Date.now()}`,
        ...formData,
        gcalSynced: formData.syncToGCal,
        createdAt: new Date().toISOString()
      };
      setTasks([newTask, ...tasks]);
      showToast('New task added to workspace!');

      if (formData.syncToGCal && formData.deadline) {
        // Automatically launch GCal sync link if checked
        window.open(generateGoogleCalendarUrl(newTask), '_blank');
      }
    }

    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    showToast('Task deleted', 'info');
  };

  const handleMoveStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    const statusLabels = { TODO: 'To Do', IN_PROGRESS: 'In Progress', REVIEW: 'Review', DONE: 'Done' };
    showToast(`Task moved to ${statusLabels[newStatus]}`);
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setGcalAccount((prev) => ({ ...prev, email: emailInput.trim() }));
    setIsEditingEmail(false);
    showToast('Email address updated successfully!');
  };

  const handleSyncToCalendarDirect = (task) => {
    const url = generateGoogleCalendarUrl(task);
    window.open(url, '_blank');
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, gcalSynced: true } : t))
    );
    showToast('Opening Google Calendar event window...');
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === 'All' || t.category === selectedCategory;
      const matchesPriority =
        selectedPriority === 'All' || t.priority === selectedPriority;
      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [tasks, searchQuery, selectedCategory, selectedPriority]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'DONE').length;
    const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
    const now = new Date();
    const overdue = tasks.filter((t) => {
      if (t.status === 'DONE' || !t.deadline) return false;
      return new Date(t.deadline) < now;
    }).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, overdue, percentage };
  }, [tasks]);

  const getDeadlineBadge = (deadlineStr, status) => {
    if (!deadlineStr) return null;
    if (status === 'DONE') {
      return (
        <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-200">
          <Check className="w-3 h-3" /> Completed
        </span>
      );
    }

    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diffHours = (deadline - now) / (1000 * 60 * 60);

    if (diffHours < 0) {
      return (
        <span className="flex items-center gap-1 text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-semibold border border-rose-200 animate-pulse">
          <AlertCircle className="w-3 h-3" /> Overdue
        </span>
      );
    } else if (diffHours <= 24) {
      return (
        <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md font-semibold border border-amber-200">
          <Clock className="w-3 h-3" /> Due Soon
        </span>
      );
    } else {
      const days = Math.ceil(diffHours / 24);
      return (
        <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
          <Clock className="w-3 h-3" /> {days} days left
        </span>
      );
    }
  };

  // Main Application Content Renderer
  const renderAppBody = () => (
    <div className="space-y-6 p-4">
      {/* STATS & PROGRESS OVERVIEW BAR */}
      <section className={`p-4 ${activeTheme.radius} ${activeTheme.card} grid grid-cols-2 md:grid-cols-4 gap-4`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${activeTheme.headerBg} ${activeTheme.accentText}`}>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-xs ${activeTheme.subtext}`}>Task Progress</p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold">{stats.percentage}%</span>
              <span className={`text-xs ${activeTheme.subtext}`}>
                ({stats.completed}/{stats.total})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-xs ${activeTheme.subtext}`}>In Progress</p>
            <span className="text-lg font-extrabold">{stats.inProgress}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-xs ${activeTheme.subtext}`}>Overdue Tasks</p>
            <span className="text-lg font-extrabold text-rose-600">{stats.overdue}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-xs ${activeTheme.subtext}`}>Google Synced</p>
            <span className="text-lg font-extrabold">
              {tasks.filter((t) => t.gcalSynced).length}
            </span>
          </div>
        </div>
      </section>

      {/* CONTROLS BAR: SEARCH, FILTERS & VIEW MODE SWITCHER */}
      <section className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${activeTheme.subtext}`} />
          <input
            type="text"
            placeholder="Search tasks by title, tag, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs ${activeTheme.radius} ${activeTheme.input} transition`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns & Views */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-3 py-2 text-xs ${activeTheme.radius} ${activeTheme.input} cursor-pointer`}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className={`px-3 py-2 text-xs ${activeTheme.radius} ${activeTheme.input} cursor-pointer`}
          >
            <option value="All">Priority: All</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <div className="flex items-center bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl border border-slate-300/40 dark:border-slate-700 shrink-0">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold ${activeTheme.radius} transition ${
                viewMode === 'kanban'
                  ? `${activeTheme.card} text-slate-900 dark:text-white shadow-xs`
                  : `${activeTheme.subtext} hover:text-slate-900`
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Kanban
            </button>
            <button
              onClick={() => setViewMode('todo')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold ${activeTheme.radius} transition ${
                viewMode === 'todo'
                  ? `${activeTheme.card} text-slate-900 dark:text-white shadow-xs`
                  : `${activeTheme.subtext} hover:text-slate-900`
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" /> To-Do List
            </button>
          </div>
        </div>
      </section>

      {/* KANBAN / TODO VIEWS */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {[
            { id: 'TODO', title: 'To Do', color: 'bg-slate-400' },
            { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-amber-500' },
            { id: 'REVIEW', title: 'Review', color: 'bg-purple-500' },
            { id: 'DONE', title: 'Done', color: 'bg-emerald-500' }
          ].map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className={`p-3.5 ${activeTheme.radius} ${activeTheme.column} border min-h-[420px] flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                    <span className={`w-2 h-2 rounded-full ${col.color}`} />
                    <span>{col.title}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                  {colTasks.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-300/50 dark:border-slate-800 rounded-xl">
                      <p className={`text-xs ${activeTheme.subtext}`}>No tasks in this column</p>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 ${activeTheme.radius} ${activeTheme.card} border flex flex-col gap-3 group relative`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {task.category}
                          </span>
                          {getPriorityBadge(task.priority)}
                        </div>

                        <div>
                          <h3 className="font-bold text-sm leading-tight group-hover:text-amber-600 transition-colors">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className={`text-xs mt-1.5 line-clamp-2 ${activeTheme.subtext}`}>
                              {task.description}
                            </p>
                          )}
                        </div>

                        {task.deadline && (
                          <div className="flex items-center justify-between pt-1">
                            {getDeadlineBadge(task.deadline, task.status)}
                            <span className={`text-[10px] ${activeTheme.subtext}`}>
                              {new Date(task.deadline).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                          <button
                            onClick={() => handleSyncToCalendarDirect(task)}
                            title={task.gcalSynced ? 'Synced to Google Calendar' : 'Sync to Google Calendar'}
                            className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md transition ${
                              task.gcalSynced
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40'
                                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <Calendar className="w-3 h-3" />
                            <span className="hidden sm:inline">
                              {task.gcalSynced ? 'GCal Synced' : 'Sync GCal'}
                            </span>
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditModal(task)}
                              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-500 transition"
                              title="Edit Task"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md text-slate-400 hover:text-rose-600 transition"
                              title="Delete Task"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-1">
                          <select
                            value={task.status}
                            onChange={(e) => handleMoveStatus(task.id, e.target.value)}
                            className={`w-full py-1 px-2 text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 ${activeTheme.radius} cursor-pointer`}
                          >
                            <option value="TODO">Move to: To Do</option>
                            <option value="IN_PROGRESS">Move to: In Progress</option>
                            <option value="REVIEW">Move to: Review</option>
                            <option value="DONE">Move to: Done</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`p-4 ${activeTheme.radius} ${activeTheme.card} border shadow-xs space-y-3`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
            <h2 className="font-bold text-sm tracking-tight flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-amber-500" />
              Checklist Tasks ({filteredTasks.length})
            </h2>
            <span className={`text-xs ${activeTheme.subtext}`}>
              Click checkbox to toggle completion
            </span>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center">
              <p className={`text-sm ${activeTheme.subtext}`}>No matching tasks found.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="py-3 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 rounded-xl transition"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() =>
                        handleMoveStatus(task.id, task.status === 'DONE' ? 'TODO' : 'DONE')
                      }
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 transition"
                    >
                      {task.status === 'DONE' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:border-amber-500" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`font-semibold text-sm ${
                            task.status === 'DONE'
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : ''
                          }`}
                        >
                          {task.title}
                        </span>
                        {getPriorityBadge(task.priority)}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          {task.category}
                        </span>
                      </div>
                      {task.description && (
                        <p className={`text-xs ${activeTheme.subtext}`}>{task.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                    {task.deadline && (
                      <div className="flex items-center gap-2">
                        {getDeadlineBadge(task.deadline, task.status)}
                        <span className={`text-xs ${activeTheme.subtext}`}>
                          {new Date(task.deadline).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => handleSyncToCalendarDirect(task)}
                      title="Sync to Google Calendar"
                      className={`p-1.5 rounded-md transition ${
                        task.gcalSynced
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(task)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        isDesktopEnvironment ? getWallpaperBg() : activeTheme.bg
      } transition-colors duration-300 font-sans flex flex-col relative select-none overflow-x-hidden`}
    >
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold border ${
              toast.type === 'error'
                ? 'bg-rose-600 text-white border-rose-700'
                : toast.type === 'info'
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-emerald-600 text-white border-emerald-700'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* TOP DECK HEADER (when not in full desktop mode or standard view) */}
      {!isDesktopEnvironment && (
        <header className={`sticky top-0 z-30 ${activeTheme.header} shadow-xs`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${activeTheme.radius} ${activeTheme.primary} flex items-center justify-center`}>
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-tight">TaskFlow</h1>
                  <span className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-full ${activeTheme.badge}`}>
                    {activeTheme.name} Mode
                  </span>
                </div>
                <p className={`text-xs ${activeTheme.subtext} hidden sm:block`}>
                  Clean Kanban & To-Do Workspace
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsDesktopEnvironment(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-blue-900 text-white hover:bg-blue-800 border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Win 9x Desktop Mode</span>
              </button>

              <button
                onClick={() => setIsGCalModalOpen(true)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold ${activeTheme.radius} border border-slate-200/80 transition-all ${
                  gcalAccount.isConnected
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">
                  {gcalAccount.isConnected ? 'Google Calendar Connected' : 'Connect Calendar'}
                </span>
              </button>

              <button
                onClick={() => setIsPostgresModalOpen(true)}
                title="View Next.js + PostgreSQL Schema"
                className={`p-2 text-xs font-semibold ${activeTheme.radius} border border-slate-200/80 hover:bg-slate-100/50 transition`}
              >
                <Database className="w-4 h-4 text-sky-600" />
              </button>

              {/* Theme Selector */}
              <div className="flex items-center bg-slate-200/60 dark:bg-slate-800 p-1 rounded-xl border border-slate-300/40 dark:border-slate-700">
                {Object.values(THEMES).map((theme) => {
                  const IconComp = theme.icon;
                  const isSelected = currentTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setCurrentTheme(theme.id);
                        showToast(`Switched to ${theme.name} Theme`);
                      }}
                      title={`${theme.name} Theme`}
                      className={`p-1.5 rounded-lg transition-all ${
                        isSelected
                          ? `${theme.primary} shadow-xs scale-105`
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleOpenCreateModal}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold ${activeTheme.radius} ${activeTheme.primary} transition`}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Task</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* WINDOWS DESKTOP SHELL WRAPPER */}
      {isDesktopEnvironment ? (
        <div className="flex-1 flex flex-col justify-between p-2 sm:p-4 pb-14 relative min-h-screen">
          {/* DESKTOP SHORTCUT ICONS */}
          <div className="grid grid-cols-1 gap-4 w-28 text-white z-10 p-2">
            <button
              onClick={() => {
                setIsWindowMinimized(false);
                setIsActiveDesktopWidget(false);
              }}
              className="flex flex-col items-center justify-center p-2 rounded hover:bg-white/10 group text-center cursor-pointer"
            >
              <div className="w-10 h-10 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800 flex items-center justify-center text-blue-900 shadow-md group-hover:scale-105 transition">
                <CheckSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold mt-1 drop-shadow-md text-white font-mono bg-black/40 px-1 rounded">
                TaskFlow.exe
              </span>
            </button>

            <button
              onClick={() => setIsActiveDesktopWidget(!isActiveDesktopWidget)}
              className="flex flex-col items-center justify-center p-2 rounded hover:bg-white/10 group text-center cursor-pointer"
            >
              <div className="w-10 h-10 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800 flex items-center justify-center text-emerald-800 shadow-md group-hover:scale-105 transition">
                <Grid className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold mt-1 drop-shadow-md text-white font-mono bg-black/40 px-1 rounded">
                Active Desktop
              </span>
            </button>

            <button
              onClick={() => setIsGCalModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded hover:bg-white/10 group text-center cursor-pointer"
            >
              <div className="w-10 h-10 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800 flex items-center justify-center text-blue-800 shadow-md group-hover:scale-105 transition">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold mt-1 drop-shadow-md text-white font-mono bg-black/40 px-1 rounded">
                Calendar.exe
              </span>
            </button>

            <button
              onClick={() => setIsPostgresModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded hover:bg-white/10 group text-center cursor-pointer"
            >
              <div className="w-10 h-10 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800 flex items-center justify-center text-purple-800 shadow-md group-hover:scale-105 transition">
                <Database className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs font-semibold mt-1 drop-shadow-md text-white font-mono bg-black/40 px-1 rounded">
                Postgres.db
              </span>
            </button>
          </div>

          {/* APPLICATION WINDOW / ACTIVE DESKTOP CONTAINER */}
          {!isWindowMinimized && (
            <div
              className={`transition-all duration-200 z-20 ${
                isActiveDesktopWidget
                  ? 'absolute inset-x-2 sm:inset-x-32 top-4 bottom-16 bg-[#c0c0c0]/95 border-2 border-slate-300 shadow-xl overflow-y-auto'
                  : isWindowMaximized
                  ? 'fixed inset-0 bottom-10 z-40 bg-[#c0c0c0] border-4 border-t-white border-l-white border-r-slate-800 border-b-slate-800 flex flex-col'
                  : 'max-w-6xl w-full mx-auto bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800 shadow-2xl rounded-none flex flex-col my-auto'
              }`}
            >
              {/* WINDOW TITLE BAR */}
              <div className="bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] px-2 py-1 flex items-center justify-between text-white select-none">
                <div className="flex items-center gap-2 font-bold text-xs tracking-wide">
                  <CheckSquare className="w-4 h-4 text-amber-300" />
                  <span>TaskFlow Workspace - [Active Desktop]</span>
                </div>

                <div className="flex items-center gap-1 font-mono">
                  {/* Pin as Active Desktop background */}
                  <button
                    onClick={() => setIsActiveDesktopWidget(!isActiveDesktopWidget)}
                    title={isActiveDesktopWidget ? 'Restore to Window' : 'Pin to Active Desktop Wallpaper'}
                    className="px-1.5 py-0.5 text-[10px] bg-[#c0c0c0] text-black border border-t-white border-l-white border-r-slate-800 border-b-slate-800 active:border-t-slate-800 active:border-l-slate-800 hover:bg-[#d4d0c8]"
                  >
                    {isActiveDesktopWidget ? 'Window' : 'Active Desktop'}
                  </button>

                  <button
                    onClick={() => setIsWindowMinimized(true)}
                    className="w-5 h-5 bg-[#c0c0c0] text-black font-bold border border-t-white border-l-white border-r-slate-800 border-b-slate-800 active:border-t-slate-800 active:border-l-slate-800 flex items-center justify-center text-xs"
                  >
                    _
                  </button>

                  <button
                    onClick={() => setIsWindowMaximized(!isWindowMaximized)}
                    className="w-5 h-5 bg-[#c0c0c0] text-black font-bold border border-t-white border-l-white border-r-slate-800 border-b-slate-800 active:border-t-slate-800 active:border-l-slate-800 flex items-center justify-center text-xs"
                  >
                    {isWindowMaximized ? '❐' : '□'}
                  </button>

                  <button
                    onClick={() => {
                      setIsDesktopEnvironment(false);
                      showToast('Exited Desktop Mode');
                    }}
                    className="w-5 h-5 bg-[#c0c0c0] text-black font-bold border border-t-white border-l-white border-r-slate-800 border-b-slate-800 active:border-t-slate-800 active:border-l-slate-800 flex items-center justify-center text-xs hover:bg-rose-600 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* MENU STRIP */}
              <div className="bg-[#c0c0c0] border-b border-slate-400 px-2 py-1 flex items-center gap-4 text-xs font-mono text-slate-800 border-t border-white">
                <button
                  onClick={handleOpenCreateModal}
                  className="hover:underline hover:text-black font-bold"
                >
                  <u>F</u>ile (New)
                </button>
                <button
                  onClick={() => setIsGCalModalOpen(true)}
                  className="hover:underline hover:text-black"
                >
                  <u>E</u>dit (Calendar)
                </button>
                <button
                  onClick={() => setWallpaper(wallpaper === 'classic-teal' ? 'grid' : wallpaper === 'grid' ? 'bliss' : 'classic-teal')}
                  className="hover:underline hover:text-black"
                >
                  <u>W</u>allpaper ({wallpaper})
                </button>
                <button
                  onClick={() => setIsPostgresModalOpen(true)}
                  className="hover:underline hover:text-black"
                >
                  <u>D</u>atabase
                </button>
              </div>

              {/* WINDOW CONTENT BODY */}
              <div className="bg-[#d4d0c8] p-2 sm:p-4 overflow-y-auto max-h-[75vh]">
                {renderAppBody()}
              </div>
            </div>
          )}

          {/* RETRO WINDOWS 9X TASKBAR */}
          <footer className="fixed bottom-0 inset-x-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center justify-between px-1.5 z-50 font-mono select-none">
            {/* START BUTTON & ACTIVE APPS */}
            <div className="flex items-center gap-1.5 relative">
              {/* Start Menu Button */}
              <button
                onClick={() => setStartMenuOpen(!startMenuOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold border-2 ${
                  startMenuOpen
                    ? 'border-t-slate-800 border-l-slate-800 border-r-white border-b-white bg-[#a0a0a0]'
                    : 'border-t-white border-l-white border-r-slate-800 border-b-slate-800 bg-[#c0c0c0] active:border-t-slate-800 active:border-l-slate-800'
                }`}
              >
                <Monitor className="w-4 h-4 text-blue-800" />
                <span>Start</span>
              </button>

              {/* Taskbar Active Window Tab */}
              <button
                onClick={() => setIsWindowMinimized(!isWindowMinimized)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border-2 max-w-[180px] truncate ${
                  !isWindowMinimized
                    ? 'border-t-slate-800 border-l-slate-800 border-r-white border-b-white bg-slate-200 font-bold'
                    : 'border-t-white border-l-white border-r-slate-800 border-b-slate-800 bg-[#c0c0c0]'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span className="truncate">TaskFlow Workspace</span>
              </button>

              {/* START MENU POPUP */}
              {startMenuOpen && (
                <div className="absolute bottom-11 left-0 w-64 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-slate-800 border-b-slate-800 shadow-2xl z-50 flex flex-col">
                  {/* Left Accent Banner */}
                  <div className="flex">
                    <div className="w-8 bg-gradient-to-t from-[#000080] via-[#1084d0] to-[#000080] text-white flex items-end justify-center pb-3 font-bold text-sm tracking-wider uppercase [writing-mode:vertical-lr] rotate-180">
                      Windows 9x
                    </div>

                    <div className="flex-1 py-1 text-xs divide-y divide-slate-300">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleOpenCreateModal();
                            setStartMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4 text-amber-500" />
                          <span>New Task...</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsGCalModalOpen(true);
                            setStartMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          <span>Google Calendar</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsPostgresModalOpen(true);
                            setStartMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                        >
                          <Database className="w-4 h-4 text-sky-600" />
                          <span>PostgreSQL DB</span>
                        </button>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setWallpaper(wallpaper === 'classic-teal' ? 'grid' : wallpaper === 'grid' ? 'bliss' : 'classic-teal');
                            setStartMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                        >
                          <Palette className="w-4 h-4 text-purple-600" />
                          <span>Wallpaper: {wallpaper}</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsDesktopEnvironment(false);
                            setStartMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                        >
                          <Monitor className="w-4 h-4 text-blue-600" />
                          <span>Modern App Mode</span>
                        </button>
                      </div>

                      <div className="pt-1">
                        <button
                          onClick={() => {
                            setTasks(INITIAL_TASKS);
                            showToast('Workspace reset to default tasks');
                            setStartMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-rose-700 hover:text-white flex items-center gap-2 text-rose-900 font-bold"
                        >
                          <Power className="w-4 h-4" />
                          <span>Restart Workspace</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SYSTEM TRAY CLOCK & CONTROLS */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsActiveDesktopWidget(!isActiveDesktopWidget)}
                className="text-[11px] font-mono px-2 py-0.5 border border-slate-400 bg-slate-100 hover:bg-slate-200"
              >
                {isActiveDesktopWidget ? '📌 Active Desktop' : '🗔 Windowed'}
              </button>

              <div className="px-2 py-0.5 border-2 border-t-slate-800 border-l-slate-800 border-r-white border-b-white text-xs bg-[#c0c0c0] flex items-center gap-2 text-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>{systemTime}</span>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        /* STANDARD VIEW CONTENT */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
          {renderAppBody()}
        </main>
      )}

      {/* MODALS */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div
            className={`w-full max-w-lg ${activeTheme.card} ${activeTheme.radius} p-6 border shadow-2xl space-y-4`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-500" />
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={() => setIsTaskModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-4">
              {/* Task Title */}
              <div>
                <label className="block text-xs font-bold mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement API route for Google Calendar OAuth"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3 py-2 text-xs ${activeTheme.radius} ${activeTheme.input}`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Add details, links, or notes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-3 py-2 text-xs ${activeTheme.radius} ${activeTheme.input}`}
                />
              </div>

              {/* Deadline Date & Time Input */}
              <div>
                <label className="block text-xs font-bold mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Deadline Date & Time
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Used for Calendar Sync
                  </span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className={`w-full px-3 py-2 text-xs ${activeTheme.radius} ${activeTheme.input}`}
                />
              </div>

              {/* Grid: Category, Priority, Status */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-2 py-2 text-xs ${activeTheme.radius} ${activeTheme.input}`}
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className={`w-full px-2 py-2 text-xs ${activeTheme.radius} ${activeTheme.input}`}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={`w-full px-2 py-2 text-xs ${activeTheme.radius} ${activeTheme.input}`}
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REVIEW">Review</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>
              </div>

              {/* Sync to Google Calendar Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="syncGCal"
                  checked={formData.syncToGCal}
                  onChange={(e) => setFormData({ ...formData, syncToGCal: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="syncGCal" className="text-xs font-semibold cursor-pointer flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Auto-sync deadline to Google Calendar
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className={`px-4 py-2 text-xs font-semibold border border-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-xs font-semibold ${activeTheme.primary} ${activeTheme.radius}`}
                >
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isGCalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md ${activeTheme.card} ${activeTheme.radius} p-6 border shadow-2xl space-y-4`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold">Google Calendar Integration</h2>
              </div>
              <button
                onClick={() => {
                  setIsGCalModalOpen(false);
                  setIsEditingEmail(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 mr-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-emerald-900 dark:text-emerald-300">
                      Google OAuth Connected
                    </p>
                    {isEditingEmail ? (
                      <form onSubmit={handleSaveEmail} className="mt-1 flex items-center gap-1.5">
                        <input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full px-2 py-1 text-xs border border-emerald-300 rounded bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="name@company.com"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="px-2 py-1 bg-emerald-600 text-white font-semibold rounded text-[11px] hover:bg-emerald-700 shrink-0"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEmailInput(gcalAccount.email);
                            setIsEditingEmail(false);
                          }}
                          className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px] hover:bg-slate-300 shrink-0"
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 truncate">
                          {gcalAccount.email}
                        </p>
                        <button
                          onClick={() => {
                            setEmailInput(gcalAccount.email);
                            setIsEditingEmail(true);
                          }}
                          className="p-1 text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 hover:bg-emerald-100/60 rounded transition flex items-center gap-1 text-[10px] font-semibold"
                          title="Change Email Address"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Change</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {!isEditingEmail && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                )}
              </div>

              <div className="space-y-2 pt-2">
                <label className="font-bold block">Sync Capabilities</label>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Automatically creates event on task deadline.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Direct 1-click Google Calendar web intent link.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Custom event title, category & priority meta.
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <button
                  onClick={() => {
                    setGcalAccount({ ...gcalAccount, isConnected: !gcalAccount.isConnected });
                    showToast(
                      gcalAccount.isConnected ? 'Google Calendar disconnected' : 'Google Calendar reconnected'
                    );
                  }}
                  className="text-xs text-rose-600 font-semibold hover:underline"
                >
                  {gcalAccount.isConnected ? 'Disconnect Account' : 'Connect Account'}
                </button>
                <button
                  onClick={() => setIsGCalModalOpen(false)}
                  className={`px-4 py-2 text-xs font-semibold ${activeTheme.primary} ${activeTheme.radius}`}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPostgresModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-2xl ${activeTheme.card} ${activeTheme.radius} p-6 border shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-600" />
                <h2 className="text-base font-bold">PostgreSQL Schema & Next.js Setup</h2>
              </div>
              <button
                onClick={() => setIsPostgresModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Use this Prisma schema for your Next.js + PostgreSQL backend database:
            </p>

            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto relative group">
              <pre>{`// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  REVIEW
  DONE
}

model Task {
  id            String     @id @default(cuid())
  title         String
  description   String?
  status        TaskStatus @default(TODO)
  priority      Priority   @default(MEDIUM)
  category      String     @default("Engineering")
  deadline      DateTime?
  gcalSynced    Boolean    @default(false)
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
}`}</pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsPostgresModalOpen(false)}
                className={`px-4 py-2 text-xs font-semibold ${activeTheme.primary} ${activeTheme.radius}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}