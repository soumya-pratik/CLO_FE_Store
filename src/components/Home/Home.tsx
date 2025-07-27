import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToMaster, loading } from '../../store/slices/outfitsSlice';
import { RootState } from '../../store/store';
import styles from './Home.module.css';
import axios from 'axios';
import Search from 'components/Search/Search';
import Filters from 'components/Filters/Filters'
import ProductList from 'components/ProductList/ProductList';
import { useFetchProducts, useSearch } from 'utils/customHooks';
import NoResult from 'components/NoResult/NoResult';
import ProductCard from 'components/ProductCard/ProductCard';
import SortBy from 'components/SortBy/SortBy';

export default function Home (){
    
    const dispatch = useDispatch();
    const searchHandler = useSearch();
    const masterList = useSelector((state: RootState) => state.outfits.masterList);
    const outfits = useSelector((state: RootState) => state.outfits.outfits);
    const filterKey = useSelector((state: RootState) => state.filters.filter);
    const searchKey = useSelector((state: RootState) => state.filters.search);
    const sortBy = useSelector((state: RootState) => state.filters.sortBy);

    const isloading = useSelector((state: RootState) => {
        return state.filters.isLoading
    })

    useEffect(() => {
        if(searchKey || filterKey){
            dispatch(loading(true));
            searchHandler(searchKey, masterList, filterKey, sortBy);
        }
    }, [filterKey, searchKey, sortBy])

    const fetchData = useFetchProducts();
    const fetchOutfits = () => {
        fetchData();
    }

    useEffect(() => {
        fetchOutfits();
    },[])

    return (
        <div className={styles.main_page}>
            <div className={styles.page_header}>
                <div className={styles.header_container}>
                    <span className={styles.page_title}>
                        Share your ideas. 
                        <br/>
                        Empower your design.
                    </span>
                    <Search/>
                    <Filters/>
                </div>
            </div>
            <div className={styles.product_list}>
                <SortBy />
                {outfits.length ? 
                    <ProductList products={outfits}/> :
                        isloading ? 
                        <ProductList products={Array.from({ length: 20 })} skeleton /> :
                            <NoResult />
                }
            </div>
        </div>      
    )
}