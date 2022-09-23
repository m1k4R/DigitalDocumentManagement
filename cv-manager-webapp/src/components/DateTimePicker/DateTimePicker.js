import React from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'

import { MOMENT_FORMATS } from 'services/moment.service'

import 'flatpickr/dist/themes/material_green.css'

import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import 'flatpickr/dist/plugins/monthSelect/style.css'

const DateTimePicker = ({
    name,
    label,
    placeholder,
    value,
    setValue,
    setTouched,
    valueFormat = MOMENT_FORMATS.DATE_API,
    dateFormat = 'd.m.Y',
    required,
    error,
    weekSelect = false,
    monthSelect = false,
    yearSelect = false,
    ...props
}) => {
    const t = useTranslate()
    const handleChange = (selectedValue) => {
        switch (props.mode) {
            case 'range':
                if (weekSelect) {
                    const startOfWeek = moment(selectedValue[0])
                        .startOf('isoWeek')
                        .format(valueFormat)
                    const endOfWeek = moment(selectedValue[0])
                        .endOf('isoWeek')
                        .format(valueFormat)
                    setValue([startOfWeek, endOfWeek])
                } else if (selectedValue.length === 2) {
                    const from = moment(selectedValue[0]).format(valueFormat)
                    const to = moment(selectedValue[1]).format(valueFormat)
                    setValue([from, to])
                }
                break
            default:
                const formattedValue = moment(selectedValue[0]).format(
                    valueFormat
                )
                setValue(formattedValue)
                break
        }
    }

    const handleTouched = () => {
        setTouched && setTouched(true)
        if (yearSelect && !value) {
            const formattedValue = moment().format(valueFormat)
            setValue(formattedValue)
        }
    }

    const formatValue = () => {
        if (Array.isArray(value)) {
            return value.map((item) => moment(item).format(MOMENT_FORMATS.DATE))
        } else if (value && monthSelect) {
            return moment(value).format('MMMM YYYY')
        } else if (value && !props.enableTime) {
            return moment(value).format(MOMENT_FORMATS.DATE)
        }
        return value
    }

    const handleYearChange = (firstParam, secondParam, target) => {
        if (yearSelect) {
            const formattedValue = moment(target.currentYear, 'YYYY').format(
                valueFormat
            )
            setValue(formattedValue)
        }
    }

    return (
        <div
            className={`m-dateTimePicker ${error ? '-error' : ''} ${
                yearSelect ? '-yearPicker' : ''
            }`}
        >
            {label && (
                <label>
                    {t(label)}
                    {required && <span className="a-require-star"> *</span>}
                </label>
            )}
            <Flatpickr
                name={name}
                placeholder={t(placeholder)}
                value={formatValue()}
                options={{
                    ...props,
                    dateFormat: dateFormat,
                    onChange: handleChange,
                    onOpen: handleTouched,
                    onYearChange: handleYearChange,
                    locale: {
                        firstDayOfWeek: 1,
                    },
                    plugins: monthSelect
                        ? [
                              monthSelectPlugin({
                                  shorthand: true,
                                  dateFormat: yearSelect ? 'Y' : 'F Y',
                                  theme: yearSelect ? 'dark' : 'light',
                              }),
                          ]
                        : [],
                }}
            />
            {error && <div className="a-errorMessage">{error}</div>}
        </div>
    )
}

export const DateTimeDefaultPropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    valueFormat: PropTypes.string,
    disabled: PropTypes.bool,
    defaultDate: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    enableTime: PropTypes.bool,
    noCalendar: PropTypes.bool,
    dateFormat: PropTypes.oneOf(['d.m.Y', 'Y-m-d', 'H:i']),
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    minTime: PropTypes.string,
    maxTime: PropTypes.string,
    disable: PropTypes.array,
    enable: PropTypes.array,
    mode: PropTypes.oneOf(['single', 'multiple', 'range']),
    time_24hr: PropTypes.bool,
    inline: PropTypes.bool,
    weekSelect: PropTypes.bool,
    monthSelect: PropTypes.bool,
    yearSelect: PropTypes.bool,
}

DateTimePicker.propTypes = {
    ...DateTimeDefaultPropTypes,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    setValue: PropTypes.func.isRequired,
    setTouched: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
}

export default DateTimePicker
