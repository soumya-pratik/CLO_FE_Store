import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './ProductList.module.css';
import ProductCard from "../ProductCard/ProductCard";
import { OutfitState } from "../../store/slices/outfitsSlice";
import { useFetchProducts } from 'utils/customHooks';

export default function ProductList(props: any){
    const fetchData = useFetchProducts();
    let {products, skeleton = false} = props; 
    return (
        
            <InfiniteScroll
                dataLength={0}
                next={fetchData}
                style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
                hasMore={false}             // disabling it as i need unique data for infite scroll and duplicate records are difficult to handle on filter and sort
                loader={<h4>Loading...</h4>}
            >
                <div className={styles.product_container}>
                    {products.map((pd: OutfitState, ind: string) => <ProductCard prodDetails={pd} key={pd?.id + ind || ind} skeleton={skeleton} />)}
                </div>
            </InfiniteScroll>
    );
}