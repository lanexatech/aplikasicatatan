
import React from 'react';
import { type Note } from '../types';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import { NOTE_BG_LIGHT, NOTE_BG_DARK } from '../constants';

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const bgColorLight = NOTE_BG_LIGHT[note.color] || 'bg-note-yellow';
  const bgColorDark = NOTE_BG_DARK[note.color] || 'dark:bg-yellow-900/50';

  const formattedDate = new Date(note.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={`
      ${bgColorLight} ${bgColorDark}
      rounded-xl shadow-md hover:shadow-xl transition-all duration-300
      flex flex-col h-full p-5 text-gray-800 dark:text-gray-200
    `}>
      <div className="flex-grow">
        <h3 className="text-xl font-bold mb-2 break-words">{note.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{note.content}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-300/50 dark:border-gray-600/50 flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
        <div className="flex space-x-2">
          <button onClick={onEdit} className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Ubah Catatan">
            <PencilIcon />
          </button>
          <button onClick={onDelete} className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Hapus Catatan">
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
