import React from 'react'
import { useField } from 'formik'

import TextArea, { TextAreaDefaultPropTypes } from 'components/TextArea'

const TextAreaField = (props) => {
    const [field, meta] = useField(props)

    const hasError = meta.touched && meta.error

    return <TextArea {...field} {...props} error={hasError} />
}

TextAreaField.propTypes = {
    ...TextAreaDefaultPropTypes,
}

export default TextAreaField
