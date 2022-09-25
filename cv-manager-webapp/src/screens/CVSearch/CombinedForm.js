import Button from 'components/Button'
import InputField from 'components/formFields/InputField'
import SelectField from 'components/formFields/SelectField'
import Modal from 'components/Modal'
import { ALERT_TYPES, BUTTON_STATUS, BUTTON_TYPE, EDUCATIONS, INPUT_FILED_TYPE, MODAL_TYPES } from 'constants/enums'
import { AlertContext } from 'contexts/AlertContext'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { useTranslate } from 'react-polyglot'
import { getEntityService } from 'services/entity.service'

const CombinedForm = ({ open, setOpen, setData, setIsLoading }) => {
    const t = useTranslate()
    const { setAlert } = useContext(AlertContext)

    const initialValues = {
        ApplicantFirstname: '',
        FirstOperator: {id: 'AND', name: 'AND'},
        ApplicantLastname: '',
        SecondOperator: {id: 'AND', name: 'AND'},
        ApplicantEducationLevel: '',
        ThirdOperator: {id: 'AND', name: 'AND'},
        CoverLetterContent: '',
    }

    const onSubmit = async (formData) => {
        try {
            setIsLoading(true)
            setOpen(false)
            const { searchResults } = await getEntityService('admin/management/search-by-combined-parameters', {
                ...formData,
                FirstOperator: formData.FirstOperator.id,
                SecondOperator: formData.SecondOperator.id,
                ThirdOperator: formData.ThirdOperator.id,
                ApplicantEducationLevel: formData.ApplicantEducationLevel.id
            }, false)
            setData(searchResults)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    return (
        <Modal open={open} setOpen={setOpen} closeOnClickOutside={true} type={MODAL_TYPES.SMALL} >
            <div className="searchForm">
                <h6>Search by combined parameters</h6>
                <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {({ values: { 
                            ApplicantFirstname,
                            ApplicantLastname,
                            ApplicantEducationLevel,
                            CoverLetterContent,
                            FirstOperator,
                            SecondOperator,
                            ThirdOperator, 
                        } }) => (
                            <Form>
                                <div className="_w">
                                    <div className="_m9">
                                        <InputField
                                            name="ApplicantFirstname"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.firstName"
                                            placeholder="form.label.firstName"
                                        />
                                    </div>
                                    <div className="_m3">
                                        <SelectField
                                            name="FirstOperator"
                                            label="form.label.operator"
                                            defaultOptions={[{id: 'AND', name: 'AND'}, {id: 'OR', name: 'OR'}]}
                                            required
                                        />
                                    </div>
                                    <div className="_m9">
                                        <InputField
                                            name="ApplicantLastname"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.lastName"
                                            placeholder="form.label.lastName"
                                        />
                                    </div>
                                    <div className="_m3">
                                        <SelectField
                                            name="SecondOperator"
                                            label="form.label.operator"
                                            defaultOptions={[{id: 'AND', name: 'AND'}, {id: 'OR', name: 'OR'}]}
                                            required
                                        />
                                    </div>
                                    <div className="_m9">
                                        <SelectField
                                            name="ApplicantEducationLevel"
                                            label="form.label.educationLevel"
                                            placeholder="form.label.educationLevel"
                                            defaultOptions={EDUCATIONS}
                                         />
                                    </div>
                                    <div className="_m3">
                                        <SelectField
                                            name="ThirdOperator"
                                            label="form.label.operator"
                                            defaultOptions={[{id: 'AND', name: 'AND'}, {id: 'OR', name: 'OR'}]}
                                            required
                                        />
                                    </div>
                                    <div className="_12">
                                        <InputField
                                            name="CoverLetterContent"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.content"
                                            placeholder="form.label.content"
                                        />
                                    </div>
                                </div>
                                <div className='formButton'>
                                    <Button
                                        btnClass={BUTTON_STATUS.PRIMARY}
                                        color="#fff"
                                        label="button.search"
                                        type={BUTTON_TYPE.SUBMIT}
                                        // disabled={!Firstname && !Lastname}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
        </Modal>
    )
}

export default CombinedForm