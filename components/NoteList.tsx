import React from 'react';
import { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onNewNote: () => void;
  isAdmin: boolean;
  onDeleteNote: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, activeNoteId, onSelectNote, onNewNote, isAdmin, onDeleteNote }) => {
  const sortedNotes = [...notes].sort((a, b) => b.lastModified - a.lastModified);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Mencegah pemilihan catatan saat mengklik tombol hapus
    onDeleteNote(id);
  };

  return (
    <div className="w-full h-full bg-slate-100 border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-700">Semua Catatan</h2>
        <button
          onClick={onNewNote}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Baru
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {sortedNotes.length > 0 ? (
          <ul>
            {sortedNotes.map((note) => (
              <li key={note.id}>
                <div
                  onClick={() => onSelectNote(note.id)}
                  className={`group flex justify-between items-start p-4 cursor-pointer border-b border-slate-200 transition-colors ${
                    activeNoteId === note.id ? 'bg-indigo-100' : 'hover:bg-slate-200'
                  }`}
                >
                  <div className="flex-grow overflow-hidden pr-2">
                    <h3 className="font-semibold text-slate-800 truncate">
                      {note.title || 'Catatan Tanpa Judul'}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {note.content || 'Tidak ada konten'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(note.lastModified).toLocaleString('id-ID')}
                    </p>
                  </div>
                   {isAdmin && (
                    <button
                      onClick={(e) => handleDeleteClick(e, note.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-200 text-red-600 flex-shrink-0"
                      aria-label="Hapus catatan"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-slate-500">
            <p>Belum ada catatan.</p>
            <p>Klik "Baru" untuk memulai.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;