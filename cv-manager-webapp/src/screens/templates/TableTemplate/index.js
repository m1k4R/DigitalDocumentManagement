import React, { useState } from 'react'

import useFetchPaginatedData from 'hooks/useFetchPaginatedData'

import ENTITY from 'constants/entities'
import { TABLE_FILTER_TYPE } from 'constants/enums'

import Table from 'components/Table'

const TABLE_HEADER = [
    {
        key: 'firstName',
        title: 'form.label.firstName',
        sortable: true,
        showOnSmallScreens: true,
    },
    {
        key: 'lastName',
        title: 'form.label.lastName',
        showOnSmallScreens: true,
    },
    {
        key: 'email',
        title: 'form.label.email',
    },
    {
        key: 'role.name',
        title: 'form.label.role',
    },
]

const TableTemplate = () => {
    const { data, meta, isLoading } = useFetchPaginatedData(ENTITY.USER, {
        include: 'role',
    })

    const handleCreate = () => {
        console.log('Create new item')
    }

    const handleEdit = (id) => {
        console.log('Edit item >> ', id)
    }

    const handleDelete = (id) => {
        console.log('Delete item >> ', id)
    }

    return (
        <div>
            <Table
                title="menuItems.tableTemplate"
                headerItems={TABLE_HEADER}
                data={data}
                totalItems={meta?.totalItems}
                isLoading={isLoading}
                actions={[
                    {
                        handleAction: handleCreate,
                        icon: 'home',
                        label: 'button.create',
                        tooltip: 'button.create',
                    },
                    {
                        handleAction: handleCreate,
                        label: 'button.create',
                        tooltip: 'button.create',
                    },
                ]}
                rowActions={[
                    {
                        handleAction: handleEdit,
                        icon: 'pencil',
                        tooltip: 'button.edit',
                    },
                    {
                        handleAction: handleDelete,
                        icon: 'trash',
                        tooltip: 'button.delete',
                        confirmationMessage: 'button.delete',
                    },
                ]}
                selectedRowActions={[
                    {
                        handleAction: handleEdit,
                        icon: 'pencil',
                        label: 'button.edit',
                        tooltip: 'button.edit',
                    },
                    {
                        handleAction: handleDelete,
                        icon: 'trash',
                        label: 'button.delete',
                        tooltip: 'button.delete',
                    },
                ]}
                filterActions={[
                    {
                        type: TABLE_FILTER_TYPE.TEXT,
                        name: 'firstName',
                        label: 'form.label.firstName',
                        placeholder: 'form.label.firstName',
                    },
                    {
                        type: TABLE_FILTER_TYPE.TEXT,
                        name: 'lastName',
                        label: 'form.label.lastName',
                        placeholder: 'form.label.lastName',
                    },
                    {
                        type: TABLE_FILTER_TYPE.SELECT,
                        name: 'role',
                        label: 'form.label.role',
                        placeholder: 'form.label.role',
                        entityType: ENTITY.ROLE,
                    },
                    {
                        type: TABLE_FILTER_TYPE.DATE_TIME,
                        name: 'date',
                        label: 'form.label.fromDate',
                        placeholder: 'form.label.fromDate',
                    },
                    {
                        type: TABLE_FILTER_TYPE.CHECKBOX,
                        name: 'active',
                        label: 'form.label.active',
                        placeholder: 'form.label.active',
                    },
                ]}
            />
        </div>
    )
}

export default TableTemplate
