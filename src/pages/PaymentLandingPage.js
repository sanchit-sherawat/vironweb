import React from 'react';
import './LandingPage.css'; // External CSS for clean styling
import Layout from '../components/Layout';

export default function PaymentLandingPage() {
  return (
    <Layout>
    <div className='container'>
      <div className="row">
        <div className='col'>
            <div style={{ paddingTop: '2rem' }} className="text-center">
                <img src='https://viron.network/assets/img/viron-logo.svg' alt="Viron Logo" className="img-logo-center" />
                <h2 className='pb-10'>NOTIFICATION<br/>Your Payment is Processing…</h2>
            </div>
            <p className='pb-20'>Your cryptocurrency payment for your <strong><u>VIRON Home-Business (&ldquo;VHB&rdquo;)</u> </strong>is being processed and is awaiting confirmation on the Blockchain.<strong className='text-red'> The VIRON Administrators have been notified. </strong>Once your payment is confirmed and cleared, your VHB account status will be marked &ldquo;PAID&rdquo;.</p>
            <p>The VIRON Administrators will then correctly set up your account with the qualified <strong>third-party MLM company</strong>, which will complete your VHB.</p>
            <p className='pb-20'>We will be in touch with you at each step, and you will be notified accordingly.</p>
            <p className='pb-20'><strong className='text-red'>EMPHASIS:</strong> Please understand that we are currently in <strong><u>PRE-LAUNCH</u></strong>. The Pre-Launch will conclude when we reach 5,500 total members. We will then automatically enter <strong>FULL-LAUNCH</strong>.</p>
            <p className='pb-20'><strong className='text-red'>STRONG EMPHASIS:</strong> Your VIRON position is currently <u>secure and locked per your Time/Date Stamp</u>. Until the Pre-Launch is over, your funds are placed in our ESCROW account. <span className='text-highlighted'>Your funds are only drawn when the following steps are completed:</span></p>
            <ol className='roman-list'>
              <li>You are correctly placed with the third-party MLM company: <strong>SAVE CLUB (&ldquo;<u className='text-blue'>SC</u>&rdquo;)</strong>.</li>
              <li>Your <strong>VIRON DRs</strong> purchased are placed into your <strong><u className='text-blue'>SC</u></strong> account</li>
            </ol>
            <p className='mt-20'><strong className='text-red'>*Please be advised that VIRON continues to invest ongoing professional efforts and resources even before the completion of the above steps for you. <u>Please exercise patience during our Pre-Launch</u>. </strong>We will be with you every step of the way.</p>
            <p className='text-blue text-center mb-0'><strong>VIRON TELEGRAM CHANNEL:</strong></p>
            <p className='mt-0'>For up-to-the-minute information and company updates, we highly suggest you join VIRON&rsquo;s <strong>Telegram Channel</strong>: <a href="https://t.me/VIRON_NETWORK" className='text-blue'>https://t.me/VIRON_NETWORK</a></p>
            <hr/>
            <p className='text-blue text-center mb-0 mt-20'><strong>VIRON MEMBER SUPPORT:</strong></p>
            <p className='mt-0'>If you have any questions or need help, the best way to contact VIRON Member Support is via our CONTACT US page or via Email: <a href="mailto:Support@VIRON.NETWORK" className='text-blue'>Support@VIRON.NETWORK</a>. Our staff team will be happy to assist you during regular business hours.</p>
            <hr/>
            <p className='text-blue'><strong><u>JUST IN CASE YOU CANNOT GET BACK TO THIS PAGE</u></strong>, our system has also sent you an Email notification containing the same information that is on this page. *When checking your email, please don&rsquo;t forget to check your spam folder as well.</p>
            <hr/>
            <p className='text-center'><strong><em>Welcome to the Evolution of Network Marketing!</em></strong></p>
            <p className='text-center'><strong><em>-The VIRON Administration</em></strong></p>
        </div>
      </div>
    </div>
    </Layout>
  );
}
