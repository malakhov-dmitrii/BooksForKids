import { useLang } from '@/hooks/useLang';
import { handleCloseSearchModal } from '@/lib/utils/common';

const SearchModal = () => {
    const { lang, translations } = useLang()

    return ( 
        <div className="search_modal">
            <button className="search_modal_close"
            onClick={handleCloseSearchModal} />
            <h3 className="search_modal_title">{translations[lang].header.search_books}</h3>
            <input type="text" className='search_modal_input' placeholder={translations[lang].header.search_info} />
        </div>
     );
}
 
export default SearchModal;