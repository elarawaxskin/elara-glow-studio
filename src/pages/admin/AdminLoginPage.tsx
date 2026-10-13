import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export function AdminLoginPage() {
  const { signIn, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const from =
    (location.state as { from?: string } | null)?.from ?? '/admin/blog';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!email.trim() || !password) {
      setFormError('Please enter your email and password.');
      return;
    }
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setFormError(error);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-silence px-6 py-12 text-text">
      <div className="w-full max-w-[420px] rounded-[24px] border border-line bg-surface p-8 shadow-[0_12px_36px_rgba(54,61,50,0.10)]">
        <img
          src="/logo.png"
          alt="Elara Glow Studio logo"
          className="h-[36px] w-auto object-contain"
        />
        <p className="mt-6 text-[11px] uppercase tracking-[0.22em]">
          Studio manager
        </p>
        <h1 className="mt-3 font-display text-[36px] leading-[1]">
          Welcome back.
        </h1>
        <p className="mt-3 text-[13px] leading-[1.7] text-text-soft">
          Sign in to manage your journal. This area is private to Elara Glow
          Studio.
        </p>

        {!isSupabaseConfigured() ? (
          <p
            role="alert"
            className="mt-6 rounded-[12px] border border-line bg-icicle/60 p-4 text-[13px]"
          >
            Blog storage isn&apos;t connected yet. Add{' '}
            <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file.
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="text-[12px] uppercase tracking-[0.14em]">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-[48px] w-full rounded-[12px] border border-line bg-white/70 px-4 text-[14px] outline-none focus:border-posy"
              placeholder="you@elaraglowstudio.com"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-[12px] uppercase tracking-[0.14em]">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-[48px] w-full rounded-[12px] border border-line bg-white/70 px-4 text-[14px] outline-none focus:border-posy"
              placeholder="••••••••"
            />
          </div>
          {formError ?? authError ? (
            <p role="alert" className="text-[13px] text-[#8a3b2e]">
              {formError ?? authError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-[48px] w-full items-center justify-center rounded-full bg-posy px-8 text-[12px] uppercase tracking-[0.14em] text-white transition hover:bg-[#2b4e46] disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <Link
          to="/"
          className="mt-6 inline-block text-[12px] underline underline-offset-4 hover:opacity-60"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
