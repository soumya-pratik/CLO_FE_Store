import { useEffect } from "react";
import LazyLoad from "vanilla-lazyload";
import styles from "./ProductCard.module.css"
import { OutfitState } from "../../store/slices/outfitsSlice";
import { PricingOption } from "../../store/slices/outfitsSlice";

interface ProductStateProps{
    prodDetails?: OutfitState,
    skeleton?: boolean
}

export default function ProductCard(props: ProductStateProps){
    const { prodDetails, skeleton = false } = props;
    useEffect(() => {
        new LazyLoad({
          elements_selector: ".lazy",
        });
      }, []);
    return (
        <div className={`${styles.card} ${skeleton ? styles.skeleton : ''}`}>
            <div className={styles.card_image}>
                {!!prodDetails?.imagePath && <img 
                    data-src={prodDetails?.imagePath} 
                    alt={prodDetails?.title}
                    className={`lazy ${styles.pd_Image}`}
                />}
                <div className={styles.cart_icon}>🛒</div>
            </div>
            <div className={styles.card_content}>
                <div className={styles.card_creator}>
                    <p className={styles.username}>{prodDetails?.creator}</p>
                    <h3 className={styles.title}>{prodDetails?.title}</h3>
                </div>
                <div className={styles.card_price}>
                    <p className={styles.price}>
                        {prodDetails?.pricingOption == PricingOption.PAID ? "Paid" : prodDetails?.pricingOption == PricingOption.FREE ? "Free" : "View only" }
                    </p>
                    {prodDetails?.pricingOption == PricingOption.PAID && <p>{prodDetails?.price} $</p>}
                </div>
            </div>
        </div>
    )
}