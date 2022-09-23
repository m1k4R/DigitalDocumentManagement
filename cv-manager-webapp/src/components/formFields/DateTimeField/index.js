import React from 'react'
import { useField } from 'formik'

import DateTimePicker, {
    DateTimeDefaultPropTypes,
} from 'components/DateTimePicker/DateTimePicker'

const DateTimeField = (props) => {
    const [field, meta, helpers] = useField(props)
    const { setValue, setTouched } = helpers
    const hasError = meta.touched && meta.error

    return (
        <DateTimePicker
            {...field}
            {...props}
            setValue={setValue}
            setTouched={setTouched}
            error={hasError}
        />
    )
}

DateTimeField.propTypes = {
    ...DateTimeDefaultPropTypes,
}

export default DateTimeField
