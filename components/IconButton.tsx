
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  text?: string;
  tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, text, tooltip, className, ...props }) => {
  const baseClasses =
    'flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

  const buttonContent = (
     <button className={`${baseClasses} ${className}`} {...props}>
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );

  if (tooltip) {
    return (
        <div className="relative group">
            {buttonContent}
            <div className="absolute bottom-full mb-2 w-max bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {tooltip}
            </div>
        </div>
    );
  }

  return buttonContent;
};

export default IconButton;
