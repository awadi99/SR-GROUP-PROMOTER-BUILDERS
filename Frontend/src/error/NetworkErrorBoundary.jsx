import React from 'react';

class NetworkErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 bg-[#030303] flex flex-col items-center justify-center text-center z-[9999]">
                    <p className="text-[#B08B57] uppercase tracking-widest text-xs mb-4">
                        Connection Stuttered
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 text-[10px] uppercase border border-[#B08B57]/30 text-white rounded hover:bg-[#B08B57]/10 transition-colors"
                    >
                        Retry Connection
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default NetworkErrorBoundary;