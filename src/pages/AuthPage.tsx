import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { authClient } from '../lib/auth';
import { DEMO_MODE } from '../lib/api';

export function AuthPage() {
  const resetToken = new URLSearchParams(window.location.search).get('token');
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot' | 'reset'>(
    resetToken ? 'reset' : 'signup'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage('');
    if (mode === 'forgot') {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/auth?mode=reset`
      });
      setMessage(result.error?.message ?? 'If the account exists, a reset link is on its way.');
      return;
    }
    if (mode === 'reset') {
      const result = await authClient.resetPassword({ newPassword: password, token: resetToken ?? '' });
      if (result.error) setMessage(result.error.message ?? 'Password reset failed.');
      else {
        setMessage('Password changed. You can now sign in.');
        setMode('signin');
      }
      return;
    }
    const result = mode === 'signup'
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });
    if (result.error) setMessage(result.error.message ?? 'Authentication failed.');
    else if (mode === 'signup') setMessage('Check your inbox to verify your email.');
    else navigate('/dashboard');
  }

  return (
    <main className="auth-page">
      <section className="auth-aside">
        <Brand />
        <div>
          <span className="kicker">SAFER BY DEFAULT</span>
          <h1>Build community features with operational context from day one.</h1>
          <p>Identity, access changes, reports and relevant history stay connected.</p>
        </div>
        <small>SafeFun Preview · Funventure</small>
      </section>
      <section className="auth-form-wrap">
        <Link className="back-link" to="/"><ArrowLeft size={16} /> Back to overview</Link>
        <form className="auth-form" onSubmit={submit}>
          <span className="kicker">PARTNER CONSOLE</span>
          <h2>{mode === 'signup' ? 'Create your workspace' : mode === 'forgot' ? 'Reset your password' : mode === 'reset' ? 'Choose a new password' : 'Welcome back'}</h2>
          <p>{mode === 'signup' ? 'Start with a product and a live Chat Tester.' : mode === 'forgot' ? 'We will email a single-use reset link.' : mode === 'reset' ? 'Use at least 10 characters.' : 'Sign in to manage your SafeFun products.'}</p>
          {mode === 'signup' && (
            <label>
              Your name
              <span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Ada Lovelace" /></span>
            </label>
          )}
          {mode !== 'reset' && <label>
            Work email
            <span><Mail size={16} /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@studio.com" /></span>
          </label>}
          {mode !== 'forgot' && <label>
            Password
            <span><LockKeyhole size={16} /><input required minLength={10} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 10 characters" /></span>
          </label>}
          {message && <div className="form-message">{message}</div>}
          <button className="button primary full" type="submit">
            {mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Send reset link' : mode === 'reset' ? 'Change password' : 'Sign in'} <ArrowRight size={16} />
          </button>
          {DEMO_MODE && (
            <button className="button secondary full" type="button" onClick={() => navigate('/dashboard')}>
              Continue in local demo
            </button>
          )}
          {mode === 'signin' && <button className="text-button" type="button" onClick={() => setMode('forgot')}>Forgot your password?</button>}
          <button className="text-button" type="button" onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>
            {mode === 'signup' ? 'Already have an account? Sign in' : 'New to SafeFun? Create an account'}
          </button>
        </form>
      </section>
    </main>
  );
}
