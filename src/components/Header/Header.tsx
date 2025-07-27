import styles from './Header.module.css';
import headerLogo from '../../assets/header_logo.svg';

export default function Header (){
    return (
        <header className={styles.header}>
            <img src={headerLogo} alt="header_logo" />
        </header>  
    )
}