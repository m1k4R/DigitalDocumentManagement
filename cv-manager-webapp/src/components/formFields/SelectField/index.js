import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'

import Select, { SelectDefaultPropTypes } from 'components/Select'

const SelectField = (props) => {
    const [field, meta, helpers] = useField(props)

    const { setValue, setTouched } = helpers

    const hasError = meta.touched && meta.error

    return (
        <Select
            {...props}
            value={field.value}
            setValue={setValue}
            setTouched={setTouched}
            error={hasError}
        />
    )
}

SelectField.propTypes = {
    ...SelectDefaultPropTypes,
}

export default SelectField
