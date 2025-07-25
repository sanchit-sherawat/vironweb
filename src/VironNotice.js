import Layout from '../components/Layout';
import './VironNotice.css';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoModal from './CryptoPopUp';
import CryptoPaymentModal from './CryptoPaymentPopUp';
import PreLaunchModal from './PreLaunchPopup';

// import Logo from '../../public/assets/';// Pl   ace your VIRON logo in the same folder
import { API_BASE_URL } from './config';

function VironNotice() {
    let userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: '',
        btc_txn: '',
        eth_txn: '',
        usdt_txn: ''
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalPaymentOpen, setModalOpenPayment] = useState(false);
    const [isModalPreLaunchOpen, setModalOpenPreLaunch] = useState(false);
    const submitSingleTxn = async (data) => {
        // at least one value will be there
        if (!data.btc_txn && !data.eth_txn && !data.usdt_txn) {
            alert('Please enter valid  transaction ID.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (res.ok) {
                alert(`Your crypto payment has been submitted!\nPlease click OK to view an important NOTIFICATION.`);
                setFormData({
                    user_id: '',
                    btc_txn: '',
                    eth_txn: '',
                    usdt_txn: ''
                });
                navigate('/paymentlandingpage');
            } else {
                alert('Error: ' + result.message);
            }
        } catch (err) {
            alert('Failed to submit payment.');
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            user_id: userId,
            btc_txn: formData.btc_txn,
            eth_txn: formData.eth_txn,
            usdt_txn: formData.usdt_txn
        };

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (res.ok) {
                alert(`Your crypto payment has been submitted!\nPlease click OK to view an important NOTIFICATION.`);
                setFormData({
                    user_id: '',
                    btc_txn: '',
                    eth_txn: '',
                    usdt_txn: ''
                });
                navigate('/paymentlandingpage');
            } else {
                alert('Error: ' + result.message);
            }
        } catch (err) {
            alert('Failed to submit payment.');
            console.error(err);
        }
    };
    return (
        <Layout>
            <div className='container'>
                <div className="row">
                    <div className='col'>
                        <div style={{ paddingTop: '2rem' }} className="text-center">
                            <img src='https://viron.network/assets/img/viron-logo.svg' alt="Viron Logo" className="img-logo-center" />
                            <h2 className='mtb-15' style={{ fontSize: '2.55em' }}> </h2>
                            <h3 className='text-red mt-0'><strong><u>CRITICAL NOTICES & INSTRUCTIONS.</u></strong></h3>
                        </div>
                        <div>
                            <h3 className='text-red text-center mb-0'><strong>NOTICE 1: </strong></h3>
                            <p className='mt-0  '>The following simple instructions are to help you set up your <strong><u>VIRON Home-Business (&ldquo;VHB&rdquo;)</u></strong> and guide you through making a payment correctly, the first time. <strong className='text-red'>This will only take a few minutes, and once you complete this ONE-TIME process, your VHB will be fully automated.</strong></p>
                            <p class=" ">By the way, we understand your frustrations from the lack of success in this industry. We want you to know that you have come to the right place, and at the best time. <span className='text-blue'>Please understand that you are now entering a 100% performance-guaranteed environment.</span> This means that after you have engaged and have settled your payment with VIRON, your funds will be placed in our ESCROW ACCOUNT. At each step of the process, for your convenience and benefit, we will precisely follow the instructions described and act on your behalf. </p>
                            <p className='pb-25'><strong><em>&ldquo; &hellip;Systems Prevail&rdquo;</em></strong>. In the world that we live in, no one can guarantee you perfection. However, we genuinely believe and have utmost confidence that <strong>your VIRON Home-Business can give you the best chance for success.</strong> <u className='text-red'>VIRON is to be by your side long term. For your success, VIRON means serious business. Please read everything carefully to ensure you have the correct expectations.</u></p>
                            <h3 className='text-red text-center mb-0 mt-0'><strong>NOTICE 2: </strong></h3>
                            <p className='text-center pb-25 mt-0'>The qualified, third-party MLM company that is integrated with VIRON systems is: &ldquo;<strong>SAVE CLUB</strong>&rdquo; (<strong>SC</strong>). <em>*Their information and details are located on the left column of this page, under &ldquo;MLM COMPANY INFORMATION&rdquo;. </em><strong>NOTICE: Although SC has been integrated with VIRON systems, please note that VIRON and SC (a third-party company) are <u>separate entities</u>.</strong></p>
                            <h3 className='text-red text-center mb-0 mt-0'><strong>NOTICE 3: </strong></h3>
                            <p className='text-red text-center mt-0  '>Know your business costs. The itemized cost and details of your <strong><u>VIRON Home-Business (&ldquo;VHB&rdquo;)</u></strong> is as follows:</p>
                            <ul className='pb-15 mb-0'>
                                <li><strong className='text-red tooltip'><u>SAVE CLUB (SC) Annual Fee: $300</u>
                                    <span className="tooltip-text">The SAVE CLUB (SC) Annual Fee is actually $299.97. To simplify, we are referring to it as “$300”.</span>
                                </strong>. *For your convenience, after you make full payment to VIRON, we will <u>correctly</u> set up your account with SC. Furthermore, to ensure your Turn-Key experience and to ensure you are in the correct position within the VIRON matrix, always allow VIRON professionals to handle your account setup. <strong>It is <u>not</u> recommended for anyone to set-up their accounts directly with SC.</strong> <span className='text-blue'>*EXTREME VALUE: Please note that with this annual payment to SC, you will gain access to the SC product and enjoy its associated savings.</span> <span className='text-highlighted'>NOTE: <u>The <strong>SAVINGS</strong> alone from your daily regular spending can exceed the entire cost of your VIRON Home-Business</u>!</span></li>
                                <li><strong>VIRON One-Time Registration</strong> <strong>Fee</strong> <del>$39.95</del> (waived during pre-launch).</li>
                                <li><strong>VIRON Annual Registration Fee</strong> <del>$149.95</del> (waived during pre-launch).</li>
                                <li><strong>VIRON Direct Referrals (DRs)</strong> $195 each x2 = <del>$390</del> <span className='text-red'><strong>(<a style={{ cursor: 'pointer' }} onClick={() => setModalOpenPreLaunch(true)}><u>reduced to only $199 total during Pre-Launch</u></a>).</strong></span><PreLaunchModal isOpen={isModalPreLaunchOpen} onClose={() => setModalOpenPreLaunch(false)} /> <em>*This limited pricing is subject to change without notice and in accordance with market demand. NOTE: There is a limit of 2 DRs per member, because you will only need 2 DRs to qualify for all commissions and bonuses per the SC Compensation Plan. </em></li>
                            </ul>
                            <h2 className='text-red text-tab pb-5 mt-10'><strong>TOTAL COST DURING PRE-LAUNCH</strong>:<br />Above totals $499.00 + $20 crypto transaction fee = <strong>$<u>519.00</u></strong></h2>
                            <p className='text-center text-blue pb-10'><strong>NOTE: </strong>If the cryptocurrency value drops while we are processing your transaction and setting up your account, it may cause a stall in the process. In this case, you will be contacted to provide the difference. <strong><em>*To avoid the risk of this inconvenience, the &ldquo;crypto transaction fee&rdquo; will also help cover the typical fluctuations in the crypto market for you.</em></strong></p>
                            <p className='text-center mb-0'><strong>:::</strong></p>
                            <h3 className='text-red text-center mt-0 paymentArea'><strong>PAYMENT AREA.</strong></h3>
                            <p className='text-center   mt-0 mb-0'>During Pre-Launch, we are <u>directly</u> accepting cryptocurrency payments:<br />Bitcoin (<strong>BTC</strong>),<br />Ethereum (<strong>ETH</strong>),<br /><strong>USDT</strong> (<em>Tron Network</em>).</p>
                            <p className='text-center text-red mt-0 mb-0'>To complete your <strong>VIRON Home-Business</strong> (&ldquo;<strong>VHB</strong>&rdquo;),<br />please send your Cryptocurrency payment to:</p>
                            <hr className='mt-0' />
                            <p className='text-center text-blue'><strong>VIRON.NETWORK ACCOUNTING</strong><br />
                                <strong>Cryptocurrency Wallets</strong><br />
                                <strong><em>(Bitcoin (BTC) is the preferred payment method)</em>:</strong></p>
                            <hr className='mb-0' />
                            <img className='img-center' src="assets/bitcoin-qr.png" alt="bitcoin-qr"></img>
                            <p className='text-center'><strong>BitCoin (BTC):</strong></p>
                            <p className='text-center pb-25'>1E92bqvm6JQ2DYAkHzjpdjRSWFDzx2dqk7</p>
                            <p className='text-center'><strong>Ethereum (ETH): </strong></p>
                            <p className='text-center pb-25'>0x0E83379C21dc46B6e989A316a07E503733cc53c8</p>
                            <p className='text-center'><strong>USDT (Tron) Network: </strong></p>
                            <p className='text-center pb-10 mb-0'>TEtVu6h7Fr6u8KCLXac8ywZqgdrguPzS4Q</p>
                            <p className='text-center mt-0'><strong>:::</strong></p>
                            <p className='text-center text-red'><strong>NOTE: When you make your manual crypto payment, please make sure to copy your Crypto <u>Transaction ID #</u>. Then paste or enter it in the corresponding field below.</strong></p>
                            <p className='text-center text-red'><strong>FURTHER NOTE: If you&rsquo;re using the Exodus crypto wallet, please input your <u>VIRON Username</u> (into the Exodus: Transaction / "Memo/Note" field) <u>to help us locate and identify your payment as quickly as possible</u>.</strong></p>
                            <div className="transaction-form-container pb-25">
                                <div className="crypto-form">
                                    {[
                                        { id: 'btc_txn', label: 'BTC Blockchain Transaction ID#' },
                                        { id: 'eth_txn', label: 'ETH Blockchain Transaction ID#' },
                                        { id: 'usdt_txn', label: 'USDT (Tron) Blockchain Transaction ID#' },
                                    ].map(({ id, label }) => (
                                        <form
                                            key={id}
                                            className="form-row"
                                            style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}
                                            onSubmit={e => {
                                                e.preventDefault();
                                                // Only submit the current field
                                                const data = {
                                                    user_id: userId,
                                                    btc_txn: id === 'btc_txn' ? formData.btc_txn : '',
                                                    eth_txn: id === 'eth_txn' ? formData.eth_txn : '',
                                                    usdt_txn: id === 'usdt_txn' ? formData.usdt_txn : '',
                                                };
                                                submitSingleTxn(data);
                                            }}
                                        >
                                            <label htmlFor={id} style={{ minWidth: 220 }}>{label}</label>
                                            <input
                                                type="text"
                                                id={id}
                                                name={id}
                                                value={formData[id]}
                                                onChange={handleChange}
                                                placeholder={`Enter your ${label}`}
                                                style={{ flex: 1, marginRight: 12 }}
                                            />
                                            <button type="submit">Submit</button>
                                        </form>
                                    ))}
                                </div>
                            </div>

                            <p className=' '><strong className='text-red'>FINAL NOTE: </strong>Once you have completed the above instructions and have sent in your crypto payment, <u>we will notify you accordingly</u>. When your VIRON Home-Business is confirmed, you can relax, sit back, and watch your business grow.</p>

                            <p className='text-center text-red mt-0 pb-10'><a style={{ cursor: 'pointer' }} onClick={() => setModalOpenPayment(true)}><strong><u>NEED HELP WITH CRYPTO PAYMENT?  CLICK HERE</u></strong></a></p>
                            <CryptoPaymentModal isOpen={isModalPaymentOpen} onClose={() => setModalOpenPayment(false)} />
                            <p className='text-center text-red pb-10'><a style={{ cursor: 'pointer' }} onClick={() => setModalOpen(true)}><u><strong>CRYPTO PAYMENT PREFERRED - WHY? CLICK HERE</strong></u></a></p>
                            <CryptoModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

                            <p className='text-center text-blue mt-0'>FYI: *STRIPE payment method, coming soon.</p>
                            <p className='text-center text-blue'>&amp;</p>
                            <p className='text-center text-blue pb-25'>*Automated Crypto-Currency Payment Processing by TYGA-Pay, coming soon.</p>
                            <p className='text-center pt-20'><strong><em>-The VIRON Administration</em></strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default VironNotice;
