import styles from './styles.module.scss';
import Link from 'next/link';
import { useContext } from 'react';

import { FiLogOut} from 'react-icons/fi';

import { AuthContext } from '../../contexts/AuthContext';


export function Header(){

    const { signOut } = useContext(AuthContext)

    return(

        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
        <Link href="/dashboard">
            <img src='/firmasLogoPizza.png' width={150} height={60}/>
        </Link>

        <nav className={styles.menuNav}>
            <Link legacyBehavior href="/category">
                <a>Categoria</a>
            </Link>
            <Link legacyBehavior href="/product">
                <a>Cardapio</a>
            </Link>

            <button onClick={ signOut }>
                <FiLogOut  color='#fff' size={24}/>
            </button>
        </nav>

            </div>

        </header>

    )
}