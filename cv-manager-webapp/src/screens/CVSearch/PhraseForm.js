import Button from 'components/Button'
import InputField from 'components/formFields/InputField'
import Modal from 'components/Modal'
import { ALERT_TYPES, BUTTON_STATUS, BUTTON_TYPE, INPUT_FILED_TYPE, MODAL_TYPES } from 'constants/enums'
import { AlertContext } from 'contexts/AlertContext'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { useTranslate } from 'react-polyglot'
import { getEntityService } from 'services/entity.service'

const PhraseForm = ({ open, setOpen, setData, setIsLoading }) => {
    const t = useTranslate()
    const { setAlert } = useContext(AlertContext)

    const initialValues = {
        PhraseQuery: ''
    }

    const onSubmit = async (formData) => {
        try {
            setIsLoading(true)
            setOpen(false)
            const { searchResults } = await getEntityService('admin/management/search-by-phrase', formData, false)
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
                <h6>Search by phrase</h6>
                <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {({ values: { PhraseQuery } }) => (
                            <Form>
                                <div className="_w">
                                    <div className="_12">
                                        <InputField
                                            name="PhraseQuery"
                                            type={INPUT_FILED_TYPE.TEXT}
                                            label="form.label.phrase"
                                            placeholder="form.label.phrase"
                                        />
                                    </div>
                                </div>
                                <div className='formButton'>
                                    <Button
                                        btnClass={BUTTON_STATUS.PRIMARY}
                                        color="#fff"
                                        label="button.search"
                                        type={BUTTON_TYPE.SUBMIT}
                                        disabled={!PhraseQuery}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
        </Modal>
    )
}

export default PhraseForm