import React, { useState } from 'react';
import { Plus, X, Calendar, Link as LinkIcon, List } from 'lucide-react';

const FormField = ({ field, value, onChange }) => {

    // safe value handling
    const safeValue = value || "";

    // --- SPECIALIZED SUB-COMPONENTS ---

    // 1. Bullet List Builder (for Responsibilities)
    const BulletListInput = () => {
        // Ensure value is an array, else try to split string or default empty
        const list = Array.isArray(value) ? value : (typeof value === 'string' && value ? value.split('\n') : []);

        const updateList = (newList) => onChange(newList);

        const addBullet = () => {
            updateList([...list, ""]);
        };

        const changeBullet = (idx, txt) => {
            const copy = [...list];
            copy[idx] = txt;
            updateList(copy);
        };

        const removeBullet = (idx) => {
            const copy = [...list];
            copy.splice(idx, 1);
            updateList(copy);
        };

        return (
            <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide flex items-center gap-1">
                    <List size={12} /> {field.label}
                </label>
                <div className="space-y-2">
                    {list.map((bullet, i) => (
                        <div key={i} className="flex gap-2 items-start">
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                            <textarea
                                className="flex-1 p-2 text-sm border rounded bg-white dark:bg-slate-800 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                rows={3}
                                value={bullet}
                                onChange={(e) => changeBullet(i, e.target.value)}
                                placeholder="Add detail..."
                            />
                            <button onClick={() => removeBullet(i)} className="p-2 text-gray-400 hover:text-red-500">
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                    <button onClick={addBullet} className="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1 mt-1 pl-2">
                        <Plus size={12} /> Add Bullet Point
                    </button>
                </div>
            </div>
        );
    };

    // 2. Tag List Input (for Skills/Technologies)
    const TagListInput = () => {
        // Value stored as array of strings
        const tags = Array.isArray(value) ? value : (typeof value === 'string' && value ? value.split(',') : []);
        const [input, setInput] = useState("");

        const addTag = (e) => {
            if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
                e.preventDefault();
                confirmTag();
            }
        };

        const confirmTag = () => {
            if (input.trim()) {
                const newTag = input.trim().replace(/,/g, '');
                if (!tags.includes(newTag)) {
                    onChange([...tags, newTag]);
                }
                setInput("");
            }
        }

        const removeTag = (tagToRemove) => {
            onChange(tags.filter(t => t !== tagToRemove));
        };

        return (
            <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide">{field.label}</label>
                <div className="p-2 border rounded bg-white dark:bg-slate-800 dark:border-slate-600 focus-within:ring-2 focus-within:ring-blue-500 flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="hover:text-blue-900"><X size={12} /></button>
                        </span>
                    ))}
                    <input
                        type="text"
                        className="flex-1 min-w-[100px] outline-none bg-transparent text-sm"
                        placeholder={field.placeholder || "Type & press Enter..."}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={addTag}
                        onBlur={confirmTag} // Auto-confirm on click away
                    />
                </div>
            </div>
        );
    };


    // --- STANDARD INPUTS ---

    const baseClasses = "w-full p-2.5 border rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-gray-200 transition-all shadow-sm";
    const labelClasses = "block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide";

    if (field.type === 'bullet-list') return <BulletListInput />;
    if (field.type === 'tag-list') return <TagListInput />;

    if (field.type === 'textarea') {
        return (
            <div className="mb-4">
                <label className={labelClasses}>{field.label}</label>
                <textarea
                    className={baseClasses}
                    rows={4}
                    value={safeValue}
                    onChange={e => onChange(e.target.value)}
                    placeholder={field.placeholder}
                    maxLength={field.maxLength}
                />
                {field.maxLength && <div className="text-[10px] text-right text-gray-400 mt-1">{safeValue.length}/{field.maxLength}</div>}
            </div>
        );
    }

    if (field.type === 'select') {
        return (
            <div className="mb-4">
                <label className={labelClasses}>{field.label}</label>
                <div className="relative">
                    <select className={`${baseClasses} appearance-none cursor-pointer`} value={safeValue} onChange={e => onChange(e.target.value)}>
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none opacity-50">▼</div>
                </div>
            </div>
        );
    }

    if (field.type === 'checkbox') {
        return (
            <div className="mb-4 flex items-center gap-2 pt-1">
                <input
                    type="checkbox"
                    id={field.key}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    checked={!!value}
                    onChange={e => onChange(e.target.checked)}
                />
                <label htmlFor={field.key} className="text-sm font-medium cursor-pointer select-none">{field.label}</label>
            </div>
        );
    }

    return (
        <div className="mb-4">
            <label className={labelClasses}>{field.label}</label>
            <div className="relative">
                <input
                    type={field.type === 'year' ? 'number' : (field.type || 'text')}
                    className={`${baseClasses} ${field.type === 'url' ? 'pl-8' : ''}`}
                    value={safeValue}
                    onChange={e => onChange(e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    min={field.type === 'year' ? "1900" : undefined}
                    max={field.type === 'year' ? "2100" : undefined}
                />
                {field.type === 'url' && <LinkIcon size={14} className="absolute left-3 top-3.5 text-gray-400" />}
                {field.type === 'date' && <Calendar size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />}
            </div>
        </div>
    );
};

export default FormField;
