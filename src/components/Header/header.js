import React from 'react';
import style from './header.css';

const Header = () => {
    return (
        <div>
            <header className = {style.header}>
                <div className = {style.headerOpt}>
                    header
                </div>
            </header>
        </div>
    )
}

export default Header;