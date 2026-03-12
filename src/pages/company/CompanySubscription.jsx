import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Company.css';

function CompanySubscription() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Plans, 2: Checkout, 3: Success

  const plans = [
    {
      id: 'basic',
      name: 'Starter',
      description: 'Perfect for small companies looking to hire entry-level talent.',
      monthlyPrice: 49,
      yearlyPrice: 470, // ~20% discount
      features: [
        'Up to 2 active simulations',
        'Basic analytics dashboard',
        'Standard fixed templates',
        'Up to 50 candidate submissions/mo',
        'Email support'
      ],
      recommended: false
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Ideal for growing teams with active hiring needs.',
      monthlyPrice: 99,
      yearlyPrice: 950,
      features: [
        'Up to 10 active simulations',
        'Advanced analytics & reporting',
        'All fixed templates + custom builder',
        'Unlimited candidate submissions',
        'Candidate export (CSV/Excel)',
        'Priority 24/7 support'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom solutions for large organizations.',
      monthlyPrice: 249,
      yearlyPrice: 2390,
      features: [
        'Unlimited active simulations',
        'Full white-labeling options',
        'Custom template creation service',
        'API access for HR integration',
        'Dedicated account manager',
        'Custom onboarding & training'
      ],
      recommended: false
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setPaymentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep(3);
    }, 1500);
  };

  if (paymentStep === 3) {
    return (
      <div className="company-page subscription-page">
        <div className="success-state">
          <div className="success-icon">✨</div>
          <h1>Payment Successful!</h1>
          <p>Your subscription to the <strong>{selectedPlan.name}</strong> plan is now active.</p>
          <div className="success-actions">
            <button onClick={() => navigate('/company')} className="btn btn-primary btn-lg">
              Go to Dashboard
            </button>
            <button onClick={() => navigate('/company/simulations/new')} className="btn btn-outline btn-lg">
              Create New Simulation
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 2) {
    const price = billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
    
    return (
      <div className="company-page subscription-page">
        <div className="page-header">
          <div>
            <h1>Complete Your Subscription</h1>
            <p className="page-subtitle">Upgrade to {selectedPlan.name} Plan</p>
          </div>
          <button onClick={() => setPaymentStep(1)} className="btn btn-outline">
            ← Back to Plans
          </button>
        </div>

        <div className="checkout-container">
          <div className="checkout-form-section">
            <form onSubmit={handlePaymentSubmit} className="checkout-form">
              <h3>Payment Details</h3>
              
              <div className="form-group">
                <label>Name on Card</label>
                <input type="text" className="input" placeholder="John Doe" required />
              </div>
              
              <div className="form-group">
                <label>Card Number</label>
                <div className="card-input-wrapper">
                  <input type="text" className="input" placeholder="0000 0000 0000 0000" maxLength="19" required />
                  <span className="card-icons">💳</span>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" className="input" placeholder="MM/YY" maxLength="5" required />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" className="input" placeholder="123" maxLength="4" required />
                </div>
              </div>

              <h3>Billing Address</h3>
              
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" className="input" placeholder="Acme Inc." required />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="input" placeholder="billing@company.com" required />
              </div>
              
              <button type="submit" className="btn btn-primary btn-block btn-lg mt-4">
                Pay ${price}
              </button>
              
              <p className="secure-payment-note">
                🔒 Payments are secure and encrypted.
              </p>
            </form>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-card">
              <div className="summary-header">
                <div>
                  <h4>{selectedPlan.name} Plan</h4>
                  <p>Billed {billingCycle}</p>
                </div>
                <div className="summary-price">
                  ${price}
                </div>
              </div>
              
              <ul className="summary-features">
                {selectedPlan.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
              
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${price}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="company-page subscription-page">
      <div className="page-header text-center">
        <h1>Simple, transparent pricing</h1>
        <p className="page-subtitle">Choose the perfect plan for your hiring needs</p>
      </div>

      <div className="billing-toggle-container">
        <div className="billing-toggle">
          <button 
            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly <span className="discount-badge">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => {
          const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
          const period = billingCycle === 'yearly' ? '/year' : '/mo';
          
          return (
            <div key={plan.id} className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}>
              {plan.recommended && <div className="recommended-badge">Most Popular</div>}
              
              <div className="pricing-header">
                <h3>{plan.name}</h3>
                <p className="pricing-desc">{plan.description}</p>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">{price}</span>
                  <span className="period">{period}</span>
                </div>
              </div>
              
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="pricing-footer">
                <button 
                  onClick={() => handleSelectPlan(plan)}
                  className={`btn btn-block ${plan.recommended ? 'btn-primary' : 'btn-outline'}`}
                >
                  {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompanySubscription;
