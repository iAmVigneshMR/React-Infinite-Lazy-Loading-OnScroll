import React, { Fragment, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorBoundary';
const InfiniteScrolling = React.lazy(() => import("./InfiniteScrolling"));

const IndexInfinite = () => {
    return (
        <Fragment>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                <Suspense fallback={<div>Loading...</div>}>
                    <InfiniteScrolling />
                </Suspense>
            </ErrorBoundary>
        </Fragment>
    )
}

export default IndexInfinite