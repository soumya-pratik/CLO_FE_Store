import styles from "./NoResult.module.css"


export default function NoResult(){
    return (
        <div className={styles.no_results}>
            <img
                src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                alt="No results"
                className={styles.no_results__image}
            />
            <h2>No Results Found</h2>
            <p>Try adjusting your search or filters.</p>
        </div>
    )
}