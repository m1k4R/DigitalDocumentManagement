import React from 'react'
import { useField } from 'formik'

import Multiselect, {
    MultiselectDefaultPropTypes,
} from 'components/Multiselect'

const MultiselectField = (props) => {
    const [field, meta, helpers] = useField(props)

    const { setValue, setTouched } = helpers

    const hasError = meta.touched && meta.error

    return (
        <Multiselect
            {...field}
            {...props}
            setValue={setValue}
            setTouched={setTouched}
            error={hasError}
        />
    )
}

MultiselectField.propTypes = {
    ...MultiselectDefaultPropTypes,
}

export default MultiselectField
