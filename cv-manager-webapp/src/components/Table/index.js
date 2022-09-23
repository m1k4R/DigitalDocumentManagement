import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import useQueryParams from 'hooks/useQueryParams'

import { formatUrl } from 'utils/jsonApiFormatters'

import Pagination from './Pagination'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Search from './Search'
import Loader from 'components/Loader'
import { useTranslate } from 'react-polyglot'
import TableActions from './TableActions'
import RowActions from './RowActions'
import Filters from './Filters'
import useWindowDimensions from 'hooks/useWindowDimension'

const PAGE = 1
const PAGINATION_OPTIONS = [10, 20, 30]

const getFiltersToString = (filters) => {
    let result = ''
    Object.keys(filters).forEach((key) => {
        if (
            filters[key] !== null &&
            filters[key] !== undefined &&
            filters[key] !== ''
        ) {
            result = result.concat(`${key}=${filters[key]}&`)
        }
    })
    result = result.slice(0, -1)

    return result
}

const Table = ({
    title,
    headerItems,
    data,
    isLoading,
    totalItems,
    actions,
    rowActions,
    selectedRowActions,
    filterActions,
    paginate,
    searchable,
    showResults,
    onClickRow,
    paginationOptions,
}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const t = useTranslate()

    const { width } = useWindowDimensions()

    const ITEMS_PER_PAGE = paginationOptions[0]

    const {
        page: queryPage,
        itemsPerPage: queryItemsPerPage,
        sort: querySort,
        search: querySearch,
        ...filterParams
    } = useQueryParams()

    const queryParams = useLocation().search

    const [page, setPage] = useState(Number(queryPage) || PAGE)
    const [itemsPerPage, setItemsPerPage] = useState(
        Number(queryItemsPerPage) || ITEMS_PER_PAGE
    )
    const [sort, setSort] = useState(querySort)
    const [search, setSearch] = useState(querySearch)
    const [filters, setFilters] = useState(filterParams)

    const filtersString = getFiltersToString(filters)

    const [selectedRow, setSelectedRow] = useState(null)

    useEffect(() => {
        if (queryPage || page !== PAGE) {
            const currentPath = location.pathname
            const url = formatUrl(currentPath, {
                ...filters,
                page,
                itemsPerPage,
                sort,
                search,
            })
            navigate(url)
        }
    }, [page])

    useEffect(() => {
        if (
            queryItemsPerPage ||
            itemsPerPage !== ITEMS_PER_PAGE ||
            search !== undefined ||
            sort !== undefined
        ) {
            const currentPath = location.pathname
            const url = formatUrl(currentPath, {
                ...filters,
                itemsPerPage,
                sort,
                search,
            })
            navigate(url)
        }
    }, [search, sort, itemsPerPage])

    useEffect(() => {
        if (filterParams || filtersString) {
            const currentPath = location.pathname
            const url = formatUrl(currentPath, {
                ...filters,
                itemsPerPage: queryItemsPerPage,
                sort,
                search,
            })
            navigate(url)
        }
    }, [filtersString])

    useEffect(() => {
        setPage(Number(queryPage) || PAGE)
        setItemsPerPage(Number(queryItemsPerPage) || ITEMS_PER_PAGE)
        setSort(querySort)
        setSearch(querySearch)
    }, [queryParams])

    const tableHeaderItems =
        width < 768
            ? headerItems.filter((item) => item.showOnSmallScreens)
            : headerItems

    return (
        <Fragment>
            {searchable && <Search search={search} setSearch={setSearch} />}
            <div className="m-table">
                <div className="m-table__header">
                    <div>
                        {title && <h3>{t(title)}</h3>}
                        <div className="m-table__results">
                            {showResults &&
                                totalItems > 0 &&
                                `${t('table.pagination.showing')} ${
                                    data.length
                                } ${t('table.pagination.outOf')} ${totalItems}`}
                        </div>
                    </div>
                    <TableActions actions={actions} />
                </div>
                <div className="m-table__actionsContainer">
                    <Filters
                        filterActions={filterActions}
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <RowActions
                        actions={selectedRowActions}
                        item={selectedRow}
                    />
                </div>
                {isLoading && <Loader />}
                <div className={`m-table__container`}>
                    <table>
                        <TableHeader
                            headerItems={tableHeaderItems}
                            rowActions={rowActions}
                            sort={sort}
                            setSort={setSort}
                        />
                        <TableBody
                            headerItems={tableHeaderItems}
                            data={data}
                            isLoading={isLoading}
                            rowActions={rowActions}
                            selectedRowActions={selectedRowActions}
                            onClickRow={onClickRow}
                            selectedRow={selectedRow}
                            setSelectedRow={setSelectedRow}
                            itemsPerPage={itemsPerPage}
                        />
                    </table>
                </div>
                {data.length > 0 && paginate && (
                    <Pagination
                        page={page}
                        setPage={setPage}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        totalItems={totalItems}
                        paginationOptions={paginationOptions}
                    />
                )}
            </div>
        </Fragment>
    )
}

Table.propTypes = {
    title: PropTypes.string,
    headerItems: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string,
            sortable: PropTypes.bool,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    totalItems: PropTypes.number,
    actions: PropTypes.array,
    rowActions: PropTypes.array,
    selectedRowActions: PropTypes.array,
    filters: PropTypes.array,
    paginate: PropTypes.bool,
    searchable: PropTypes.bool,
    showResults: PropTypes.bool,
    onClickRow: PropTypes.func,
    paginationOptions: PropTypes.array,
}

Table.defaultProps = {
    actions: [],
    rowActions: [],
    selectedRowActions: [],
    filters: [],
    paginate: true,
    searchable: false,
    showResults: true,
    paginationOptions: PAGINATION_OPTIONS,
}

export default Table
