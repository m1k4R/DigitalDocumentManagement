import Button from 'components/Button'
import Loader from 'components/Loader'
import { BUTTON_STATUS } from 'constants/enums'
import useFetchData from 'hooks/useFetchData'
import React, { useEffect, useState } from 'react'
import CombinedForm from './CombinedForm'
import ContentForm from './ContentForm'
import EducationForm from './EducationForm'
import GeolocationForm from './GeolocationForm'
import ItemBox from './ItemBox'
import NameForm from './NameForm'
import PhraseForm from './PhraseForm'

const CVSearch = () => {

    const [data, setData] = useState()
    const [isLoadingSearch, setIsLoadingSearch] = useState()

    const [showNameForm, setShowNameForm] = useState(false)
    const [showEducationForm, setShowEducationForm] = useState(false)
    const [showContentForm, setShowContentForm] = useState(false)
    const [showCombinedForm, setShowCombinedForm] = useState(false)
    const [showGeolocationForm, setShowGeolocationForm] = useState(false)
    const [showPhraseForm, setShowPhraseForm] = useState(false)

    const [reload, setReload] = useState(false)

    const { searchResults, isLoading } = useFetchData('admin/management/documents', {}, reload, true, false)

    useEffect(() => {
      if (searchResults?.length) {
        setData(searchResults)
      }
    }, [searchResults])
    

    return (
        <div className='p-cvSearch'>
            <h6>Collection of submitted CV documents and cover letters</h6>
            <div className='p-cvSearch__filters'>
                <span className='searchBy'>Search by:</span>
                <Button btnClass={BUTTON_STATUS.PRIMARY} label='button.searchByNameAndSurname' onClick={() => setShowNameForm(true)} />
                <Button btnClass={BUTTON_STATUS.PRIMARY} label='button.searchByEducation' onClick={() => setShowEducationForm(true)} />
                <Button btnClass={BUTTON_STATUS.PRIMARY} label='button.searchByContent' onClick={() => setShowContentForm(true)} />
                <Button btnClass={BUTTON_STATUS.PRIMARY} label='button.searchByCombinedParameters' onClick={() => setShowCombinedForm(true)} />
                <Button btnClass={BUTTON_STATUS.PRIMARY} label='button.searchByPhrase' onClick={() => setShowPhraseForm(true)} />
                <Button btnClass={BUTTON_STATUS.PRIMARY} label='button.searchByGeolocation' onClick={() => setShowGeolocationForm(true)} />
            </div>
            <h6 className='p-cvSearch__resultsTitle'>Search results</h6>
            <div className='p-cvSearch__results'>
                <div className='_w'>
                    {data?.map((item, index) => <ItemBox key={index} item={item} reload={reload} setReload={setReload} />)}
                </div>
            </div>
            {showNameForm && <NameForm open={showNameForm} setOpen={setShowNameForm} setData={setData} setIsLoading={setIsLoadingSearch} />}
            {showEducationForm && <EducationForm open={showEducationForm} setOpen={setShowEducationForm} setData={setData} setIsLoading={setIsLoadingSearch}  />}
            {showContentForm && <ContentForm open={showContentForm} setOpen={setShowContentForm} setData={setData} setIsLoading={setIsLoadingSearch}  />}
            {showCombinedForm && <CombinedForm open={showCombinedForm} setOpen={setShowCombinedForm} setData={setData} setIsLoading={setIsLoadingSearch}  />}
            {showGeolocationForm && <GeolocationForm open={showGeolocationForm} setOpen={setShowGeolocationForm} setData={setData} setIsLoading={setIsLoadingSearch}  />}
            {showPhraseForm && <PhraseForm open={showPhraseForm} setOpen={setShowPhraseForm} setData={setData} setIsLoading={setIsLoadingSearch}  />}
            {isLoading || isLoadingSearch && <Loader />}
        </div>
    )
}

export default CVSearch