import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../../utils/logger';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.logError(error, `Component Stack: ${errorInfo.componentStack}`);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-6">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-3">Something went wrong</h1>
          <p className="text-slate-600 max-w-md mb-8 text-sm">
            We apologize for the inconvenience. An unexpected application error has occurred.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-hover transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reload Page
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
