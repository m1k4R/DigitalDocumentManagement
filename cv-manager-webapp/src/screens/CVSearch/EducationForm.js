import Button from 'components/Button'
import InputField from 'components/formFields/InputField'
import SelectField from 'components/formFields/SelectField'
import Modal from 'components/Modal'
import { ALERT_TYPES, BUTTON_STATUS, BUTTON_TYPE, EDUCATIONS, INPUT_FILED_TYPE, MODAL_TYPES } from 'constants/enums'
import { AlertContext } from 'contexts/AlertContext'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { useTranslate } from 'react-polyglot'
import { useNavigate } from 'react-router-dom'
import { getEntityService } from 'services/entity.service'

const EducationForm = ({ open, setOpen, setData, setIsLoading }) => {
    const t = useTranslate()
    const { setAlert } = useContext(AlertContext)

    const initialValues = {
        EducationLevel: null,
    }

    const onSubmit = async ({ EducationLevel }) => {
        try {
            setIsLoading(true)
            setOpen(false)
            const { searchResults } = await getEntityService('admin/management/search-by-education-level', { EducationLevel: EducationLevel.id }, false)
            setData(searchResults)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    return (
        <Modal open={open} setOpen={setOpen} closeOnClickOutside={true} type={MODAL_TYPES.SMALL} >
            <div className="searchForm -education">
                <h6>Search by education level</h6>
                <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {({ values: { EducationLevel } }) => (
                            <Form>
                                <div className="_w">
                                    <div className="_12">
                                        <SelectField
                                            name="EducationLevel"
                                            label="form.label.educationLevel"
                                            placeholder="form.label.educationLevel"
                                            defaultOptions={EDUCATIONS}
                                         />
                                    </div>
                                </div>
                                <div className='formButton'>
                                    <Button
                                        btnClass={BUTTON_STATUS.PRIMARY}
                                        color="#fff"
                                        label="button.search"
                                        type={BUTTON_TYPE.SUBMIT}
                                        disabled={!EducationLevel}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
        </Modal>
    )
}

export default EducationForm