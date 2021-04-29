import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <div className="footer-info">
                        <p>This app use <a
                            href="https://developers.themoviedb.org/3/getting-started/introduction">The
                            Movie Database API</a></p>
                        <p>App made by <a href="https://github.com/FedorLivshits/Movie-Watchlist-React">Fedor
                            Livshits</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
