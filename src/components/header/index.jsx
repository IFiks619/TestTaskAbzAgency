import React from "react";

import logo from '../../assets/img/logo.png'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className={styles.root}>
                    <div>
                        <img src={logo} alt="test task logo" />
                    </div>
                    <div>
                        <button>Users</button>
                        <button>Sign up</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;