import React from 'react';
import './CryptoPopUp.css';

const CryptoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="modal-close" onClick={onClose}>&times;</button>

                {/* Logo */}
                <div className="modal-logo-container">
                    <img
                        src="https://viron.network/assets/img/viron-logo.svg"
                        alt="VIRON Logo"
                        className="modal-logo"
                    />
                </div>

                {/* Heading */}
                <h4 class="article-heading">ARTICLE:</h4>
                <h4 class="crypto-subheading"><u>CRYPTO PAYMENT is PREFERRED – WHY?</u></h4>

                {/* Content */}
                <div className="modal-content">
                    <p>
                        The public is now much more aware of the issues and problems associated with fiat
                        currency and instruments, particularly for companies with a powerful product launch.
                    </p>
                    <p>
                        <strong>VIRON</strong> is engineered to level the playing field for everyone, which is
                        expected to drive growth and generate revenues at high velocity.
                    </p>
                    <p>
                        With that said, any savvy business person would want to grow without hindrance and avoid the 
                        <strong><em><u> bottleneck risks </u></em></strong>
                        often associated with fiat instruments and their payment methods.
                    </p>
                    <p>
                        Furthermore, without a doubt, Cryptocurrency, with an emphasis on Bitcoin, is no longer
                        “the wave of the future.” <strong>It is widespread and is HERE NOW!</strong>
                    </p>
                    <p className="modal-highlight">
                        Therefore, for the sake of your <strong>VIRON Home-Business (VHB)</strong> and for
                        everyone coming into your downline, <strong><u>Cryptocurrency is PREFERRED.</u></strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CryptoModal;
