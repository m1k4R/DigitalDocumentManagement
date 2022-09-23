import moment from 'moment'

export const MOMENT_FORMATS = {
    DATE: 'DD.MM.YYYY',
    DATETIME: 'DD/MM/YYYY HH:mm A',
    DATE_API: 'yyyy-MM-DD',
}

export const formatDate = (date) => {
    return moment.utc(date).format(MOMENT_FORMATS.DATE)
}

export const formatDateTime = (dateTime) => {
    return moment.utc(dateTime).format(MOMENT_FORMATS.DATETIME)
}
