import React from 'react';
import './CryptoPopUp.css';

const CryptoPaymentModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="modal-close" onClick={onClose}>&times;</button>

                {/* Content */}
                <div className='modal-content text-center'>
                    <p>We highly suggest <u>Exodus</u>: <a href="https://www.exodus.com/">https://www.exodus.com/</a></p>
                    <p>Exodus is a publicly traded company, listed on the NYSE American Exchange, and is trading under the ticker symbol &ldquo;EXOD&rdquo;.</p>
                    <img src="assets/exodus.png" alt="Exodus Logo" className='exodus'/>
                    <p className='mb-0'>With Exodus;</p>
                    <ol class="custom-number-list mt-0">
                        <li>
                            <span class="number">1. </span>
                            <span class="text">You can easily purchase BitCoin or any major cryptocurrency and trade it.</span>
                        </li>
                        <li>
                            <span class="number">2. </span>
                            <span class="text">Your crypto payment will jive with VIRON systems more efficiently.</span>
                        </li>
                    </ol>
                    <img src="assets/buy-and-sell-directly-in-your-wallet.png" alt="buy-and-sell-directly-in-your-wallet" className='buysell'/>
                </div>
            </div>
        </div>
    );
};

export default CryptoPaymentModal;
