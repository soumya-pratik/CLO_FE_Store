import { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearch } from "utils/customHooks";
import { useSearchParams } from "react-router-dom";
import { setFilter, search, resetSortBy, resetFilter, resetSearch } from 'store/slices/filterSlice';
import { RootState } from "store/store";


const PriceOption = {
     "Paid": "0",
     "Free": "1",
     "View only": "2",
} 

export default function Filters(){

    const [filterState, setFilterState] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const searchHandler = useSearch();

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>, op: string) => {
        let currFilter = [...filterState];
        if(e?.target?.checked) currFilter.push(PriceOption[op as keyof typeof PriceOption]);
        else currFilter = currFilter.filter((f) => f !== PriceOption[op as keyof typeof PriceOption])
        if(!currFilter.length) resetHandler()
        else searchParams.set('filter', currFilter.join(','))
        setFilterState(currFilter);
        setSearchParams(searchParams);
        dispatch(setFilter(currFilter));
    }

    const resetHandler = () => {
        setFilterState([]);
        searchParams.delete('filter');
        searchParams.delete('keyword');
        searchParams.delete('sortby');
        setSearchParams(searchParams);
        dispatch(resetFilter());
        dispatch(resetSearch());
        dispatch(resetSortBy());
    }

    const filterKey = useSelector((state: RootState) => {
        return state.filters.filter
    });

    useEffect(() => {
        setFilterState(filterKey)
    }, [filterKey])

    return (
        <div className={styles.filterbox}>
           <div className={styles.filters}>
                <span>Pricing Options</span>
                {Object.keys(PriceOption).map((op: string, ind)=> {
                    return (
                        <div className={styles.option} key={ind}>
                            <input
                                type="checkbox"
                                id={PriceOption[op as keyof typeof PriceOption]}
                                name={PriceOption[op as keyof typeof PriceOption]}
                                value={PriceOption[op as keyof typeof PriceOption]}
                                onChange={(e) => handleFilter(e, op)}
                                checked={filterState.includes(PriceOption[op as keyof typeof PriceOption])}
                            />
                            <label htmlFor={PriceOption[op as keyof typeof PriceOption]}>{op}</label>
                        </div>
                    )
                })}
              
           </div>
           <div className={styles.reset_filter}>
            <span onClick={() => resetHandler()}>RESET</span>
           </div>
        </div>
    )
}