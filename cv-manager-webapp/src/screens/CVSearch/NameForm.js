import Button from 'components/Button'
import InputField from 'components/formFields/InputField'
import Modal from 'components/Modal'
import { ALERT_TYPES, BUTTON_STATUS, BUTTON_TYPE, INPUT_FILED_TYPE, MODAL_TYPES } from 'constants/enums'
import { AlertContext } from 'contexts/AlertContext'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { useTranslate } from 'react-polyglot'
import { getEntityService } from 'services/entity.service'

const NameForm = ({ open, setOpen, setData, setIsLoading }) => {

    const t = useTranslate()
    const { setAlert } = useContext(AlertContext)

    const initialValues = {
        Firstname: '',
        Lastname: '',
    }

    const onSubmit = async (formData) => {
        try {
            setIsLoading(true)
            setOpen(false)
            const { searchResults } = await getEntityService('admin/management/search-by-name', formData, false)
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
                <h6>Search by firstname and lastname</h6>
                <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {({ values: { Firstname, Lastname } }) => (
                            <Form>
                                <div className="_w">
                                    <div className="_12">
                                        <InputField
                                            name="Firstname"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.firstName"
                                            placeholder="form.label.firstName"
                                        />
                                    </div>
                                    <div className="_12">
                                        <InputField
                                            name="Lastname"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.lastName"
                                            placeholder="form.label.lastName"
                                        />
                                    </div>
                                </div>
                                <div className='formButton'>
                                    <Button
                                        btnClass={BUTTON_STATUS.PRIMARY}
                                        color="#fff"
                                        label="button.search"
                                        type={BUTTON_TYPE.SUBMIT}
                                        disabled={!Firstname && !Lastname}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
        </Modal>
    )
}

export default NameForm