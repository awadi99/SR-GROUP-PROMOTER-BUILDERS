import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteConfirmation({ isOpen, onClose, onConfirm, projectName }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#050505] border border-[#1a1a1a] p-8 max-w-sm w-full">
                <AlertTriangle className="text-[#B08B57] mb-4" size={32} />
                <h3 className="text-white text-lg uppercase tracking-widest">Delete Project?</h3>
                <p className="text-[#555] text-xs mt-2 mb-6">Are you sure you want to delete <span className="text-white font-bold">{projectName}</span>? This action cannot be undone.</p>
                
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 py-2 text-[10px] uppercase border border-[#1a1a1a] text-white hover:bg-[#1a1a1a]">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 py-2 text-[10px] uppercase bg-[#B08B57] text-black font-bold">Confirm</button>
                </div>
            </div>
        </div>
    );
}