import React from 'react';
import { AlertTriangle, Loader2, X, Trash2 } from 'lucide-react';

export default function DeleteConfirmation({
    isOpen,
    onClose,
    onConfirm,
    projectName,
    isDeleting
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-red-500/20 bg-[#080808] shadow-[0_0_60px_rgba(255,0,0,0.08)] animate-in fade-in zoom-in duration-300">

                {/* Top Glow */}
                <div className="h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

                <div className="p-5 sm:p-7">

                    {/* Header */}
                    <div className="flex items-start justify-between">

                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
                                <AlertTriangle
                                    size={22}
                                    className="text-red-500"
                                />
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-red-500">
                                    Dangerous Action
                                </p>

                                <h2 className="text-lg sm:text-xl text-white font-light uppercase tracking-wider">
                                    Delete Project
                                </h2>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="text-neutral-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Warning Box */}
                    <div className="mt-6 rounded-2xl border border-red-500/10 bg-red-500/5 p-4">

                        <p className="text-neutral-300 text-sm leading-relaxed">
                            You are about to permanently delete:
                        </p>

                        <p className="mt-2 text-white font-medium break-words">
                            {projectName}
                        </p>

                        <p className="mt-3 text-xs text-neutral-500 leading-relaxed">
                            This action cannot be undone. All project information,
                            images, floor plans and associated records will be
                            permanently removed.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">

                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="
                                flex-1
                                h-12
                                rounded-xl
                                border
                                border-neutral-800
                                text-neutral-400
                                text-xs
                                uppercase
                                tracking-widest
                                hover:border-neutral-600
                                hover:text-white
                                transition-all
                            "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="
                                flex-1
                                h-12
                                rounded-xl
                                bg-red-600
                                text-white
                                text-xs
                                uppercase
                                tracking-widest
                                font-semibold
                                hover:bg-red-700
                                transition-all
                                flex
                                items-center
                                justify-center
                                gap-2
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2
                                        size={14}
                                        className="animate-spin"
                                    />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 size={14} />
                                    Delete Project
                                </>
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}