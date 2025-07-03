import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // ✅ Import icons
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        {/* ✅ Toggle button outside Sidebar for better control */}
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
