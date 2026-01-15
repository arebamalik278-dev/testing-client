import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState(new Set());

  const faqData = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How do I place an order?",
          answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in, then provide shipping and payment information."
        },
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days within Pakistan. Express shipping (1-2 business days) is available for select locations. Delivery times may vary during peak seasons."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order status in your account under 'My Orders'."
        },
        {
          question: "What are your shipping charges?",
          answer: "Shipping is free for orders over PKR 2,000. For orders under PKR 2,000, standard shipping costs PKR 150. Express shipping costs PKR 300."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within Pakistan. We're working on expanding our delivery network to serve international customers in the future."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 7-day return policy for most items. Items must be unused, in original packaging, and with all tags attached. Some items like electronics and personal care products cannot be returned for hygiene reasons."
        },
        {
          question: "How do I initiate a return?",
          answer: "To initiate a return, go to your account, select the order, and click 'Return Item'. Follow the instructions to print the return label and package the item securely."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your returned item. The refund will be credited to your original payment method."
        },
        {
          question: "Can I exchange an item?",
          answer: "Yes, you can exchange items within 7 days of delivery. Exchanges are subject to availability. If the exchange item is more expensive, you'll need to pay the difference."
        }
      ]
    },
    {
      category: "Payment & Security",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit/debit cards (Visa, MasterCard, American Express), JazzCash, EasyPaisa, and bank transfers. All payments are processed securely through encrypted channels."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption and PCI DSS compliant payment processors. We never store your full credit card information on our servers."
        },
        {
          question: "Can I pay cash on delivery?",
          answer: "Yes, cash on delivery (COD) is available for orders up to PKR 5,000. A small COD fee of PKR 50 applies to all COD orders."
        },
        {
          question: "What if my payment fails?",
          answer: "If your payment fails, check your card details and ensure you have sufficient funds. Contact your bank if the issue persists. You can also try a different payment method."
        }
      ]
    },
    {
      category: "Account & Support",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' in the top right corner, provide your email, name, and password. You'll receive a verification email to activate your account."
        },
        {
          question: "I forgot my password. What should I do?",
          answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link."
        },
        {
          question: "How do I contact customer support?",
          answer: "You can reach us via email at support@afmart.com, call our helpline at +92 300 1234567, or use the live chat feature on our website."
        },
        {
          question: "Can I change my account information?",
          answer: "Yes, go to your account settings to update your personal information, shipping addresses, and payment methods."
        }
      ]
    },
    {
      category: "Products & Inventory",
      questions: [
        {
          question: "Are your products authentic?",
          answer: "Yes, all our products are 100% authentic and sourced directly from authorized distributors. We guarantee product authenticity."
        },
        {
          question: "What if an item is out of stock?",
          answer: "If an item is out of stock, you can sign up for notifications or check back later. We restock popular items frequently."
        },
        {
          question: "Can I cancel my order?",
          answer: "Orders can be cancelled within 1 hour of placement. Contact customer support immediately if you need to cancel an order."
        },
        {
          question: "Do you offer product warranties?",
          answer: "Most electronics and appliances come with manufacturer warranties. Warranty terms vary by product and are listed on the product page."
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFaqData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="faq-page">
      <div className="faq-container">
        {/* Hero Section */}
        <section className="faq-hero">
          <HelpCircle className="faq-hero-icon" />
          <h1 className="faq-hero-title">Frequently Asked Questions</h1>
          <p className="faq-hero-subtitle">
            Find answers to common questions about our products, orders, and services
          </p>
        </section>

        {/* Search Section */}
        <section className="faq-search">
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search FAQs..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="faq-content">
          {filteredFaqData.length === 0 ? (
            <div className="no-results">
              <HelpCircle className="no-results-icon" />
              <h3>No results found</h3>
              <p>Try adjusting your search terms or browse our categories below.</p>
            </div>
          ) : (
            filteredFaqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="faq-category">
                <h2 className="category-title">{category.category}</h2>
                <div className="faq-list">
                  {category.questions.map((faq, questionIndex) => {
                    const isOpen = openItems.has(`${categoryIndex}-${questionIndex}`);
                    return (
                      <div key={questionIndex} className="faq-item">
                        <button
                          className="faq-question"
                          onClick={() => toggleItem(categoryIndex, questionIndex)}
                        >
                          <span className="question-text">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="chevron-icon" />
                          ) : (
                            <ChevronDown className="chevron-icon" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Contact Section */}
        <section className="faq-contact">
          <div className="contact-card">
            <HelpCircle className="contact-icon" />
            <h3 className="contact-title">Still need help?</h3>
            <p className="contact-text">
              Can't find the answer you're looking for? Our customer support team is here to help.
            </p>
            <div className="contact-options">
              <a href="/contact" className="contact-btn primary">
                Contact Support
              </a>
              <a href="tel:+923001234567" className="contact-btn secondary">
                Call Us: +92 300 1234567
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
