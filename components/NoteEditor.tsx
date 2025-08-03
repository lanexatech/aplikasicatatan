import React, { useState, useEffect, useCallback } from 'react';
import { Note } from '../types';

interface NoteEditorProps {
  activeNote: Note;
  onUpdateNote: (id: string, title: string, content: string) => void;
  onBack: () => void;
  isEditable: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ activeNote, onUpdateNote, onBack, isEditable }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Efek untuk memuat data catatan saat activeNote berubah
  useEffect(() => {
    setTitle(activeNote.title);
    setContent(activeNote.content);
    setLastSaved(new Date(activeNote.lastModified));
    setIsDirty(false); // Atur ulang flag dirty saat catatan baru dimuat atau disimpan
  }, [activeNote]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsDirty(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsDirty(true);
  };

  const handleSave = useCallback(() => {
    if (activeNote && isDirty && isEditable) {
      onUpdateNote(activeNote.id, title, content);
      // isDirty akan diatur ke false oleh useEffect saat prop activeNote diperbarui.
    }
  }, [activeNote, isDirty, title, content, onUpdateNote, isEditable]);

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onBack}
              className="sm:hidden p-2 rounded-md hover:bg-slate-100 flex-shrink-0"
              aria-label="Kembali ke daftar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            </button>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder={isEditable ? "Judul Catatan" : "Judul (Hanya-baca)"}
              className="w-full text-xl sm:text-2xl font-bold p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md transition disabled:bg-slate-50 disabled:text-slate-500"
              readOnly={!isEditable}
            />
            {isEditable && (
              <button
                  onClick={handleSave}
                  disabled={!isDirty}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed flex-shrink-0 font-medium"
                  aria-label="Simpan Catatan"
              >
                  Simpan
              </button>
            )}
        </div>
        <div className="text-xs text-slate-400 mt-2 ml-2 sm:ml-16 h-4">
            {isEditable ? (
              <>
                {isDirty ? (
                    <span className="text-amber-600 font-semibold">Perubahan belum disimpan</span>
                ) : lastSaved ? (
                    `Tersimpan pada ${lastSaved.toLocaleTimeString('id-ID')}`
                ) : (
                    'Belum disimpan'
                )}
              </>
            ) : (
                <span className="font-semibold text-slate-500">Dibuat oleh "{activeNote.createdBy === 'larenva' ? 'lanexa' : activeNote.createdBy}". Hanya-baca.</span>
            )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={isEditable ? "Mulai menulis..." : "Konten ini hanya dapat dibaca."}
          className="w-full h-full p-4 sm:p-6 text-base text-slate-700 resize-none focus:outline-none leading-relaxed disabled:bg-white"
          readOnly={!isEditable}
        />
      </div>
    </div>
  );
};

export default NoteEditor;