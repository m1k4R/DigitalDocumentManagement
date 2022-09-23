import React, { Fragment } from 'react'

import Button from 'components/Button'

const RowActions = ({ actions, item }) => {
    return (
        <div className={`m-table__rowActions ${item ? '-show' : ''}`}>
            <span className="m-table__rowActionsTitle">Selected item</span>
            <div className="m-table__actions">
                {item &&
                    actions.length > 0 &&
                    actions.map(
                        ({ handleAction, icon, label, tooltip }, index) => (
                            <Button
                                key={index}
                                label={label}
                                onClick={() => handleAction(item)}
                                tooltip={tooltip}
                                icon={icon}
                            />
                        )
                    )}
            </div>
        </div>
    )
}

export default RowActions
