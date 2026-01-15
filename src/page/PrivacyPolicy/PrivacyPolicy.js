import { Shield, Lock, Eye, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const [openSections, setOpenSections] = useState(new Set());

  const toggleSection = (index) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(index)) {
      newOpenSections.delete(index);
    } else {
      newOpenSections.add(index);
    }
    setOpenSections(newOpenSections);
  };

  const sections = [
    {
      title: "1. Introduction",
      content: `Welcome to AF Mart ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases from our online store.

By accessing or using our services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with the terms outlined here, please discontinue use of our website and services immediately.`
    },
    {
      title: "2. Information We Collect",
      content: `We collect information that you provide directly to us, as well as information collected automatically when you use our services.

Information You Provide:
- Personal identification information (name, email address, phone number)
- Shipping and billing addresses
- Payment information (credit/debit card details, payment method)
- Account credentials
- Communication preferences
- Product reviews and feedback

Information Collected Automatically:
- Device and browser information
- IP address and location data
- Browsing history and interaction with our website
- Cookies and similar tracking technologies
- Order history and purchase patterns`
    },
    {
      title: "3. How We Use Your Information",
      content: `We use the information we collect for various purposes, including:

- Processing and fulfilling your orders
- Providing customer support and service
- Sending order confirmations, updates, and promotional communications
- Personalizing your shopping experience
- Improving our website, products, and services
- Detecting and preventing fraud
- Complying with legal obligations
- Analyzing market trends and customer preferences
- Processing returns and exchanges
- Managing loyalty programs and discounts

We process your information based on legitimate business interests, contractual necessity, your consent, or legal obligations.`
    },
    {
      title: "4. How We Share Your Information",
      content: `We may share your information in the following circumstances:

- Service Providers: With third-party vendors who perform services on our behalf (payment processing, shipping, marketing)
- Legal Requirements: When required by law, court order, or government request
- Business Transfers: In connection with a merger, acquisition, or sale of assets
- With Your Consent: When you explicitly authorize us to share information
- Aggregated Data: We may share anonymized, aggregated data that cannot identify you

We do not sell your personal information to third parties. All service providers are contractually obligated to protect your information and use it only for the purposes we specify.`
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content: `Our website uses cookies and similar technologies to collect information and improve your experience.

Types of Cookies We Use:
- Essential Cookies: Required for basic site functionality and security
- Performance Cookies: Help us understand how visitors interact with our website
- Functionality Cookies: Remember your preferences and settings
- Marketing Cookies: Used to deliver relevant advertisements

You can control cookies through your browser settings. Note that disabling certain cookies may limit your ability to use some features of our website.

We also use web beacons, pixels, and similar technologies to track user behavior and improve our services.`
    },
    {
      title: "6. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

Security Measures Include:
- SSL encryption for data transmission
- Secure payment processing through PCI-DSS compliant providers
- Regular security assessments and updates
- Access controls and authentication systems
- Secure data storage with regular backups
- Employee training on data protection

While we strive to protect your information, no method of transmission or storage is 100 percent secure. We cannot guarantee absolute security, but we continuously work to maintain the highest standards of data protection.`
    },
    {
      title: "7. Data Retention",
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

Retention Periods:
- Account information: Retained while your account is active
- Transaction records: Retained for 7 years for legal compliance
- Marketing preferences: Retained until you opt-out
- Technical data: Retained for specified periods based on analytics needs

When determining retention periods, we consider the nature of the information, the purposes for which it was collected, legal requirements, and our legitimate business interests.`
    },
    {
      title: "8. Your Privacy Rights",
      content: `Depending on your location, you may have certain rights regarding your personal information:

- Access: Request a copy of the personal data we hold about you
- Correction: Request correction of inaccurate or incomplete data
- Deletion: Request deletion of your personal information
- Portability: Request a copy of your data in a structured format
- Opt-Out: Opt-out of marketing communications
- Restriction: Request restriction of processing under certain circumstances
- Objection: Object to processing based on legitimate interests

To exercise these rights, please contact us using the information provided below. We will respond to your request within 30 days.`
    },
    {
      title: "9. Children's Privacy",
      content: `Our services are not directed toward children under the age of 18. We do not knowingly collect personal information from children without parental consent.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. Upon verification, we will promptly delete such information from our records.

We encourage parents to monitor their children's online activities and educate them about responsible internet use.`
    },
    {
      title: "10. International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than Pakistan. These countries may have data protection laws that are different from the laws of your country.

When we transfer your information internationally, we implement appropriate safeguards to ensure your information remains protected in accordance with this Privacy Policy and applicable data protection laws.

By using our services, you consent to the transfer of your information to these countries.`
    },
    {
      title: "11. Third-Party Links",
      content: `Our website may contain links to third-party websites, applications, or services that are not operated by us. If you click on a third-party link, you will be directed to that party's site.

We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We strongly advise you to review the privacy policy of every site you visit.

Your interactions with third-party sites are solely between you and the third party.`
    },
    {
      title: "12. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors.

When we make material changes, we will:
- Post the updated policy on our website
- Update the "Last Updated" date at the bottom of this policy
- Send you a notification (for significant changes)
- Obtain your consent where required by law

We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.`
    },
    {
      title: "13. Contact Us",
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

AF Mart
Email: privacy@afmart.com
Phone: +92 300 1234567
Address: 123 Commerce Street, Lahore, Punjab, Pakistan

We are committed to addressing your concerns and resolving any issues promptly. Our support team is available Monday through Saturday, 9:00 AM to 9:00 PM.`
    }
  ];

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <section className="privacy-hero">
          <Shield className="privacy-hero-icon" />
          <h1 className="privacy-hero-title">Privacy Policy</h1>
          <p className="privacy-hero-subtitle">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </section>

        <div className="last-updated">
          <p>Last Updated: January 2026</p>
        </div>

        <section className="privacy-summary">
          <div className="summary-card">
            <Lock className="summary-icon" />
            <h3>Data Protection</h3>
            <p>Your personal information is encrypted and securely stored</p>
          </div>
          <div className="summary-card">
            <Eye className="summary-icon" />
            <h3>Transparency</h3>
            <p>We clearly explain how we use your data</p>
          </div>
          <div className="summary-card">
            <Mail className="summary-icon" />
            <h3>Your Control</h3>
            <p>You can access, correct, or delete your data anytime</p>
          </div>
        </section>

        <section className="privacy-content">
          {sections.map((section, index) => {
            const isOpen = openSections.has(index);
            return (
              <div key={index} className="privacy-section">
                <button
                  className="section-header"
                  onClick={() => toggleSection(index)}
                >
                  <h2 className="section-title">{section.title}</h2>
                  {isOpen ? (
                    <ChevronUp className="section-icon" />
                  ) : (
                    <ChevronDown className="section-icon" />
                  )}
                </button>
                {isOpen && (
                  <div className="section-content">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
      </div>
  );
};

export default PrivacyPolicy;
