import { Link, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-silence text-text">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/admin/blog" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Elara Glow Studio logo"
              className="h-[32px] w-auto object-contain"
            />
            <span className="text-[11px] tracking-[0.22em]">
              ELARA · STUDIO MANAGER
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-[12px]" aria-label="Admin">
            <Link to="/" className="underline underline-offset-4 hover:opacity-60">
              View site
            </Link>
            <Link
              to="/admin/blog"
              className="underline underline-offset-4 hover:opacity-60"
            >
              Posts
            </Link>
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex h-[36px] items-center rounded-full border border-text px-4 text-[11px] uppercase tracking-[0.14em] transition hover:bg-text hover:text-white"
              >
                Sign out
              </button>
            ) : null}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-10">
        {children}
      </main>
    </div>
  );
}
