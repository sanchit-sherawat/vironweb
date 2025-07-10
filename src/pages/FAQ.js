import Layout from '../components/Layout';
import React, { useState } from 'react';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  // This handler toggles the clicked accordion
  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); 
    } else {
      setActiveIndex(index);
    }
  };
  // FAQ items with questions and answers
  const faqItems = [
    {
      question: "What will my total Start-Up costs be to fully engage with the VIRON Home-Business (“VHB”)?",
      answer: (
        <>
          <p><strong>The VIRON Start-Up costs consist of:</strong></p>
          <ul>
            <li>VIRON Annual <strong>Registration Fee</strong>.</li>
            <li>Purchase up to <strong>2</strong> <strong>Direct Referrals</strong> (“<strong>DR</strong>”).</li>
            <li>Fully Upgrade with the qualified third-party MLM Company (aka: “<strong><em>VEHICLE</em></strong>”).</li>
          </ul>
          <p>*All VIRON Start-Up costs are subject to change based on market conditions and demand.* All fees are outlined at VIRON’s <strong><u>REGISTRATION</u></strong> page and also displayed in the VIRON back-office.</p>
        </>
      )
    },
    {
      question: "What if I am already involved with VIRON’s chosen third-party MLM Company?",
      answer: (
        <>
          <p><strong>Only VIRON members, under the VIRON umbrella, are qualified for VIRON services</strong>. <u>This is the standard system protocol</u>. If you are <u>outside</u> of the VIRON.NETWORK and umbrella, that would naturally create a conflict, and we would <u>not</u> be able to build your MLM business. <strong>To avoid this conflict, VIRON verifies all accounts before engaging with you. </strong></p>
          <p className='text-tab'>If said conflict applies to you, you can resolve it by opening a new account with VIRON’s chosen third-party MLM Company. <strong><em className="text-blue">This would be the same phenomenon as if you were to acquire an additional “McDonald’s” franchise in an arguably “better” location.</em></strong> The main difference is that your new account will have VIRON to build for you, whereas your other account does not. <strong><em className="text-blue">*Further down the road, after you get into profit, most likely, you will want more VIRON Home-Business (VHB) positions! </em></strong></p>
        </>
      )
    },
    {
      question: "Can VIRON market other MLM companies or “VEHICLE” such as: Amway, Herbalife, Melaleuca, Primerica, Mary Kay, Nu-Skin, ACN, etc., for me?",
      answer: (
        <>
          <p><strong>Currently at this time - No. *However, we are open to corporate discussions and collaboration to significantly reduce the failure rate and drastically improve the success rate for all individuals in the industry, worldwide.</strong></p>
        </>
      )
    },
    {
      question: "What are the VIRON Qualifying parameters for the third-party MLM Company or “VEHICLE”?",
      answer: (
        <>
          <p>VIRON has logical and non-arbitrary parameters for qualifying any MLM &ldquo;<em>VEHICLE</em>&rdquo; for civic integration with VIRON systems. The said qualifying parameters and information for the MLM Company are located in the VIRON.NETWORK back-office. </p>
        </>
      )
    },
    {
      question: "How does the VIRON system work?  How does VIRON MAKE ME MONEY?",
      answer: (
        <>
          <p><strong>VIRON is a true Turn-Key, Home-Business SYSTEMIZED.</strong> <strong>VIRON will professionally do all the hard work for you. </strong>This is the game changer you (and everyone) have been waiting for. We are confident that VIRON can change your life soon after you fully engage with the powerful VIRON Home-Business (&ldquo;VHB&rdquo;). For further information, please visit the HOW IT WORKS page at: <strong className='text-highlighted'><u>VIRON.NETWORK/HowItWorks</u></strong></p>
        </>
      )
    },
    {
      question: "Why is there no “Sponsoring” or no “Recruiting” in VIRON?",
      answer: (
        <>
          <p>Because the&nbsp;old&nbsp;ways do NOT WORK and produce a statistical 99% Failure Rate.</p>
          <ul>
            <li class="text-blue">Unlike the old ways, where you would do all the hard work yourself (selling, recruiting, etc.) and be subject to high stress along with a high probability of failure&hellip;</li>
            <li class="text-blue"><strong>&hellip;with VIRON, you simply let our Professional system deliver you success FIRST, and then do whatever you wish after! </strong></li>
          </ul>
          <p class="mb-0"><em>More details: </em></p>
          <ul>
            <li>When you purchase your 2 DRs and fully engage with the qualified MLM Company that is integrated with VIRON, <u>this completes your <strong>VIRON Home-Business</strong> (<strong>VHB</strong>)</u>.</li>
            <li className='text-tab'><abbr class="text-blue">*Automatically, as your DRs are fulfilled with excited and paying members, and as those members&rsquo; DRs are fulfilled, and so forth&hellip;your Downline grows Systematically with &ldquo;no holes&rdquo;.</abbr> VIRON is engineered to civically LEVEL THE PLAYING FIELD &ndash; FOR EVERYONE.</li>
            <li><strong><em>*VIRON members may <u>optionally</u> <u>Refer</u> after they attain their own level of success. </em></strong><em>*If you are ready to Refer others to VIRON, simply use your VIRON Replicated Referral Link, which is displayed in your VIRON Back-Office after registration.</em></li>
          </ul>
        </>
      )
    },
    {
      question: "What is the Time Frame for DRs Orders to be fulfilled? Or, How long will it take before I start to see results?",
      answer: (
        <>
          <p>It is not legal, and the law prohibits any company, including VIRON, from giving specific&nbsp;<em>time frames</em>&nbsp;or&nbsp;<em>&ldquo;guarantees&rdquo;</em>. However, we will let actions speak, and the genuine&nbsp;<a href="https://www.VIRON.NETWORK/testimonials" >TESTIMONIALS&nbsp;</a>page can give you a good idea of time frames, directly from the experiences of other members just like you. <em>*In other words, we are not legally able to guarantee you any specific results, but we can guarantee you this: </em><em class="text-blue">if you purchased the VIRON product: <strong>Direct Referrals</strong> (&ldquo;<strong>DRs</strong>&rdquo;), they will ultimately be fulfilled or your money back!</em></p>
        </>
      )
    },
    {
      question: "Can you tell me more about the qualified third-party MLM Company’s product?",
      answer: (
        <>
          <p>All the information of the third-party MLM Company is located in VIRON’s Back-Office under:&nbsp;<strong>“MLM COMPANY INFORMATION”.</strong></p>
        </>
      )
    },
    {
      question: "If I have my own LEADs, can VIRON call them for me?",
      answer: (
        <>
          <p>VIRON&rsquo;s&nbsp;<a href="https://VIRON.NETWORK.com/faq"><strong><em>Dynamic Traffic Channels (&ldquo;DTC&rdquo;)</em></strong></a>&nbsp;does all the hard work to generate Leads, Contacts, and Traffic for you, automatically. Therefore, we do NOT need your Leads. <strong><u>Again, with VIRON, you no longer need to sell, sponsor, or recruit</u></strong>.</p>
        </>
      )
    },
    {
      question: "Can I “skip” the purchase of DRs and go directly with the MLM Company?",
      answer: (
        <>
          <p>Definitely not suggested, because <strong>Direct Referrals </strong>(<strong>DRs</strong>) are also known as the: &ldquo;FUEL &amp; ENGINE&rdquo; of your VIRON Home-Business. <abbr class="text-blue">Further, if you are not registered with VIRON.NETWORK, we will not know you exist, and cannot help you build your MLM downline. </abbr><em>In other words, you wouldn&rsquo;t want to buy a VEHICLE without the &ldquo;Engine and Fuel&rdquo;, would you?</em></p>
        </>
      )
    },
    {
      question: "Can I refer more than 2 Direct Referrals (DRs) to my VIRON business? ",
      answer: (
        <>
          <p>Yes, of course, referring your people, also known as <strong>Direct Referrals (DRs), </strong>to VIRON is <u>optional</u>. You can refer as many people to your VIRON business as you wish. There is no limit on this Referring activity.&nbsp;</p>
          <p className="text-tab">To foster the Referring activity, we will soon launch the <strong>VIRON Affiliate Program (“VAP”)</strong>. <em>*Details will be announced on the VAP accordingly, at the appropriate time.</em></p>
          <p>NOTE: Currently, when you become a VIRON member, your <strong><em>VIRON Referral Link</em></strong> will be fully operational. Feel free to refer as many people as you wish using your unique link. <u>All your DRs will be tracked for everyone you referred, and to ensure you will receive proper credit when the VAP is released accordingly</u></p>
        </>
      )
    },
    {
      question: "Where is VIRON located?",
      answer: (
        <>
          <p>VIRON is headquartered in Malaysia with offices in the USA - Utah, and will expand accordingly. Our contact information is located on our <a href="https://www.VIRON.NETWORK/contactus">CONTACT US</a>&nbsp;page.</p>
          <p>We would be happy to hear from you and look forward to serving you. We also look forward to delivering success to you and would be proud to have your next proud Testimonial. </p>
        </>
      )
    }
  ];

  return (
    <Layout>
      <div className='container'>
        <div className="row">
          <div className='col'>
            <div style={{ paddingTop: '2rem' }} className="text-center">
              <img src='https://viron.network/assets/img/viron-logo.svg' alt="Viron Logo" className="img-logo-center" />
              <h2 className='mt-15 mb-0 text-red'>Frequently Asked Questions (F.A.Q.)</h2>
              <p className='mt-0  '>Last Updated: 08 June 2025</p>
            </div>
            <div className="text-center mb-10" style={{ padding: '0px 20px', border: '2px solid #000', width: '45%', margin: '0 auto' }}>
              <p><strong>NOTE: General Questions are in font color: <em className="text-red">RED</em>.</strong><br /><strong>Answers or Comments are in font color: <em>BLACK</em> or <em className="text-blue">BLUE</em>.</strong></p>
            </div>

            <div className="pt-20 pb-1">
                <p><strong className="text-blue">With VIRON.NETWORK (&ldquo;VIRON&rdquo;), you do not need to attend Meetings, Webinars, or read Emails, nor respond to any third-party MLM Company&rsquo;s "Newsletters". And definitely, no need for "training", etc., etc., etc. </strong><u>With VIRON&hellip;ALL of that is now irrelevant</u>! *This positive situation with VIRON is beneficial for the MLM Company itself, as VIRON handles all the hard work for you to build your MLM downline automatically. <u>Effectively eliminating all the traditional stresses</u>.</p>
                <hr />
            </div>

            <div className="faq-accordion">
              <ul className="accordion">
                {faqItems.map((item, index) => (
                  <li key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="accordion-title"
                      onClick={() => toggleAccordion(index)}
                      style={{ cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', width: '100%' }}
                    >
                      <i className={`bx ${activeIndex === index ? 'bx-minus' : 'bx-plus'}`}></i>
                      <em className="text-red">{item.question}</em>
                    </button>
                    <div className="accordion-content" style={{ display: activeIndex === index ? 'block' : 'none' }}>
                      {item.answer}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ margin:'40px 0', padding: '30px', border:'2px solid #000' }}>
                <p className="text-center"><strong>SYSTEM SUMMARY & VALUE.</strong></p>
                <p><strong><abbr className="text-blue">While you&rsquo;re standing by for your Direct Referrals (DRs) to be fulfilled (to grow your downline)&hellip; You can SAVE MONEY on your daily, regular spending! </abbr><em>*To clarify, the savings are from the third-party MLM company&rsquo;s product that has been strategically integrated for you, within VIRON.</em></strong></p>
                <p><strong className="text-blue">Here is what's even more exciting: the SAVINGS alone can quickly surpass your entire VIRON Home-Business (VHB) gross costs! </strong><strong className="text-red">Now that&rsquo;s leverage! </strong></p>
                <p>Imagine going to the store you were planning to visit anyway, using your credit or debit card as you normally would, buying whatever you want anyway, and receiving an immediate deep discount on the spot right then and there! No waiting, no scanning receipts&nbsp;(although you can do that later to get the extra savings boost). <strong>Just savings on the items and brands you would purchase anyway, based on your everyday usage and spending habits.</strong></p>
            </div>

            <div>
                <p>If you have any further questions, please feel free to Email us at: <a href="mailto:Support@VIRON.NETWORK">Support@VIRON.NETWORK</a></p>
                <p><br/><strong><em>-THE VIRON ADMINISTRATION</em></strong></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FAQ;
