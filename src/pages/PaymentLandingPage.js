import React from 'react';
import './LandingPage.css'; // External CSS for clean styling
import Layout from '../components/Layout';

export default function PaymentLandingPage() {
  return (
    <Layout>
    <div className="landing-container">
         <div style={{ paddingTop: '2rem' }} className="text-center">
                            <img src='https://viron.network/assets/img/viron-logo.svg' alt="Viron Logo" className="img-logo-center" />
                            <h2 className='pb-25'>NOTICE</h2>
                          
                        </div>

      <p>
        Your cryptocurrency payment for your <strong>VIRON Home-Business (“VHB”)</strong> is being processed and is awaiting confirmation on the Blockchain. The VIRON Administrators have been notified.
      </p>
      <p>
        Once your payment is confirmed and cleared, your VHB account status will be marked <strong>“PAID”</strong>. The VIRON Administrators will then correctly set up your account with the qualified third-party MLM company, which will complete your VHB.
      </p>
      <p>
        We will be in touch at each step, and you will be notified accordingly.
      </p>
      <p>
        If you have any questions or need help, the best way to contact VIRON Member Support is via our <a href="/contact">CONTACT US</a> page or via Email: <a href="mailto:support@viron.network">Support@VIRON.NETWORK</a>. Our staff team will be happy to assist you during regular business hours.
      </p>
      <p><strong>JUST IN CASE YOU CANNOT GET BACK TO THIS PAGE</strong>, our system has also sent you an Email notification containing the same information that is on this page. <em>*When checking your email, please don’t forget to check your spam folder as well.</em></p>
      <p><strong>Welcome to the Evolution of Network Marketing!</strong></p>

     
      <p className="admin-footer">- The VIRON Administration</p>
    </div>
    </Layout>
  );
}
