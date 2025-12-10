import React from 'react';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';

const getIcon = (name) => {
    const Icon = Icons[name] || Icons.FileText;
    return <Icon size={24} className="mb-2 text-blue-500 group-hover:text-blue-600 dark:text-blue-400" />;
};

const AddContentModal = ({ isOpen, onClose, availableSections, onAdd, usedSectionIds }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scaleIn">

                {/* Header */}
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-900">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Add Content</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Choose sections to add to your resume</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Grid */}
                <div className="p-8 overflow-y-auto bg-slate-50/50 dark:bg-slate-800">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {availableSections.map((section) => {
                            const isAdded = usedSectionIds.includes(section.id) && !section.repeatable;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        if (!isAdded) {
                                            onAdd(section.id);
                                            onClose();
                                        }
                                    }}
                                    disabled={isAdded}
                                    className={`
                                        flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200
                                        ${isAdded
                                            ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700'
                                            : 'border-white bg-white hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer dark:bg-slate-700 dark:border-slate-600 dark:hover:border-blue-400'
                                        }
                                    `}
                                >
                                    {getIcon(section.icon)}
                                    <span className={`font-bold text-sm ${isAdded ? 'text-gray-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                        {section.label}
                                    </span>
                                    {isAdded && <span className="text-[10px] uppercase font-bold text-emerald-500 mt-2">Added</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-center text-xs text-gray-400">
                    Customize your resume with these modular sections
                </div>
            </div>
        </div>
    );
};

export default AddContentModal;
