import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in African Economic Dashboard:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white border border-[#e2e8f0] rounded-3xl p-8 shadow-xl text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tight text-[#0f172a] font-display">
                Dashboard Execution Halted
              </h1>
              <p className="text-xs text-[#475569] leading-relaxed">
                A rendering anomaly occurred in the dashboard engine. We have captured the incident report for diagnostics.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-[#f1f5f9] border border-[#e2e8f0] p-4 rounded-xl text-left font-mono text-[10.5px] text-[#475569] max-h-32 overflow-y-auto">
                <span className="font-bold text-[#e11d48]">Error:</span> {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-[#0f766e] hover:bg-[#0d635c] text-white font-semibold text-xs rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer animate-pulse"
            >
              <RefreshCw className="w-4 h-4" />
              Re-initialize Workspace
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
