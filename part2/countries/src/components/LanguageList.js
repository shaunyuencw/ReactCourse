import Language from "./Language";

const LanguageList = ({ languages }) => {
    return (
        <>
            <h3>Languages</h3>
            <ul>
                {Object.entries(languages).map( ([key, language] ) => <Language key={key} language={language} />)}
            </ul>
        </>
    )
}

export default LanguageList;