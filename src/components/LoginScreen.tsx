import React, { useState } from 'react';
import { Send, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onSuccess: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('khikmatulloturaev@gmail.com');
  const [password, setPassword] = useState('h123456A!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      onSuccess(email);
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0a0e14] px-4 overflow-hidden select-none">
      {/* Background radial blurs matching Avenir OS exactly */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-600/15 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Titles */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-500/30">
            <span className="text-2xl font-black text-white">A</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">Avenir OS</h1>
          <p className="mt-1 text-sm text-slate-400">Войдите в систему управления агентством</p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-[#161b22] px-8 py-8 shadow-2xl backdrop-blur-xl"
        >
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ceo@company.uz"
                required
                className="h-11 w-full rounded-xl border border-[#30363d] bg-white/5 px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-11 w-full rounded-xl border border-[#30363d] bg-white/5 pl-4 pr-11 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-medium text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Войти в систему</span>
                  <span className="text-base">→</span>
                </>
              )}
            </button>

            <div className="text-center">
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition">
                Забыли пароль?
              </a>
            </div>

            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative bg-[#161b22] px-3 text-[11px] uppercase tracking-wider text-slate-500">
                или
              </span>
            </div>

            {/* Telegram Login Button */}
            <button
              type="button"
              onClick={() => onSuccess('telegram_user@avenir.uz')}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#21262d] font-medium text-white transition hover:bg-[#30363d] active:scale-[0.99]"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-semibold">Войти через Telegram</span>
            </button>
          </div>
        </form>

        {/* Footer info matching screenshot */}
        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-500">
          <span>Avenir OS v1.0.2</span>
          <span className="text-slate-700">|</span>
          <a href="#" className="hover:text-slate-400 transition">Конфиденциальность</a>
          <a href="#" className="hover:text-slate-400 transition">Условия</a>
          <a href="#" className="hover:text-slate-400 transition">Удаление данных</a>
        </div>
      </div>
    </div>
  );
};
