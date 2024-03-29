import React, { Fragment, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorBoundary';
const InfiniteScrolling = React.lazy(() => import("./InfiniteScrolling"));
const InfiniteScrollingWithApi = React.lazy(() => import("./InfiniteScrollingWithApi"));
const InfiniteScroolingWithApiTwo = React.lazy(() => import("./InfiniteScroolingWithApiTwo"));
const ReacctInfiniteScrollComponent = React.lazy(() => import("./ReacctInfiniteScrollComponent"));

const IndexInfinite = () => {
    return (
        <Fragment>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                <Suspense fallback={<div>Loading...</div>}>
                    {/* <InfiniteScrolling /> */}
                    {/* <InfiniteScrollingWithApi /> */}
                    <ReacctInfiniteScrollComponent />
                    {/* <InfiniteScroolingWithApiTwo /> */}
                </Suspense>
            </ErrorBoundary>
        </Fragment>
    )
}

export default IndexInfinite