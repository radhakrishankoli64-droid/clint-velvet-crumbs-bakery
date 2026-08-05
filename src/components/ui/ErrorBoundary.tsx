import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  declare props: Readonly<Props>;
  declare state: Readonly<State>;
  declare setState: (state: Partial<State> | ((prevState: Readonly<State>) => Partial<State>)) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Velvet Crumbs App:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF8F0] dark:bg-[#1A1210] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/30 shadow-2xl space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 text-[#D4AF37] flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#5D4037] dark:text-[#F3E5AB]">
                Something Went Unexpectedly Wrong
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                Our pastry chef is fixing this glitch. Please refresh or return to the homepage.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900 text-left overflow-x-auto text-[10px] font-mono text-rose-500">
                {this.state.error.message}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 py-3 rounded-xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-stone-950 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
