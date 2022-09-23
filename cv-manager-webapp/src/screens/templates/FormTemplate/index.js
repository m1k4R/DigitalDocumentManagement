import React, { useContext, useEffect, useState } from 'react'
import { useTranslate } from 'react-polyglot'
import { useNavigate } from 'react-router-dom'

import { Formik, Form, useFormikContext, FormikContextType } from 'formik'
import * as Yup from 'yup'

import ENTITY from 'constants/entities'
import {
    ALERT_TYPES,
    BUTTON_STATUS,
    BUTTON_TYPE,
    ICON_SIZE,
    INPUT_FILED_TYPE,
    ROLES,
} from 'constants/enums'

import { AlertContext } from 'contexts/AlertContext'

import Button from 'components/Button'
import FileUpload from 'components/formFields/FileUploadField'
import InputField from 'components/formFields/InputField'
import SelectField from 'components/formFields/SelectField'
import CheckboxField from 'components/formFields/CheckboxField'
import MultiselectField from 'components/formFields/MultiselectField'
import RadioField from 'components/formFields/RadioField'
import TextAreaField from 'components/formFields/TextAreaField'
import DateTimeField from 'components/formFields/DateTimeField'
import { createEntityService } from 'services/entity.service'

const UserFromContext = () => {
    const formikContext = useFormikContext()
    const {
        values: { role, company },
        setFieldValue,
        setFieldTouched,
    } = formikContext
    useEffect(() => {
        if (role?.id === ROLES.ROLE_ADMIN.id) {
            setFieldValue('company', null)
            setFieldTouched('company', false)
            setFieldValue('locations', [])
            setFieldTouched('locations', false)
        } else if (role?.id === ROLES.ROLE_COMPANY_MANAGER.id) {
            setFieldValue('locations', [])
            setFieldTouched('locations', false)
        }
    }, [role])
    useEffect(() => {
        setFieldValue('locations', [])
        setFieldTouched('locations', false)
    }, [company])
    return null
}

const FormTemplate = ({ handleSubmit, initialData }) => {
    const t = useTranslate()
    const navigate = useNavigate()
    const { setAlert } = useContext(AlertContext)

    const initialValues = {
        firstName: initialData?.firstName ?? '',
        lastName: initialData?.lastName ?? '',
        role: initialData?.role ?? null,
        email: initialData?.email ?? '',
        avatar: initialData?.avatar ?? null,
        company: initialData?.company ?? null,
        locations: initialData?.locations ?? [],
        active: initialData?.active ?? true,
    }

    const onSubmit = async (formData) => {
        try {
            await createEntityService(ENTITY.USER, formData)
            // await handleSubmit(formData)
            setAlert('form.success.successfully', ALERT_TYPES.SUCCESS)
            // history.goBack(-1)
        } catch (error) {
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    const requiredMessage = t('form.error.required')

    const validation = Yup.object().shape({
        firstName: Yup.string().required(requiredMessage),
        lastName: Yup.string().required(requiredMessage),
        email: Yup.string()
            .email(t('form.error.invalidEmail'))
            .required(requiredMessage),
        company: Yup.object().when('role', {
            is: (val) => val?.id === ROLES.ROLE_ADMIN.id,
            then: Yup.object().nullable(true),
            otherwise: Yup.object().nullable().required(requiredMessage),
        }),
        locations: Yup.array().when('role', {
            is: (val) =>
                val?.id !== ROLES.ROLE_ADMIN.id &&
                val?.id !== ROLES.ROLE_COMPANY_MANAGER.id,
            then: Yup.array().when('role', {
                is: (val) => val?.id === ROLES.ROLE_LOCATION_MANAGER.id,
                then: Yup.array()
                    .min(1, requiredMessage)
                    .max(1, t('form.error.oneLocation')),
                otherwise: Yup.array().min(1, requiredMessage),
            }),
            otherwise: Yup.array(),
        }),
        role: Yup.object().nullable().required(requiredMessage),
    })

    return (
        <div className="m-loginForm">
            <div className="m-loginForm__form -user">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={onSubmit}
                >
                    {({ values: { role, company } }) => (
                        <Form>
                            <UserFromContext />
                            <div className="_w">
                                <div className="_l4">
                                    <InputField
                                        name="firstName"
                                        type={INPUT_FILED_TYPE.TEXT}
                                        label="form.label.firstName"
                                        placeholder="form.label.firstName"
                                        required
                                    />
                                    <div className="m-email">
                                        <InputField
                                            name="email"
                                            type={INPUT_FILED_TYPE.EMAIL}
                                            label="form.label.email"
                                            placeholder="form.placeholder.emailExample"
                                            icon="address-sign"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="_l4">
                                    <InputField
                                        name="lastName"
                                        type={INPUT_FILED_TYPE.TEXT}
                                        label="form.label.lastName"
                                        placeholder="form.label.lastName"
                                        required
                                    />
                                    <SelectField
                                        name="role"
                                        label="form.label.role"
                                        placeholder="form.label.role"
                                        entityType={ENTITY.ROLE}
                                        required
                                        relationship
                                    />
                                </div>
                                <div className=" _l4">
                                    <FileUpload
                                        type={INPUT_FILED_TYPE.FILE}
                                        name="avatar"
                                        label="form.label.imageUpload"
                                        entityType={ENTITY.FILE}
                                    />
                                </div>

                                <div className="_l4">
                                    {role && role.id !== ROLES.ROLE_ADMIN.id && (
                                        <div>
                                            <SelectField
                                                name="company"
                                                label="form.label.company"
                                                placeholder="form.placeholder.selectCompany"
                                                required
                                                relationship
                                                entityType={ENTITY.COMPANY}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="_l4">
                                    {role &&
                                        (role.id ===
                                            ROLES.ROLE_REGIONAL_MANAGER.id ||
                                            role.id ===
                                                ROLES.ROLE_LOCATION_MANAGER
                                                    .id) &&
                                        company && (
                                            <div className="m-inlineFormRow-field">
                                                <MultiselectField
                                                    name="locations"
                                                    label="form.label.locations"
                                                    placeholder="form.placeholder.selectLocations"
                                                    relationship
                                                    required
                                                    reload={company.id}
                                                    entityType={ENTITY.LOCATION}
                                                    params={{
                                                        'company.id':
                                                            company.id,
                                                    }}
                                                />
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="m-checkbox -user">
                                <CheckboxField
                                    name="active"
                                    label="form.label.active"
                                />
                            </div>
                            <RadioField
                                name="rolesRadio"
                                entityType={ENTITY.ROLE}
                            />
                            <TextAreaField
                                name="description"
                                label="form.label.description"
                            />
                            <DateTimeField
                                name="validFrom"
                                label="form.label.validFrom"
                                placeholder="form.placeholder.selectDate"
                                dateFormat="d.m.Y"
                                required
                            />
                            <div className="m-mainButton _w">
                                <Button
                                    btnClass={BUTTON_STATUS.PRIMARY}
                                    color="#fff"
                                    label="button.submit"
                                    type={BUTTON_TYPE.SUBMIT}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default FormTemplate
