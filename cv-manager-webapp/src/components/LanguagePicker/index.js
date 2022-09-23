import React, { useContext } from 'react'

import { TranslationContext } from 'contexts/TranslationContext'

import clickOutsideHOC from 'components/wrappers/clickOutsideHOC'

const LANGUAGES = [
    { id: 1, name: 'English', code: 'en' },
    { id: 2, name: 'Serbian', code: 'sr' },
]

const LanguagePicker = ({ open }) => {
    const { translations, setTranslations } = useContext(TranslationContext)

    const currentLanguage = LANGUAGES.find(
        (language) => language.code === translations.locale
    )

    if (!currentLanguage) return null

    return (
        <div className="m-languagePicker">
            <div>
                <span className="m-languagePicker__container">
                    {currentLanguage.code}{' '}
                    <span className={`a-chevron ${open ? '-up' : '-down'}`} />{' '}
                </span>
            </div>
            <ul className={`m-languagePicker__popup ${open ? '-open' : ''}`}>
                {LANGUAGES.map((language) => (
                    <li
                        key={language.id}
                        onClick={() => setTranslations(language)}
                    >
                        {language.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default clickOutsideHOC(LanguagePicker)
