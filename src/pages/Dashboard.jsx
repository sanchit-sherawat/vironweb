import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Welcome to Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
