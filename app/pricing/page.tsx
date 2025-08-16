export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-mono mb-4">[PRICING & CREDITS]</h1>
          <p className="text-gray-400 font-mono">Choose your plan to continue using the AI Terminal</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="card border-gray-600 hover:border-green-400 transition-colors">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-mono text-green-400 mb-2">[FREE TIER]</h2>
              <div className="text-3xl font-mono mb-2">$0<span className="text-lg">/month</span></div>
              <p className="text-gray-400 text-sm">Perfect for testing</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="font-mono text-sm">20 messages per day</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="font-mono text-sm">Basic AI responses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="font-mono text-sm">Session management</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">✗</span>
                <span className="font-mono text-sm text-gray-500">Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">✗</span>
                <span className="font-mono text-sm text-gray-500">Advanced features</span>
              </div>
            </div>

            <button className="btn w-full opacity-50 cursor-not-allowed">
              [CURRENT PLAN]
            </button>
          </div>

          {/* Pro Plan */}
          <div className="card border-green-400 bg-green-900/10 relative">
            <div className="absolute -top-3 -right-3 bg-green-400 text-black px-3 py-1 text-xs font-mono font-bold">
              [RECOMMENDED]
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-mono text-green-400 mb-2">[PRO TIER]</h2>
              <div className="text-3xl font-mono mb-2">$19<span className="text-lg">/month</span></div>
              <p className="text-gray-400 text-sm">For power users</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="font-mono text-sm">Unlimited messages</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="font-mono text-sm">Advanced AI responses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="font-mono text-sm">Priority processing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="font-mono text-sm">Email support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="font-mono text-sm">Advanced features</span>
              </div>
            </div>

            <a 
              href="mailto:hamza@creatic.pro?subject=AI Chat Pro Upgrade Request&body=Hi, I would like to upgrade to the Pro tier. Please provide payment details and upgrade instructions."
              className="btn w-full text-center block hover:bg-green-400 hover:text-black transition-colors"
            >
              [UPGRADE NOW]
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="card border-gray-600 mx-auto">
            <h3 className="text-xl font-mono text-green-400 mb-4">[NEED CUSTOM SOLUTION?]</h3>
            <p className="text-gray-400 font-mono text-sm mb-4">
              Enterprise plans available with custom message limits, dedicated support, and advanced integrations.
            </p>
            <a 
              href="mailto:hamza@creatic.pro?subject=Enterprise AI Chat Solution&body=Hi, I'm interested in an enterprise solution for AI Chat. Please provide more details about custom plans and pricing."
              className="btn"
            >
              [CONTACT SALES]
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h3 className="text-2xl font-mono text-green-400 mb-6 text-center">[FREQUENTLY ASKED]</h3>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="card border-gray-600">
              <h4 className="font-mono text-green-400 mb-2">Q: What happens when I reach the 20 message limit?</h4>
              <p className="text-gray-400 text-sm font-mono">A: You'll be blocked for the day and can continue tomorrow, or upgrade to Pro for unlimited access.</p>
            </div>
            <div className="card border-gray-600">
              <h4 className="font-mono text-green-400 mb-2">Q: Can I cancel anytime?</h4>
              <p className="text-gray-400 text-sm font-mono">A: Yes, contact us to cancel your subscription at any time.</p>
            </div>
            <div className="card border-gray-600">
              <h4 className="font-mono text-green-400 mb-2">Q: How do I upgrade?</h4>
              <p className="text-gray-400 text-sm font-mono">A: Click the upgrade button to send us an email, and we'll set up your Pro account within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
