import React from 'react';
import './CryptoPopUp.css';

const PreLaunchModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div className='modal-content'>
                    <p className='text-blue'>For a <u>very</u> limited time, deeply discounted <strong>Direct Referrals (DRs)</strong> are available during the PreLaunch period only. </p>
                    <p className='text-blue'>Again, according to the <strong><u>SAVE CLUB / 2x Forced Matrix / Compensation Plan</u></strong>, you and everyone in your downline will only need <u>two DRs</u> to qualify for optimal compensation/income.</p>
                    <p className='text-red'><em><u>DRs adjust to demand</u></em><em>, and prices can increase significantly at any time without notice. </em></p>
                    <p className='text-red'><em>Please take action accordingly. </em></p>
                </div>
            </div>
        </div>
    );
};

export default PreLaunchModal;
