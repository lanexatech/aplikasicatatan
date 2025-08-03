import React from 'react';

interface CardProps {
  category: string;
  title: string;
  description: string;
  authorName: string;
  isComingSoon?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  category,
  title,
  description,
  authorName,
  isComingSoon,
  onClick,
}) => {
  // Card is no longer interactive, only the button is.
  // Removed hover effects and cursor changes from the main div.
  const cardClasses = `
    max-w-sm w-full rounded-2xl overflow-hidden shadow-xl bg-white flex flex-col
    ${isComingSoon ? 'opacity-60' : ''}
  `;

  return (
    <div className={cardClasses.trim()}>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-2">
           <p className="text-blue-500 font-semibold text-xs tracking-wide uppercase">
            {category}
          </p>
           {isComingSoon && (
            <span className="bg-red-500 text-white text-sm font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
              SEGERA HADIR
            </span>
          )}
        </div>
        <h2 className="font-bold text-2xl text-gray-800 leading-tight mb-3">
          {title}
        </h2>
        <p className="text-gray-600 text-base flex-grow">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-6 border-t border-gray-100 mt-auto">
        <div className="text-sm mb-4">
          <p className="text-gray-900 font-semibold leading-none">{authorName}</p>
        </div>
        <button
          onClick={onClick}
          disabled={isComingSoon}
          className={`
            w-full text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out
            ${isComingSoon 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
            }
          `}
          aria-label={isComingSoon ? `${title} (Segera Hadir)` : `Baca selengkapnya tentang ${title}`}
        >
          Baca selengkapnya
        </button>
      </div>
    </div>
  );
};

export { Card };
