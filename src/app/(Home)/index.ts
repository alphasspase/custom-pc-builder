import { URLS } from '@/utils/urls';

interface RouteProps {
  href: string;
  label: string;
}
export const routeList: RouteProps[] = [
  { label: 'Home', href: URLS.home },
  { label: 'Computer', href: URLS.computer },
  { label: 'Build', href: URLS.build },
  { label: 'Component', href: URLS.component },
  { label: 'Support', href: URLS.support },
];
