import React, { useState } from 'react';

interface LoginProps {
  onLogin: (name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Selamat Datang!
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Silakan masukkan nama Anda untuk melanjutkan.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Nama
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                autoFocus
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-slate-500">
        Copyright@2025 Aplikasi Catatan | LANEXA
      </footer>
    </div>
  );
};

export default Login;