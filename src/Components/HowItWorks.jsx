function HowItWorks() {
  return (
    <section id="how" className="py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        From Confusion to Clarity in 3 Steps
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">

        <div>
          <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            1
          </div>
          <h3 className="font-semibold text-lg mb-2">Take the Test</h3>
          <p className="text-gray-600">
            Complete a 90-minute comprehensive assessment.
          </p>
        </div>

        <div>
          <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            2
          </div>
          <h3 className="font-semibold text-lg mb-2">Get Your Report</h3>
          <p className="text-gray-600">
            Receive detailed suitability scores instantly.
          </p>
        </div>

        <div>
          <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            3
          </div>
          <h3 className="font-semibold text-lg mb-2">Follow Roadmap</h3>
          <p className="text-gray-600">
            Get personalized preparation strategy.
          </p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
