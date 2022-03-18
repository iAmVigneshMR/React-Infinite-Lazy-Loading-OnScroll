import React, { Fragment } from 'react'
import IndexInfinite from './Components/infiniteScrolling/IndexInfinite'
import InfiniteScrolling from './Components/infiniteScrolling/InfiniteScrolling'
import IndexLazyLoadingReact from './Components/LazyLoadingReact/IndexLazyLoadingReact'

const App = () => {
  return (
    <Fragment>
      {/* <IndexLazyLoadingReact /> */}
      <IndexInfinite />
      {/* <InfiniteScrolling /> */}
    </Fragment>
  )
}

export default App