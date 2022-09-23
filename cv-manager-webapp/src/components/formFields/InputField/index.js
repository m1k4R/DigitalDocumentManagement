import React from 'react'
import { useField } from 'formik'

import Input, { InputDefaultPropTypes } from 'components/Input'

const InputField = (props) => {
    const [field, meta] = useField(props)

    const hasError = meta.touched && meta.error

    return <Input {...field} {...props} error={hasError} />
}

InputField.propTypes = {
    ...InputDefaultPropTypes,
}

export default InputField
