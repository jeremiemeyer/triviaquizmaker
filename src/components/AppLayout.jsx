import { Outlet } from 'react-router-dom';
import Navbar from '@/components/shared/Navbar';

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="mt-[60px] w-full">
        <Outlet />
      </div>
    </>
  );
}
