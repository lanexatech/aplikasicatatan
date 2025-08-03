
import React, { useState, useEffect, useRef } from 'react';
import { type Note } from '../types';
import { NOTE_COLORS, NOTE_BG_LIGHT, NOTE_BG_DARK } from '../constants';
import XIcon from './icons/XIcon';

interface NoteFormModalProps {
  note: Note | null;
  onSave: (noteData: { title: string; content: string; color: string }) => void;
  onClose: () => void;
}

const NoteFormModal: React.FC<NoteFormModalProps> = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [color, setColor] = useState(note?.color || NOTE_COLORS[0]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({ title, content, color });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-auto"
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {note ? 'Ubah Catatan' : 'Catatan Baru'}
                </h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Tutup"
                >
                    <XIcon />
                </button>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg text-lg font-semibold focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Tulis sesuatu..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                    {NOTE_COLORS.map(c => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            className={`w-8 h-8 rounded-full ${NOTE_BG_LIGHT[c]} ${NOTE_BG_DARK[c]} border-2 transition-transform transform hover:scale-110 ${color === c ? 'border-blue-500' : 'border-transparent'}`}
                            aria-label={`Pilih warna ${c}`}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors"
                >
                    Simpan
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteFormModal;
