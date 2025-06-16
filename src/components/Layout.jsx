import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="content">{children}</main>
      </div>
    </>
  );
}

export default Layout;
