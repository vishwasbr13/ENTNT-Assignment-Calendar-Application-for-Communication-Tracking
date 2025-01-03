import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Tabs } from './components/navigation/Tabs';
import { AdminPanel } from './components/admin/AdminPanel';
import { DashboardView } from './components/dashboard/DashboardView';
import { CalendarView } from './components/calendar/CalendarView';
import { Building2, Calendar, LayoutDashboard } from 'lucide-react';
import { useStore } from './store/useStore';

const tabs = [
  { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { id: 'calendar', name: 'Calendar', icon: <Calendar className="h-5 w-5" /> },
  { id: 'admin', name: 'Admin', icon: <Building2 className="h-5 w-5" /> },
];

function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const isDarkMode = useStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'admin':
        return <AdminPanel />;
      case 'dashboard':
        return <DashboardView />;
      case 'calendar':
        return <CalendarView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">{renderContent()}</div>
      </main>
    </div>
  );
}

export default App;