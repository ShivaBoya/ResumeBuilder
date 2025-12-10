import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

export const SortableItem = ({ id, label, icon: Icon, isActive, onClick, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-sm border border-transparent hover:border-gray-200'}`}
            onClick={onClick}
        >
            <div
                {...attributes}
                {...listeners}
                className={`cursor-grab active:cursor-grabbing p-1 rounded hover:bg-black/10 ${isActive ? 'text-white' : 'text-gray-400'}`}
            >
                <GripVertical size={16} />
            </div>

            {Icon && <Icon size={16} className={isActive ? 'text-blue-200' : 'text-blue-500'} />}

            <span className="flex-1 text-sm font-medium select-none truncate">
                {label}
            </span>

            {/* Prevent deletion of mandatory sections if needed, or allow all */}
            {onDelete && (
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                    className={`p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'hover:bg-blue-700 text-blue-200' : 'hover:bg-gray-100 text-red-400'}`}
                >
                    <Trash2 size={14} />
                </button>
            )}
        </div>
    );
};
