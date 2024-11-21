import { File, FilePlus, Home } from 'lucide-react';
import DashboardLayout from '../(dashboard)/dashboard-layout';
import { NavItemType } from '../(dashboard)/nav-item-type';

const menuList: NavItemType[] = [
  {
    tooltip: 'Home',
    href: '/student/dashboard',
    icon: Home,
  },
  {
    tooltip: 'Daftar IRS',
    href: '/student/irs',
    icon: File,
  },
  {
    tooltip: 'Tambah IRS',
    href: '/student/add-irs',
    icon: FilePlus,
  },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout menuList={menuList}>{children}</DashboardLayout>;
}
