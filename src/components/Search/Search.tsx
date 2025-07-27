import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '../../store/slices/outfitsSlice';
import styles from './Search.module.css'
import { IoSearch } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { search } from 'store/slices/filterSlice';
import { RootState } from 'store/store';

export default function Search(){
    const [focused, setFocused] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    
    const handleSearch = () => {
        if(!searchTerm) return;
        searchParams.set('keyword', searchTerm)
        setSearchParams(searchParams);
        dispatch(search(searchTerm));
    };
    const isloading = useSelector((state: RootState) => state.filters.isLoading);
    const searchKey = useSelector((state: RootState) => state.filters.search);

    useEffect(() => setSearchTerm(searchKey), [searchKey])

    const resetSearch = () => {
        setSearchTerm('');
        searchParams.delete('keyword');
        setSearchParams(searchParams)
        dispatch(loading(false));
        dispatch(search(''));
    }
    return (
        <div className={`${styles.searchbox} ${focused ? styles.focus : ''}`}>
            {isloading ? <AiOutlineLoading3Quarters className={styles.loaderIcon}/>: <IoSearch className={styles.searchIcon} onClick={() => handleSearch()}/>}
            <input 
                className={styles.searchInput}
                placeholder='Find the items you are looking for'
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onKeyDown={(e) => {
                    if(e.code == "Enter"){
                        handleSearch()
                    }
                }}
            />
            { searchTerm && <IoMdCloseCircleOutline onClick={resetSearch} className={styles.searchIcon}/>}
        </div>
    )
}