import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-silence">
        <p className="text-[13px] uppercase tracking-[0.18em] text-text-soft">
          Checking access…
        </p>
      </div>
    );
  }
  if (!session || !isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname, expired: !session ? false : true }}
      />
    );
  }
  return <>{children}</>;
}
