import React from 'react';

interface DescriptionProps {
  onContinue: () => void;
}

const Description: React.FC<DescriptionProps> = ({ onContinue }) => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-100 p-4 font-sans">
      <div className="w-full max-w-2xl p-8 sm:p-10 bg-white rounded-xl shadow-lg text-center">
        <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
                <path d="M15 3v6h6" />
                <path d="m10 15-1.5 1.5" />
                <path d="m14 11-1.5 1.5" />
                <path d="M8 13h1" />
                <path d="M12 17h1" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Selamat Datang di Catatan Cerdas
        </h1>
        <p className="text-slate-600 text-lg mb-12 leading-relaxed">
            Aplikasi pencatatan modern untuk menyimpan ide, tugas, dan inspirasi Anda.
            Didesain untuk kecepatan, privasi, dan kemudahan penggunaan.
        </p>

        <button
          onClick={onContinue}
          className="w-full sm:w-auto group relative inline-flex justify-center py-3 px-8 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Lanjutkan
        </button>
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-slate-500">
        Copyright@2025 Aplikasi Catatan | LANEXA
      </footer>
    </div>
  );
};

export default Description;
