import React, { Fragment, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorBoundary';
const LazyLoadingReact = React.lazy(() => import("./LazyLoadingReact"));

const IndexLazyLoadingReact = () => {
    return (
        <Fragment>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyLoadingReact />
                </Suspense>
            </ErrorBoundary>
        </Fragment>
    )
}

export default IndexLazyLoadingReact