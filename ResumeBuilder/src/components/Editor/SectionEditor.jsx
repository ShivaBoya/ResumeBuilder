import React from 'react';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import FormField from './FormField';

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const SectionEditor = ({ sectionId, schema, data, onChange }) => {
    if (!schema) return <div className="p-4 text-red-500">Schema not found for {sectionId}</div>;

    // 1. NON-REPEATABLE (e.g., Personal, Summary, Declaration) - Single Object
    if (!schema.repeatable) {
        const currentData = data || {};

        const handleFieldChange = (key, value) => {
            onChange({ ...currentData, [key]: value });
        };

        return (
            <div className="p-4 animate-fadeIn">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    {schema.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {schema.fields.map(field => (
                        <div key={field.key} className={field.type === 'textarea' || field.type === 'richtext' ? 'col-span-2' : ''}>
                            <FormField
                                field={field}
                                value={currentData[field.key]}
                                onChange={(val) => handleFieldChange(field.key, val)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // 2. REPEATABLE (e.g., Experience, Education) - Array of Objects
    const listData = Array.isArray(data) ? data : [];

    const addItem = () => {
        onChange([...listData, { id: generateId() }]); // Add empty item
    };

    const removeItem = (index) => {
        const newList = [...listData];
        newList.splice(index, 1);
        onChange(newList);
    };

    const handleItemChange = (index, key, value) => {
        const newList = [...listData];
        newList[index] = { ...newList[index], [key]: value };
        onChange(newList);
    };

    return (
        <div className="p-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">{schema.label}</h2>
                <button onClick={addItem} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 transition-colors">
                    <Plus size={16} /> Add Item
                </button>
            </div>

            {listData.length === 0 && (
                <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-xl">
                    No items yet. Click Add Item to start.
                </div>
            )}

            <div className="space-y-6">
                {listData.map((item, index) => (
                    <div key={item.id || index} className="bg-gray-50 dark:bg-slate-800/50 border dark:border-slate-700 rounded-xl p-4 relative group transition-all hover:shadow-md">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => removeItem(index)} className="text-red-400 hover:text-red-600 p-1">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {schema.fields.map(field => (
                                <div key={field.key} className={field.type === 'textarea' || field.type === 'richtext' ? 'col-span-2' : ''}>
                                    <FormField
                                        field={field}
                                        value={item[field.key]}
                                        onChange={(val) => handleItemChange(index, field.key, val)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionEditor;
