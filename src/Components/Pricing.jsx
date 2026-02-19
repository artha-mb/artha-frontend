import { Check } from "lucide-react";

function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4">
          Choose Your Plan
        </h2>
        <p className="mb-12 text-lg opacity-90">
          Start free and upgrade when you're ready to unlock full career insights.
        </p>

        {/* ALL PLANS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* FREE PLAN */}
          <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl border-2 border-transparent hover:border-orange-500 hover:scale-105 transition-all duration-300">

            <h3 className="text-xl font-bold mb-4 text-purple-700">
              Free Career Test
            </h3>

            {/* Price Removed */}

            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Basic Career Readiness Test
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Strength & Interest Overview
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Suggested Exam Category
              </li>
            </ul>

            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 cursor-pointer">
              Start Free Test
            </button>
          </div>

          {/* ₹299 */}
          <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl border-2 border-transparent hover:border-orange-500 hover:scale-105 transition-all duration-300">

            <h3 className="text-xl font-bold mb-4 text-purple-700">
              Basic Plan
            </h3>

            <p className="text-3xl font-bold mb-6">₹299</p>

            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Detailed Career Report
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Exam Recommendations
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Basic Preparation Roadmap
              </li>
            </ul>

            <button className="bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-orange-400 transition-all duration-300">
              Get Started
            </button>
          </div>

          {/* ₹799 */}
          <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl border-2 border-transparent hover:border-orange-500 hover:scale-105 transition-all duration-300">

            <h3 className="text-xl font-bold mb-4 text-purple-700">
              Pro Plan
            </h3>

            <p className="text-3xl font-bold mb-6">₹799</p>

            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Everything in Basic
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Career Comparison Analysis
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Personalized Strategy Plan
              </li>
            </ul>

            <button className="bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-orange-400 transition-all duration-300">
              Upgrade Now
            </button>
          </div>

          {/* ₹1999 */}
          <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl border-2 border-transparent hover:border-orange-500 hover:scale-105 transition-all duration-300">

            <h3 className="text-xl font-bold mb-4 text-purple-700">
              Premium Plan
            </h3>

            <p className="text-3xl font-bold mb-6">₹1999</p>

            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Everything in Pro
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                1-on-1 Expert Guidance
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500" size={18} />
                Priority Support Access
              </li>
            </ul>

            <button className="bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-orange-400 transition-all duration-300">
              Go Premium
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Pricing;
