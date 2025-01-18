import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert" style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>An error occurred</h1>
            <p>We are looking into it. Please try again later.</p>
            <pre style={{ color: 'red' }}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
};

const AppErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={(err) => {
                // Optionally log the error or reset the app state
                console.log("Global Error:", err);
                window.location.reload();
            }}
        >
            {children}
        </ErrorBoundary>
    );
};

export default AppErrorBoundary;
