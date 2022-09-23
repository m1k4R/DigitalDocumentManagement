import { useLocation } from 'react-router-dom'

const useQueryParams = () => {
    const queryParams = Object.fromEntries(
        new URLSearchParams(useLocation().search)
    )

    return queryParams
}

export default useQueryParams
