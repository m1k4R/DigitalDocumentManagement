import React, { lazy, Suspense } from 'react'

const loadable = (importFunction) => {
    const LazyComponent = lazy(importFunction)
    return (props) => (
        <Suspense fallback={null}>
            <LazyComponent {...props} />
        </Suspense>
    )
}

export default loadable
