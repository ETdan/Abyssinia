import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Outlet />
    </div>
  );
}

export default Layout;

