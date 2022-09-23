import React from 'react'

const NoAuthLayout = ({ children }) => {
    return (
        <div className="m-noAuth">
            <div className="_wr">
                <div className="_w">
                    <div className="m-noAuth__form _xs12 _l4">
                        <div className="m-noAuth__logo">
                            <div className="m-noAuth__logo--icon"></div>
                            <div className="m-noAuth__logo--title">
                                <h2>React Starter</h2>
                            </div>
                        </div>
                        {children}
                    </div>
                    <div className="m-noAuth__image _l7"></div>
                </div>
            </div>
        </div>
    )
}

export default NoAuthLayout
