interface RouteProps {
  href: string;
  label: string;
}
export const routeList: RouteProps[] = [
  { label: 'Home', href: '/' },
  { label: 'Computer', href: '/computer' },
  { label: 'Build', href: '/build' },
  { label: 'Component', href: '/component' },
  { label: 'Support', href: '/support' },
];
