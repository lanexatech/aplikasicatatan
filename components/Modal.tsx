
import React, { useState } from 'react';

interface Server {
  id: string;
  name: string;
  config: string;
}

interface ModalProps {
  category: string;
  title: string;
  servers: Server[];
  authorName: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  category,
  title,
  servers,
  authorName,
  onClose,
}) => {
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: string }>({});

  const handleCopy = (textToCopy: string, serverId: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyStatus(prev => ({ ...prev, [serverId]: 'Tersalin!' }));
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [serverId]: 'Salin' }));
      }, 2000);
    }, (err) => {
      console.error('Gagal menyalin teks: ', err);
      setCopyStatus(prev => ({ ...prev, [serverId]: 'Gagal' }));
       setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [serverId]: 'Salin' }));
      }, 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full transform transition-transform duration-300 scale-95 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modal-enter 0.3s forwards' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="flex-shrink-0">
           <p className="text-blue-500 font-semibold text-sm tracking-wide uppercase mb-2">
              {category}
           </p>
           <h2 className="font-bold text-3xl text-gray-800 mb-4 leading-tight">
              {title}
           </h2>
        </div>
        <div className="flex-grow overflow-y-auto pr-2 space-y-6">
           {servers.map((server) => (
             <div key={server.id} className="space-y-3">
                <h3 className="font-semibold text-lg text-gray-700">{server.name}</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-700 text-sm break-all font-mono select-all">
                    {server.config}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(server.config, server.id)}
                  className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out"
                >
                  {copyStatus[server.id] || 'Salin'}
                </button>
             </div>
            ))}
        </div>
        <div className="flex-shrink-0 mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm">
            <p className="text-gray-900 font-semibold leading-none">{authorName}</p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        /* Custom scrollbar for webkit browsers */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export { Modal };
