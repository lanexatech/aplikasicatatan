import React, { useState, useEffect, useCallback } from 'react';
import { Note } from './types';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import Login from './components/Login';
import Modal from './components/Modal';
import Description from './components/Description';

type View = 'description' | 'login' | 'app';

// Data catatan awal sebagai simulasi database bersama.
// Dalam aplikasi nyata, data ini akan diambil dari server.
const initialNotes: Note[] = [];


const App: React.FC = () => {
  const [view, setView] = useState<View>('description');
  const [userName, setUserName] = useState<string | null>(null);
  // State notes sekarang diinisialisasi dengan data bersama, bukan dari localStorage.
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);

  const isAdmin = userName === 'larenva';
  
  // Effect untuk memeriksa pengguna yang login dari localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('notes-app-user');
    if (savedUser) {
      setUserName(savedUser);
      setView('app');
    }
  }, []);
  
  // Effect untuk membatalkan pilihan catatan jika catatan aktif dihapus
  useEffect(() => {
    if (activeNoteId && !notes.find(note => note.id === activeNoteId)) {
        setActiveNoteId(null);
    }
  }, [notes, activeNoteId]);
  
  const handleContinueFromDescription = () => {
    setView('login');
  };

  const handleLogin = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName) {
      localStorage.setItem('notes-app-user', trimmedName);
      setUserName(trimmedName);
      setView('app');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('notes-app-user');
    setUserName(null);
    setActiveNoteId(null);
    setView('login');
  };

  const handleNewNote = useCallback(() => {
    if (!userName) return;
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Catatan Baru',
      content: '',
      lastModified: Date.now(),
      createdBy: userName,
    };
    // Menambahkan catatan baru ke state di memori
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
  }, [userName]);

  const handleUpdateNote = useCallback((id: string, title: string, content: string) => {
    // Memperbarui catatan di state memori
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, title, content, lastModified: Date.now() } : note
      )
    );
  }, []);

  const handleDeleteRequest = (id: string) => {
    setNoteToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (noteToDeleteId) {
      // Menghapus catatan dari state memori
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteToDeleteId));
      setNoteToDeleteId(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setNoteToDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  const activeNote = notes.find((note) => note.id === activeNoteId) || null;
  // Catatan dapat diedit jika pengguna adalah admin ATAU pembuat catatan
  const isNoteEditable = activeNote ? (isAdmin || activeNote.createdBy === userName) : false;

  if (view === 'description') {
    return <Description onContinue={handleContinueFromDescription} />;
  }

  if (view === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header userName={userName!} onLogout={handleLogout} />
      <main className="flex flex-1 overflow-hidden">
        {/* Kontainer Daftar Catatan: disembunyikan di seluler saat catatan aktif */}
        <div className={`
          ${activeNoteId ? 'hidden' : 'flex'} w-full sm:flex sm:w-80
        `}>
          <NoteList
            notes={notes}
            activeNoteId={activeNoteId}
            onSelectNote={setActiveNoteId}
            onNewNote={handleNewNote}
            isAdmin={isAdmin}
            onDeleteNote={handleDeleteRequest}
          />
        </div>

        {/* Kontainer Editor Catatan: ditampilkan di seluler hanya saat catatan aktif */}
        <div className={`
          ${activeNote ? 'flex' : 'hidden'} w-full sm:flex sm:flex-1
        `}>
          {activeNote ? (
            <NoteEditor 
                activeNote={activeNote} 
                onUpdateNote={handleUpdateNote}
                onBack={() => setActiveNoteId(null)}
                isEditable={isNoteEditable}
            />
          ) : (
             <div className="flex-1 flex-col items-center justify-center bg-white text-slate-500 p-8 hidden sm:flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 mb-4"><path d="M2 6s.5-1 2-1h16c1.5 0 2 1 2 1v12c0 1.5-1.5 2-2 2H4c-1.5 0-2-.5-2-2Z"/><path d="M2 6h20"/><path d="M12 6v14"/></svg>
                <h2 className="text-xl font-semibold">Pilih catatan untuk dilihat</h2>
                <p>Atau buat catatan baru untuk memulai.</p>
              </div>
          )}
        </div>
      </main>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Hapus Catatan"
      >
        Apakah Anda yakin ingin menghapus catatan ini secara permanen? Tindakan ini tidak dapat diurungkan.
      </Modal>
    </div>
  );
};

export default App;