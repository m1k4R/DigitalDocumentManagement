import React from 'react'

import Button from 'components/Button'

const TableActions = ({ actions }) => {
    return (
        <div className="m-table__actions">
            {actions.length > 0 &&
                actions.map(({ handleAction, icon, label, tooltip }, index) => (
                    <Button
                        key={index}
                        label={label}
                        onClick={handleAction}
                        tooltip={tooltip}
                        icon={icon}
                    />
                ))}
        </div>
    )
}

export default TableActions
