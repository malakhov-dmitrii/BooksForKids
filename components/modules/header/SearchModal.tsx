import { loadProductBySearch, resetProductBySearch } from '@/context/goods';
import { $productsBySearch } from '@/context/goods/state';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';
import { useLang } from '@/hooks/useLang';
import { handleCloseSearchModal } from '@/lib/utils/common';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';

const SearchModal = () => {
    const { lang, translations } = useLang()
    const [, setSearchValue] = useState('')
    const [, startTransition] = useTransition()
    const delayCallback = useDebounceCallback(1000)
    const productsBySearch = useUnit($productsBySearch)

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => setSearchValue(e.target.value))
    
        if (!e.target.value.length) {
          delayCallback(() => '')
          resetProductBySearch()
          return
        }
    
        delayCallback(() => loadProductBySearch({ search: e.target.value.trim() }))
      }

      const searchedProductsCategories = useMemo(
        () =>
          productsBySearch.items?.length
            ? [...new Set(productsBySearch.items.map((item) => item.category))]
            : [],
        [productsBySearch.items]
      )
    
      const searchedProductsTypes = useMemo(
        () => 
          productsBySearch.items?.length
            ? [
              ...new Map(
                productsBySearch.items.map((item) => [item.type, item])
              ).values(),
            ]
            : [],
        [productsBySearch.items]
      )

    return ( 
        <div className="search_modal">
            <div className='search_modal_top'>
            <button className="search_modal_close"
            onClick={handleCloseSearchModal} />
            <h3 className="search_modal_title">{translations[lang].header.search_books}</h3>
            <input 
            type="text" 
            className='search_modal_input' 
            placeholder={translations[lang].header.search_info}
            onChange={handleSearchInputChange} />
            {!!searchedProductsCategories.length && (
                <ul className='search-modal_links search-modal_categories'>
                    {searchedProductsCategories.map((category) => (
                    <li key={category}>
                        <Link
                        href={`/catalog/${category}`}
                        onClick={handleCloseSearchModal}
                        >
                        {[category]}
                        </Link>
                    </li>
                    ))}
                </ul>
                )}
                {!!searchedProductsTypes.length && (
                <ul className='search-modal_links'>
                    {searchedProductsTypes.map((item) => (
                    <li key={item.type}>
                        <Link
                        href={`/catalog/${item.category}?type=${item.type}`}
                        onClick={handleCloseSearchModal}
                        >
                        {[item.type]}
                        </Link>
                    </li>
                    ))}
                </ul>
                )}
                </div>
                <div className='search_modal_bottom'>
                <ul className='search-modal_results'>
                {(productsBySearch.items || []).map((item) => (
                    <li key={item._id} className='search-modal_results_item'>
                    <Link
                        href={`/catalog/${item.category}/${item._id}`}
                        className='search-modal_results_item_link'
                        onClick={handleCloseSearchModal}
                    >
                        <div className='search-modal_results_item_left'>
                        <Image
                            src={item.images[0]}
                            alt={item.name}
                            width={100}
                            height={100}
                            className='search-modal_results_item_img'
                        />
                        </div>
                        <div className='search-modal_results_item_inner'>
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.type}</p>
                        </div>
                    </Link>
                    </li>
                ))}
                </ul>
                </div>
            </div>
     );
}
 
export default SearchModal;