
import styles from './SortBy.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setSortBy } from "store/slices/filterSlice";
import { RootState } from "store/store";



export default function SortBy(){
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const handleSortBy = (sortVal: string) => {
        if(!sortVal) return;
        searchParams.set('sortby', sortVal)
        setSearchParams(searchParams);
        dispatch(setSortBy(sortVal));
    };
    const sortKey = useSelector((state: RootState) => state.filters.sortBy);

    const options = [
        { label: 'Item Name (Default)', value: 'name' },
        { label: 'Higher Price', value: 'high-to-low' },
        { label: 'Lower Price', value: 'low-to-high' },
    ];

    return (
        <div className={styles.sort_by}>
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={sortKey}
            onChange={(e) => handleSortBy(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )
}