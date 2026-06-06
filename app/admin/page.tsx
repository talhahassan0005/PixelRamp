import { redirect } from 'next/navigation';

// /admin has no UI of its own — send visitors to the dashboard, which
// redirects to /auth when no admin session is present in localStorage.
export default function AdminIndex() {
  redirect('/admin/dashboard');
}
