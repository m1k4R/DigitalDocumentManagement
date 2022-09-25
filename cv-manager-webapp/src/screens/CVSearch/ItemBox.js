import ConfirmModal from 'components/ConfirmModal'
import { EDUCATIONS } from 'constants/enums'
import React, { useState } from 'react'
import { deleteEntityService, getEntityByIdService } from 'services/entity.service'
import { RESPONSE_TYPE } from 'utils/axiosClient'

const ItemBox = ({ item, reload, setReload }) => {

    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const { 
        application: { 
            id,
            applicantFirstname, 
            applicantLastname, 
            applicantEmail, 
            applicantPhone,
            applicantEducationLevel,
            cityName,
            coverLetterContent,
            coverLetterFileName,
            cvContent,
            cvFileName,
            dateCreated
        }, 
        highlights 
    } = item 

    const handleDownload = async () => {
        try {
            const response = await getEntityByIdService('admin/management/download-cv', id, {}, false, undefined, 'blob')
            const url = window.URL.createObjectURL(
                new Blob([response]),
              );
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute(
                'download',
                `${cvFileName}.pdf`,
              );
          
              // Append to html link element page
              document.body.appendChild(link);
          
              // Start download
              link.click();
          
              // Clean up and remove the link
              link.parentNode.removeChild(link);
        } catch(error) {
            console.log(error)
        }
    }

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true)
    }

    const handleDelete = async () => {
        try {
            await deleteEntityService('admin/management/delete', id, false)
            setOpenDeleteModal(false)
            setReload(!reload)
        } catch (error) {
            console.log(error)
            setOpenDeleteModal(false)
        }
        
    }

    const handleCancel = () => {
        setOpenDeleteModal(false)
    }

    return (
        <div className='_m6'>
            {/* <div className='itemBox' onClick={handleOpenDeleteModal}> */}
            <div className='itemBox'>
                <div className='title'>
                    <span className='name'>{applicantFirstname} {applicantLastname}</span>
                    <span className='education'>{EDUCATIONS.find(item => item.id === applicantEducationLevel)?.name }</span>
                </div>
                <span className='email'>{applicantEmail}</span>
                <span className='phone'>{applicantPhone}</span>
                <span className='city'>{cityName}</span>
                <div className='coverLetter'>{coverLetterContent}</div>
                {highlights.length > 0 && <div className='highlightsContainer' dangerouslySetInnerHTML={{ __html: highlights }}></div>}
                <div className='download' onClick={handleDownload}>Download CV</div>
            </div>
            {openDeleteModal && <ConfirmModal 
                                    message={`Are you sure you want to delete the document from the applicant ${applicantFirstname} ${applicantLastname}`} 
                                    handleConfirm={handleDelete}
                                    handleCancel={handleCancel}
                                />}
        </div>
    )
}

export default ItemBox