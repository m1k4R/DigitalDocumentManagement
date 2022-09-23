import React from 'react'
import { useField } from 'formik'

import Radio, { RadioDefaultPropTypes } from 'components/Radio'

const RadioField = (props) => {
    const [field, meta, helpers] = useField(props)
    const { setValue } = helpers

    return <Radio {...field} {...props} setValue={setValue} />
}

RadioField.propTypes = {
    ...RadioDefaultPropTypes,
}

export default RadioField
