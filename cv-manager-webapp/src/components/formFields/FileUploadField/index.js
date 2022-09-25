import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'

import { useField } from 'formik'
import * as Dropzone from 'react-dropzone/dist/index'
import axiosClient, { BASE_URL, POST } from 'utils/axiosClient'

import ENTITY from 'constants/entities'

import Icon from 'components/Icon'
import Alert from 'components/Alert'

const FileUpload = ({ name, type, label, entityType }) => {
    const t = useTranslate()
    const [field, meta, helpers] = useField(name)
    const [imagePath, setImagePath] = useState(
        field.value ? field.value.path : null
    )
    const [file, setFile] = useState(field.value ? field.value.name : null)
    const { setValue } = helpers

    useEffect(() => {
        if (field.value) {
            setValue({ ...field.value, entityType })
        }
    }, [])
    const onDrop = useCallback(
        (acceptedFiles) => {
            const formData = new FormData()
            const acceptedData = acceptedFiles[0]
            formData.append('file', acceptedData)

            if (entityType) {
                axiosClient(POST, ENTITY.SYS_FILE, formData)
                    .then(async ({ data }) => {
                        const { id, path } = data
                        setImagePath(path)
                        setValue({ id, entityType })
                        setFile(path)
                    })
                    .catch((err) => {
                        return <Alert />
                    })
            } else {
                setValue(acceptedData)
                setFile(acceptedData.name)
            }
        },
        [setValue]
    )
    const { getRootProps, getInputProps, isDragActive } = Dropzone.useDropzone({
        onDrop,
    })

    return (
        <div className="m-fileDragAndDrop">
            <label>{t(label)}</label>

            <div {...getRootProps()} className="a-file">
                <input {...getInputProps()} />
                {imagePath ? (
                    <>
                        <div
                            className={`imageContainer ${
                                imagePath ? '' : '-noImage'
                            }`}
                        >
                            {imagePath && (
                                <img
                                    className="image"
                                    src={`${BASE_URL}${imagePath}`}
                                    alt={imagePath}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <div className="file">
                        <Icon name="file" size={48} />
                        {file}
                    </div>
                )}

                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>{t('form.placeholder.dragNDrop')}</p>
                )}
            </div>
        </div>
    )
}

FileUpload.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    entityType: PropTypes.string
}

export default FileUpload
