import React from 'react';

interface HeaderProps {
    userName: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="flex items-center p-4 bg-white border-b border-slate-200 shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
        <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
        <path d="M15 3v6h6" />
        <path d="m10 15-1.5 1.5" />
        <path d="m14 11-1.5 1.5" />
        <path d="M8 13h1" />
        <path d="M12 17h1" />
      </svg>
      <h1 className="text-xl font-bold text-slate-800 ml-3 flex-grow">
        Catatan Cerdas
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600 hidden sm:block">
            Halo, <span className="font-semibold">{userName}</span>
        </span>
        <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded-md shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Keluar
        </button>
      </div>
    </header>
  );
};

export default Header;