import Button from 'components/Button'
import FileUpload from 'components/formFields/FileUploadField'
import InputField from 'components/formFields/InputField'
import SelectField from 'components/formFields/SelectField'
import Modal from 'components/Modal'
import { ALERT_TYPES, BUTTON_STATUS, BUTTON_TYPE, EDUCATIONS, INPUT_FILED_TYPE, MODAL_TYPES } from 'constants/enums'
import { AlertContext } from 'contexts/AlertContext'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useTranslate } from 'react-polyglot'
import { createEntityService } from 'services/entity.service'

const UserApplication = () => {

    const { setAlert } = useContext(AlertContext)

    const [isLoading, setIsLoading] = useState(false)

    const initialValues = {
        ApplicantFirstname: '',
        ApplicantLastname: '',
        ApplicantPhone: '',
        ApplicantEmail: '',
        ApplicantEducationLevel: null,
        CityName: '',
        CvFile: null,
        CoverLetterFile: null,
    }

    const onSubmit = async ({ 
        ApplicantFirstname, 
        ApplicantLastname, 
        ApplicantPhone,
        ApplicantEmail,
        ApplicantEducationLevel,
        CityName,
        CvFile,
        CoverLetterFile
    }) => {
        try {
            setIsLoading(true)
            const formData = new FormData();
            formData.append('applicantFirstname', ApplicantFirstname);
            formData.append('applicantLastname', ApplicantLastname);
            formData.append('applicantPhone', ApplicantPhone);
            formData.append('applicantEmail', ApplicantEmail);
            formData.append('cityName', CityName);
            formData.append('applicantEducationlevel', ApplicantEducationLevel.id.toString());
            formData.append('cvFile', CvFile);
            formData.append('coverLetterFile', CoverLetterFile);
            const result = await createEntityService('userManagement/create', formData, false)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    return (
        <div className="userForm">
                <h5>Create application</h5>
                <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {({ values }) => (
                            <Form>
                                <div className="_w">
                                    <div className="_m6 _12">
                                        <InputField
                                            name="ApplicantFirstname"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.firstName"
                                            placeholder="form.label.firstName"
                                        />
                                    </div>
                                    <div className="_m6 _12">
                                        <InputField
                                            name="ApplicantLastname"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.lastName"
                                            placeholder="form.label.lastName"
                                        />
                                    </div>
                                    <div className="_m6 _12">
                                        <InputField
                                            name="ApplicantEmail"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.email"
                                            placeholder="form.label.email"
                                        />
                                    </div>
                                    <div className="_m6 _12">
                                        <InputField
                                            name="ApplicantPhone"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.phoneNumber"
                                            placeholder="form.label.phoneNumber"
                                        />
                                    </div>
                                    <div className="_m6 _12">
                                        <SelectField
                                            name="ApplicantEducationLevel"
                                            label="form.label.educationLevel"
                                            placeholder="form.label.educationLevel"
                                            defaultOptions={EDUCATIONS}
                                         />
                                    </div>
                                    <div className="_m6 _12">
                                        <InputField
                                            name="CityName"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.city"
                                            placeholder="form.label.city"
                                        />
                                    </div>
                                    <div className="_m6 _12">
                                        <FileUpload
                                            name="CvFile"
                                            type={INPUT_FILED_TYPE.FILE}
                                            label="form.label.cvFile"
                                            placeholder="form.label.cvFile"
                                        />
                                    </div>
                                    <div className="_m6 _12">
                                        <FileUpload
                                            name="CoverLetterFile"
                                            type={INPUT_FILED_TYPE.FILE}
                                            label="form.label.coverLetterFile"
                                            placeholder="form.label.coverLetterFile"
                                        />
                                    </div>
                                </div>
                                <div className='formButton'>
                                    <Button
                                        btnClass={BUTTON_STATUS.PRIMARY}
                                        color="#fff"
                                        label="button.search"
                                        type={BUTTON_TYPE.SUBMIT}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
    )
}

export default UserApplication