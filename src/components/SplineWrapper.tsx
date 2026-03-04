import { Component, lazy, Suspense, type ReactNode } from "react";

const SplineScene = lazy(() => import("@splinetool/react-spline"));

class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

interface SplineWrapperProps {
  scene: string;
  className?: string;
}

const SplineWrapper = ({ scene, className = "" }: SplineWrapperProps) => {
  const fallback = <div className={`${className} bg-[rgb(10,10,40)]`} />;

  return (
    <SplineErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <div className={className}>
          <SplineScene scene={scene} />
        </div>
      </Suspense>
    </SplineErrorBoundary>
  );
};

export default SplineWrapper;
