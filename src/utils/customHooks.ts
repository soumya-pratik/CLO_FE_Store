import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { loading, search, setFilter, setSortBy } from 'store/slices/filterSlice';
import { addToMaster, OutfitState, setOutfits } from 'store/slices/outfitsSlice';
import { RootState } from 'store/store';

const endpoint = 'https://closet-recruiting-api.azurewebsites.net/api/data';


export function useSearch(){
    const dispatch = useDispatch();
    return function(skey: string | null, masterList: OutfitState[], filterKey: string[], sortBy: string | null){
        let searchKey = skey
        let searchedOutfits = [...masterList];
       
        if(searchKey){
            console.log("searchKey", searchKey);
            dispatch(search(searchKey));
            searchedOutfits = masterList.filter((of) => {
                if(of.creator.toUpperCase().includes(searchKey.toUpperCase()) ||
                    of.title.toUpperCase().includes(searchKey.toUpperCase())
                ){
                    return true;
                }
                return false;
            })
        } 

        if(filterKey.length){
            console.log("filterKey", filterKey);
            dispatch(setFilter(filterKey));
            searchedOutfits = searchedOutfits.filter((of) => {
                if(filterKey?.includes(of.pricingOption + '')){
                    return true;
                }
                return false;
            })
        }

        if(sortBy){
            console.log("filterKey", sortBy);
            dispatch(setSortBy(sortBy));
            searchedOutfits = [...searchedOutfits].sort((a: OutfitState, b: OutfitState) => {
                if (sortBy === 'high-to-low' && b.price && a.price) {
                    return b.price - a.price;
                } else if (sortBy === 'low-to-high' && b.price && a.price) {
                    return a.price - b.price;
                } else if (sortBy === 'name' && b.title && a.title) {
                    return a.title.localeCompare(b.title);
                } else {
                    return 0;
                }
            });
        }
        
        dispatch(setOutfits(searchedOutfits))
        dispatch(loading(false));
    }
}
export function useFetchProducts(){ 
    const dispatch = useDispatch();
    const serachFilter = useSearch();
    const [searchParams, setSearchParams] = useSearchParams();
    const masterList = useSelector((state: RootState) => state.outfits.masterList);
    return function(){
        let searchKey = searchParams.get('keyword');
        let filterKey = searchParams.get('filter');
        let sortbyKey = searchParams.get('sortby');
        if(!sortbyKey?.length) sortbyKey = 'name'; // default sort by name
        let filterArr: string[] = [];
        if(filterKey?.length){
            filterArr = filterKey?.split(',')
        } else {
            filterArr = [];
            searchParams.delete('filter');
            setSearchParams(searchParams);
        }
        dispatch(loading(true));
        // filterArr = filterKey?.length ? filterKey?.split(',') : []
        axios.get(endpoint).then( (response) => {
            console.log('response', response);
            dispatch(loading(false));
            serachFilter(searchKey, masterList.concat(response.data), filterArr, sortbyKey);
            dispatch(addToMaster(masterList.concat(response.data)));
        })
    }
}