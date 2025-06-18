import Layout from '../components/Layout';
import './VironNotice.css';
import { useState } from 'react';
// import Logo from '../../public/assets/';// Pl   ace your VIRON logo in the same folder
import API_BASE_URL from './config';

function VironNotice() {
    let userId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        user_id: '',
        btc_txn: '',
        eth_txn: '',
        usdt_txn: ''
    });

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
            alert('Payment submitted successfully!');
            setFormData({
                user_id: '',
                btc_txn: '',
                eth_txn: '',
                usdt_txn: ''
            });
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
            <div className="notice-container">
                <div style={{ textAlign: "center", marginBottom: '2rem' }}>
                <img src='/assets/viron-logo.svg' alt="Viron Logo" className="logo1" />
                </div>

                <h1 className="member-title">MEMBER <span className="underline">CENTER</span></h1>
                <p className="dots">:::</p>

                <h2 className="critical-title">CRITICAL NOTICES & INSTRUCTIONS.</h2>

                <h3 className="notice-title">NOTICE 1:</h3>
                <p className="notice-text">
                    The following simple instructions are to help you set up your <strong>VIRON Home-Business (“VHB”)</strong> and guide you through making a payment correctly, the first time.
                    <span className="highlight"> This will only take a few minutes, and once you complete this ONE-TIME process, your VHB will be fully automated.</span>
                </p>

                <p className="info-text">
                    By the way, we understand your frustrations from the lack of success in this industry. We want you to know that you have come to the right place, and at the best time in the industry.
                    <span className="blue-highlight"> Please also understand that you are now entering a 100% performance-guaranteed environment. *VIRON is self-governed.</span>
                    This means that after you have engaged and have settled your payment with VIRON, your funds will be placed in our ESCROW ACCOUNT...
                </p>

                <p className="quote">
                    <em>“People Fail…Systems Prevail”</em>. In the world that we live in, no one can guarantee you perfection. However, we genuinely believe and have utmost confidence that
                    <strong> your VIRON Home-Business can give you the best chance for success.</strong>
                    <span className="red-highlight"> VIRON is to be by your side long term. For your success, VIRON means serious business. Please read everything carefully to ensure you have the correct expectations.</span>
                </p>

                <h3 className="notice-title">NOTICE 2:</h3>
                <p className="notice-text">
                    The qualified, third-party MLM company that is integrated with VIRON systems is: <strong>“SAVE CLUB” (SC)</strong>.
                    <em> *Their information and details are located in the left column of this page...</em>
                    <strong> NOTICE: Although SC has been integrated with VIRON systems, please note that VIRON and SC (a third-party company) are separate entities.</strong>
                </p>

                <p className="dots">:::</p>

                <h3 className="notice-title">NOTICE 3:</h3>
                <span className="red-highlight">Know your business costs. The itemized cost and details of your VIRON Home-Business (“VHB”) is as follows:</span>
                <p className="notice-text">
                    <strong className="red-highlight "> &#x2022;  SAVE CLUB (SC) Annual Fee: $300.</strong> *For your convenience, after you make full payment to VIRON, we will correctly set up your account with SC. Furthermore, to ensure your Turn-Key experience and to ensure you are in the correct position within the VIRON matrix, always allow VIRON professionals to handle your account setup.
                    <em>  It is not recommended for anyone to set-up their accounts directly with SC.</em>
                    <span className="blue-highlight"> *EXTREME VALUE: Please note that with this annual payment to SC, you will gain access to the SC product and enjoy its associated savings. </span>

                    <p style={{ backgroundColor: "yellow" }}> NOTE: <u>The <strong>SAVINGS</strong> alone from your daily regular spending can exceed the entire cost of your VIRON Home-Business!</u> </p>
                </p>
                <p><strong>&#x2022; VIRON One-Time Registration Fee $39.95 </strong>(waived during this pre-launch).</p>
                <p><strong>&#x2022; VIRON Annual Registration Fee $149.95  </strong>(waived during this pre-launch).</p>
                <p><strong>&#x2022; VIRON Direct Referrals (DRs) </strong>$195 each x2 = $390 <u style={{ color: "red" }}>(reduced to only $199 total during this Pre-Launch).</u>*This limited pricing is subject to change without notice and in accordance with market demand. NOTE: There is a limit of 2 DRs per member, because you will only need 2 DRs to qualify for all commissions and bonuses per the SC Compensation Plan.</p>
                <strong>STRONG NOTE: Each DR will bring forth a subsequent DR that will be placed under them, and so forth. <span style={{ backgroundColor: "yellow" }}><u>Ensuring your downline grows with PAYING members, ongoing!</u> </span></strong>

                <h3 className='red-highlight'>TOTAL COST DURING PRE-LAUNCH: </h3>
                <p className='red-highlight'>Above totals $499.00 + $20 crypto transaction fee = $519.00</p>
                <p><strong>NOTE:</strong>If the cryptocurrency value drops while we are processing your transaction and setting up your account, it may cause a stall in the process. In this case, you will be contacted to provide the difference. <strong>*To avoid the risk of this inconvenience, the “crypto transaction fee” will also help cover the typical fluctuations in the crypto market for you.</strong></p>

                <p className="dots">:::</p>
                <h3 className="notice-title">PAYMENT</h3>
                <p className="blue-highlight" style={{ textAlign: "center" }}>FYI, “STRIPE” payment method coming soon.<br />
                    <p className="blue-highlight" style={{ textAlign: "center" }}>&</p>
                    <em className="blue-highlight" style={{ textAlign: "center" }}>*Automated Crypto-Currency Payment Processing by TYGA-Pay, coming soon.</em></p>

                <p className="dots">:::</p>
                <p style={{ textAlign: "center" }}>During Pre-Launch, we are manually accepting cryptocurrency payments:</p>
                <p style={{ textAlign: "center" }}>Bitcoin (BTC), </p>
                <p style={{ textAlign: "center" }}>Ethereum (ETH), </p>
                <p style={{ textAlign: "center" }}>USDT (Tron Network).</p>
                <p style={{ textAlign: "center" }} className='red-highlight'>To complete your VIRON Home-Business (“VHB”),</p>
                <p style={{ textAlign: "center" }} className='red-highlight'>please send your Cryptocurrency payment to: </p>
                <hr />
                <p style={{ textAlign: "center" }} ><strong>VIRON.NETWORK ACCOUNTING</strong></p>
                <p style={{ textAlign: "center" }} > <strong>Cryptocurrency Wallets</strong></p>
                <p style={{ textAlign: "center" }} > <strong>(Bitcoin (BTC) is the preferred payment method):</strong></p>
                <hr /><div style={{ marginTop: '1rem', textAlign: "center" }}>
                    <img
                        src="/path/to/your/bitcoin-qr.png" // replace with actual path
                        alt="Bitcoin QR Code"
                        style={{ maxWidth: '200px', marginBottom: '1rem' }}
                    />
                    <p style={{ textAlign: "center" }} ><strong>Bitcoin (BTC):</strong><br />1JExBaxmKzXGXYvAhsjHSRWF9Ezakzkz87</p>
                    <p style={{ textAlign: "center" }}><strong>Ethereum (ETH):</strong><br />0x6f052b3226fddf4d6980b81e5e77f30eb8d3ea96</p>
                    <p style={{ textAlign: "center" }}><strong>USDT (Tron Network):</strong><br />TXFMb9vfh1s9XcCKJ4emW2zqfaZqPaE49j</p>
                </div>

                <p className="dots">:::</p>
                <p style={{ textAlign: "center" }} className='red-highlight'>When you make your manual crypto payment, please make sure to copy your </p>
                <p style={{ textAlign: "center" }} className='red-highlight'>Crypto Transaction ID #. Then paste or enter it in the corresponding field below:</p>

                <div style={{ marginTop: '2rem' }}>
                    <p><strong>Please enter your crypto transaction ID:</strong></p>
                    <form className="crypto-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="btc_txn">BTC Blockchain Transaction ID:</label>
                            <input type="text" id="btc_txn" name="btc_txn" value={formData.btc_txn} onChange={handleChange}  placeholder="Enter your BTC transaction ID" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eth_txn">ETH Blockchain Transaction ID:</label>
                            <input type="text" id="eth_txn" name="eth_txn" value={formData.eth_txn} onChange={handleChange} placeholder="Enter your ETH transaction ID" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="usdt_txn">USDT (Tron) Blockchain Transaction ID:</label>
                            <input type="text" id="usdt_txn" name="usdt_txn" value={formData.usdt_txn} onChange={handleChange} placeholder="Enter your USDT transaction ID" />
                        </div>

                        <button type="submit" className="submit-button">SUBMIT</button>
                    </form>

                </div>
                <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>
                    One day click SUBMIT. Please respond in the VIRON Admin so we can be NOTIFIED of the transaction. Only submit the form when the member profile has full Transaction data (TIMESTAMP STAMPED PAYMENT).
                </p>

                <p style={{ marginTop: '2rem', backgroundColor: '#ffffcc', padding: '1rem' }}>
                    <strong>FINAL NOTE:</strong> Once you have completed the above instructions and have sent in your payment, please allow approximately 3 business days for your accounts to be finalized.
                    <br />
                    <br />
                    When your VIRON Home-Business is confirmed, we will notify you accordingly. Then simply sit back and monitor your business growth as VIRON efforts take back your freedom and time.
                </p>


                <h4 style={{ marginTop: '2rem', fontWeight: 'bold' }}>Congratulations on discovering VIRON.NETWORK!</h4>
                <p><em>-The VIRON Administration</em></p>

            </div>

            {/* ====================== */}








        </Layout>
    );
}

export default VironNotice;
