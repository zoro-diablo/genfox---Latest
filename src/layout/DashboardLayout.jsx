import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar';
import TopNavbar from '@/components/navbar/TopNavbar';
import SpringModal from '../components/avatar/SpringModal';

function DashboardLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className='flex min-h-screen w-full flex-col sm:flex-row bg-muted/40'>
      <Sidebar />
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14 dark:bg-[#151518] flex-1 min-h-screen'>
        <TopNavbar />
        <main className='flex-1 p-4 sm:px-6 sm:py-0 dark:bg-[#151518] overflow-hidden'>
          <div className='overflow-y-auto h-full'>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Modal Component */}
      <SpringModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}

export default DashboardLayout;
