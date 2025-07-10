import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <div
          className={`sidebar-toggle-btn ${sidebarOpen ? 'on-sidebar' : 'on-screen'}`}
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <FaTimes className='toggle1' /> : <FaBars />}
        </div>

        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`content ${sidebarOpen ? 'open' : 'collapsed'}`}>
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
