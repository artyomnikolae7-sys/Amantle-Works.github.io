import React, { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="p-8 my-4 rounded-[20px] bg-card border border-border text-center space-y-3">
          <p className="text-sm font-medium text-foreground">Компонент временно недоступен</p>
          <p className="text-xs text-muted-foreground font-mono">{this.state.error?.message}</p>
        </div>
      )
    }

    return this.props.children
  }
}
