import { FileText, Shield, Scale, ChevronDown, ChevronUp, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import './TermsConditions.css';

const TermsConditions = () => {
  const [openSections, setOpenSections] = useState(new Set([0, 1, 2]));

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
      title: "1. Acceptance of Terms",
      content: `By accessing and using AF Mart's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, our Privacy Policy, and all applicable laws and regulations.

If you are using our services on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms, and "you" refers to both you individually and that business or organization.

Your continued use of our website and services following any changes to these Terms constitutes acceptance of those changes.`
    },
    {
      title: "2. Use of Services",
      content: `AF Mart provides an online e-commerce platform for purchasing products. By using our services, you agree to:

**Permitted Use:**
- Browse and purchase products for personal or household use
- Create and maintain one account per person
- Provide accurate and complete information during registration
- Maintain the security of your account credentials
- Use our services only for lawful purposes

**Prohibited Use:**
- Use automated systems to access our website
- Attempt to gain unauthorized access to any part of our systems
- Use our services for fraudulent or illegal purposes
- Harass, abuse, or harm other users or our staff
- Reproduce, duplicate, copy, or resell any part of our content
- Engage in any activity that interferes with or disrupts our services

Violation of these terms may result in termination of your account and legal action.`
    },
    {
      title: "3. User Accounts and Registration",
      content: `To make purchases on AF Mart, you may need to create an account. Here's what you need to know:

**Account Requirements:**
- You must be at least 18 years old to create an account
- Provide valid email address and contact information
- Create a secure password
- Maintain accurate and up-to-date account information

**Account Security:**
- You are responsible for maintaining the confidentiality of your account credentials
- You must notify us immediately of any unauthorized use of your account
- We reserve the right to suspend or terminate accounts that violate these terms

**Account Termination:**
You may close your account at any time by contacting customer support. We may terminate or suspend your account for violations of these Terms, fraudulent activity, or prolonged inactivity.`
    },
    {
      title: "4. Product Listings and Pricing",
      content: `We strive to provide accurate product information and pricing:

**Product Descriptions:**
- We make every effort to display products accurately
- Colors may vary due to monitor settings and photography
- Product specifications are subject to change without notice
- We reserve the right to limit quantities of any products

**Pricing Policy:**
- All prices are listed in Pakistani Rupees (PKR)
- Prices are subject to change without notice
- We reserve the right to correct pricing errors
- Shipping charges are calculated separately based on delivery location

**Price Match Guarantee:**
- We offer competitive pricing on all products
- If you find a lower price from an authorized retailer, contact us
- Price matching is subject to verification and terms and conditions`
    },
    {
      title: "5. Orders and Payment",
      content: `When you place an order with AF Mart, the following terms apply:

**Order Acceptance:**
- All orders are subject to availability confirmation
- We reserve the right to refuse or cancel any order
- You will receive an email confirmation upon order placement
- A second confirmation will be sent when your order ships

**Payment Methods:**
We accept the following payment methods:
- Credit/Debit Cards (Visa, MasterCard, American Express)
- JazzCash
- EasyPaisa
- Bank Transfer
- Cash on Delivery (COD available up to PKR 5,000)

**Payment Security:**
- All transactions are processed securely
- We use SSL encryption to protect your payment information
- We never store your full credit card details
- For Cash on Delivery, payment is collected at the time of delivery`
    },
    {
      title: "6. Shipping and Delivery",
      content: `AF Mart offers reliable shipping services across Pakistan:

**Delivery Times:**
- Standard Shipping: 3-5 business days
- Express Shipping: 1-2 business days (select locations)
- Delivery times may be longer during peak seasons and holidays

**Shipping Charges:**
- Free shipping on orders over PKR 2,000
- Standard shipping: PKR 150 for orders under PKR 2,000
- Express shipping: PKR 300

**Delivery Areas:**
- We deliver to all major cities in Pakistan
- Some remote areas may have extended delivery times
- International shipping is currently not available

**Order Tracking:**
- Tracking numbers are provided via email and SMS
- Track your order in your account under "My Orders"
- Contact customer support for delivery inquiries`
    },
    {
      title: "7. Returns and Refunds",
      content: `We want you to be completely satisfied with your purchase:

**Return Policy:**
- 7-day return window from date of delivery
- Items must be unused, unworn, and in original packaging
- All tags must be attached
- Some items cannot be returned (electronics, personal care, perishables)

**Return Process:**
1. Log into your account and select the order
2. Click "Return Item" and follow the instructions
3. Print and attach the return label
4. Package the item securely
5. Hand over to the delivery partner

**Refund Timeline:**
- Refunds are processed within 3-5 business days
- Credit card refunds may take 5-10 business days to appear
- Original shipping costs are non-refundable
- Return shipping costs are the customer's responsibility

** Exchanges:**
- Exchanges are subject to product availability
- Size exchanges are processed within 3-5 business days
- Price differences will be charged or refunded accordingly`
    },
    {
      title: "8. Intellectual Property",
      content: `All content on the AF Mart website is protected by intellectual property rights:

**Our Rights:**
- Website design, logos, and branding are our property
- Product images and descriptions are owned by AF Mart or our suppliers
- Software and technology underlying our services
- All text, graphics, and multimedia content

**License to Use:**
- You may view and print content for personal, non-commercial use
- No part of our website may be reproduced without written permission
- Framing or deep-linking to our website is prohibited

**Third-Party Content:**
- Some products feature third-party trademarks and copyrights
- We respect intellectual property rights and comply with applicable laws
- Report any IP concerns to our designated agent`
    },
    {
      title: "9. User-Generated Content",
      content: `When you submit content to AF Mart, the following terms apply:

**Types of User Content:**
- Product reviews and ratings
- Comments and questions on products
- Photos and videos of products
- Feedback and suggestions

**Content Guidelines:**
- Content must be honest and based on genuine experience
- No offensive, vulgar, or inappropriate language
- No promotional content or spam
- No confidential or personal information about others

**Your Rights:**
- You retain ownership of content you submit
- By submitting, you grant us a worldwide, royalty-free license
- We may use, modify, and display your content
- We may remove or modify content at our discretion`
    },
    {
      title: "10. Limitation of Liability",
      content: `To the maximum extent permitted by law, AF Mart limits its liability:

**What We Cover:**
- Direct damages from our breach of these Terms
- Services as described on our website
- Technical issues within our reasonable control

**What We Don't Cover:**
- Indirect, incidental, or consequential damages
- Loss of profits, data, or business opportunities
- Damages from third-party services or products
- Issues beyond our reasonable control (force majeure)

**Disclaimer:**
- Our services are provided "as is" and "as available"
- We make no warranties beyond what is stated in these Terms
- We do not guarantee uninterrupted or error-free service

**Cap on Liability:**
Our total liability shall not exceed the amount you paid for the products in question.`
    },
    {
      title: "11. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless AF Mart and its affiliates from any claims, damages, losses, or expenses arising from:

- Your violation of these Terms and Conditions
- Your violation of any third-party rights
- Your misuse of our website or services
- Any content you submit to our website
- Any illegal or harmful activity conducted through your account

This indemnification obligation survives the termination of your account and these Terms. You agree to cooperate with us in defending any such claims.`
    },
    {
      title: "12. Disputes and Arbitration",
      content: `In the event of a dispute, we encourage resolution through direct communication:

**Informal Resolution:**
- Contact our customer support team first
- We will make reasonable efforts to resolve your concern
- Most disputes are resolved within 30 days

**Formal Resolution:**
- If informal resolution fails, disputes will be resolved through binding arbitration
- Arbitration will be conducted in Lahore, Pakistan
- Arbitration will be governed by the Arbitration Act of 1940
- Each party will bear its own costs, unless otherwise determined

**Class Action Waiver:**
- Disputes will be handled on an individual basis
- Class action or collective arbitration is not permitted
- You waive any right to participate in class-wide proceedings`

    },
    {
      title: "13. Termination",
      content: `These Terms remain in effect until terminated by either party:

**Termination by You:**
- Close your account at any time
- Stop using our services
- No refund obligation for unused services

**Termination by Us:**
We may terminate or suspend your account for:
- Violation of these Terms
- Fraudulent or illegal activity
- Prolonged inactivity (account休眠 over 2 years)
- Bankruptcy or insolvency proceedings

**Effect of Termination:**
- Your right to use our services ceases immediately
- You remain liable for any outstanding obligations
- We may retain certain information as required by law
- Provisions intended to survive termination will remain in effect`
    },
    {
      title: "14. Changes to Terms",
      content: `We may modify these Terms at any time:

**Notification:**
- Changes will be posted on this page
- Material changes will be notified via email
- The "Last Updated" date will reflect changes

**Your Acceptance:**
- Continued use after changes constitutes acceptance
- If you disagree with new terms, you must stop using our services
- We recommend reviewing these Terms periodically

**Backwards Compatibility:**
- We do not retroactively change agreed terms
- New terms apply only to future use and transactions`
    },
    {
      title: "15. Governing Law",
      content: `These Terms are governed by the laws of Pakistan:

**Jurisdiction:**
- The courts of Lahore, Punjab, Pakistan have exclusive jurisdiction
- Any disputes will be resolved under Pakistani law
- International customers are subject to Pakistani consumer protection laws

**International Use:**
- We make no representation that our services are appropriate outside Pakistan
- Access from other countries is at your own risk
- Local laws may differ from Pakistani law

**Severability:**
- If any provision of these Terms is found unenforceable, it will be modified
- Remaining provisions will continue in full force and effect`
    },
    {
      title: "16. Contact Information",
      content: `If you have questions about these Terms and Conditions, please contact us:

**AF Mart**
Address: 123 Commerce Street, Lahore, Punjab, Pakistan

**Customer Support:**
Phone: +92 300 1234567
Email: support@afmart.com
Hours: Monday - Saturday, 9:00 AM - 9:00 PM

**Legal Inquiries:**
For legal matters, please contact:
Email: legal@afmart.com

We are committed to addressing your concerns promptly and professionally.`
    }
  ];

  return (
    <div className="terms-page">
      <div className="terms-container">
        {/* Hero Section */}
        <section className="terms-hero">
          <FileText className="terms-hero-icon" />
          <h1 className="terms-hero-title">Terms & Conditions</h1>
          <p className="terms-hero-subtitle">
            Please read these terms carefully before using our services. Your use of our website constitutes acceptance of these terms.
          </p>
        </section>

        <div className="last-updated">
          <p>Last Updated: January 2026</p>
        </div>

        {/* Summary Cards */}
        <section className="terms-summary">
          <div className="summary-card">
            <Shield className="summary-icon" />
            <h3>Your Rights</h3>
            <p>Understand your rights and protections as a customer</p>
          </div>
          <div className="summary-card">
            <Scale className="summary-icon" />
            <h3>Fair Terms</h3>
            <p>Clear and balanced terms for both parties</p>
          </div>
          <div className="summary-card">
            <FileText className="summary-icon" />
            <h3>Stay Informed</h3>
            <p>Keep up to date with our policies and guidelines</p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="quick-links">
          <h2 className="section-title">Quick Navigation</h2>
          <div className="quick-links-grid">
            {sections.slice(0, 6).map((section, index) => (
              <a
                key={index}
                href={`#section-${index}`}
                className="quick-link-item"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(`section-${index}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    element.querySelector('.section-header').click();
                  }
                }}
              >
                <span className="quick-link-number">{index + 1}</span>
                <span className="quick-link-text">{section.title.split('. ')[1]}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Terms Content - Accordion */}
        <section className="terms-content" id="terms-content">
          {sections.map((section, index) => {
            const isOpen = openSections.has(index);
            return (
              <div
                key={index}
                id={`section-${index}`}
                className="terms-section"
              >
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
                    {section.content.split('\n\n').map((paragraph, pIndex) => {
                      if (paragraph.startsWith('- ')) {
                        const items = paragraph.split('\n- ').filter(item => item.trim());
                        return (
                          <ul key={pIndex}>
                            {items.map((item, iIndex) => (
                              <li key={iIndex}>{item.replace(/^- /, '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={pIndex}>{paragraph}</p>;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Contact Section */}
        <section className="terms-contact">
          <FileText className="contact-icon" />
          <h3 className="contact-title">Questions About These Terms?</h3>
          <p className="contact-text">
            If you have any questions or concerns about our Terms & Conditions, our customer support team is here to help.
          </p>
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <MapPin className="contact-info-icon" />
              <div>
                <h4>Address</h4>
                <p>123 Commerce Street, Lahore, Pakistan</p>
              </div>
            </div>
            <div className="contact-info-item">
              <Phone className="contact-info-icon" />
              <div>
                <h4>Phone</h4>
                <p>+92 300 1234567</p>
              </div>
            </div>
            <div className="contact-info-item">
              <Mail className="contact-info-icon" />
              <div>
                <h4>Email</h4>
                <p>legal@afmart.com</p>
              </div>
            </div>
            <div className="contact-info-item">
              <Clock className="contact-info-icon" />
              <div>
                <h4>Hours</h4>
                <p>Mon - Sat: 9AM - 9PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Agreement Box */}
        <section className="agreement-box">
          <h3>Agreement to Terms</h3>
          <p>
            By using AF Mart's website and services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions, our Privacy Policy,
            and all applicable laws and regulations.
          </p>
          <p className="agreement-note">
            If you do not agree to these terms, please discontinue use of our website and services immediately.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;

