import React from 'react'
import { useField } from 'formik'

import Checkbox, { CheckboxDefaultPropTypes } from 'components/Checkbox'

const CheckboxField = (props) => {
    const [field, meta] = useField(props)

    const hasError = meta.touched && meta.error

    return <Checkbox {...field} {...props} error={hasError} />
}

CheckboxField.propTypes = {
    ...CheckboxDefaultPropTypes,
}

export default CheckboxField
