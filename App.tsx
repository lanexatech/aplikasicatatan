
import React, { useState, useEffect } from 'react';
import { type Note } from './types';
import { NOTE_COLORS } from './constants';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import NoteFormModal from './components/NoteFormModal';
import PlusIcon from './components/icons/PlusIcon';

const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        try {
            const savedNotes = localStorage.getItem('notes-app-data');
            return savedNotes ? JSON.parse(savedNotes) : [];
        } catch (error) {
            console.error("Could not parse saved notes:", error);
            return [];
        }
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    useEffect(() => {
        try {
            localStorage.setItem('notes-app-data', JSON.stringify(notes));
        } catch (error) {
            console.error("Could not save notes:", error);
        }
    }, [notes]);

    const handleAddNoteClick = () => {
        setEditingNote(null);
        setIsModalOpen(true);
    };

    const handleEditNoteClick = (note: Note) => {
        setEditingNote(note);
        setIsModalOpen(true);
    };

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleSaveNote = (noteData: { title: string; content: string; color: string }) => {
        if (editingNote) {
            setNotes(notes.map(note => note.id === editingNote.id ? { ...editingNote, ...noteData } : note));
        } else {
            const newNote: Note = {
                id: `note-${Date.now()}`,
                ...noteData,
                createdAt: new Date().toISOString(),
            };
            setNotes([newNote, ...notes]);
        }
        setIsModalOpen(false);
        setEditingNote(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            <Header />
            <main className="p-4 sm:p-6 md:p-8">
                {notes.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-gray-500 dark:text-gray-400">Tidak ada catatan</h2>
                        <p className="mt-2 text-gray-400 dark:text-gray-500">Klik tombol '+' untuk menambahkan catatan baru.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {notes.map(note => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onEdit={() => handleEditNoteClick(note)}
                                onDelete={() => handleDeleteNote(note.id)}
                            />
                        ))}
                    </div>
                )}
            </main>

            <button
                onClick={handleAddNoteClick}
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-transform transform hover:scale-110"
                aria-label="Tambah Catatan Baru"
            >
                <PlusIcon />
            </button>

            {isModalOpen && (
                <NoteFormModal
                    note={editingNote}
                    onSave={handleSaveNote}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default App;
