import React, { useState, useEffect, useCallback } from 'react';
import { Note } from './types';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import Login from './components/Login';
import Modal from './components/Modal';
import Description from './components/Description';

const NOTES_STORAGE_KEY = 'notes-app-data'; // Kunci statis untuk semua pengguna

type View = 'description' | 'login' | 'app';

const App: React.FC = () => {
  const [view, setView] = useState<View>('description');
  const [userName, setUserName] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);

  const isAdmin = userName === 'larenva';
  
  // Effect untuk memeriksa pengguna yang login dan menentukan tampilan awal
  useEffect(() => {
    const savedUser = localStorage.getItem('notes-app-user');
    if (savedUser) {
      setUserName(savedUser);
      setView('app'); // Langsung ke aplikasi jika sudah login
    }
    // Jika tidak, state default 'description' akan digunakan
  }, []);

  // Effect untuk memuat catatan dari localStorage saat aplikasi dimulai
  useEffect(() => {
    try {
      const savedNotesRaw = localStorage.getItem(NOTES_STORAGE_KEY);
      if (savedNotesRaw) {
        const savedNotes: Note[] = JSON.parse(savedNotesRaw);
        // Migrasi data: Tetapkan 'larenva' sebagai pembuat catatan lama yang tidak memiliki pemilik
        const migratedNotes = savedNotes.map(note => ({
          ...note,
          createdBy: note.createdBy || 'larenva' 
        }));
        setNotes(migratedNotes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Could not load notes from localStorage", error);
      setNotes([]);
    }
  }, []);

  // Effect untuk menyimpan catatan setiap kali berubah
  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error("Could not save notes to localStorage", error);
    }
  }, [notes]);

  // Effect untuk membatalkan pilihan catatan jika dihapus
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
    setView('login'); // Kembali ke halaman login setelah keluar
  };

  const handleNewNote = useCallback(() => {
    if (!userName) return; // Seharusnya tidak terjadi karena UI disembunyikan
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Catatan Baru',
      content: '',
      lastModified: Date.now(),
      createdBy: userName,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
  }, [userName]);

  const handleUpdateNote = useCallback((id: string, title: string, content: string) => {
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