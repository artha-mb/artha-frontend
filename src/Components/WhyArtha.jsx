import { CheckCircle } from "lucide-react";

export default function WhyArtha() {

  const features = [
    "Comprehensive mock tests with detailed analytics",
    "Topic-wise practice across all subjects",
    "Real-time performance tracking and insights",
    "Personalized career path recommendations",
    "Expert guidance from experienced counselors",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#8806CE]">
          Why Choose Artha?
        </h2>

        {/* Features */}
        <div className="space-y-6 mb-16">
          {features.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle
                className="text-green-500 mt-1"
                size={24}
              />
              <p className="text-lg text-black">{item}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="border border-gray-300 bg-white rounded-2xl p-10 text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-black">
            Ready to Get Started?
          </h3>

          <p className="text-black mb-8">
            Join thousands of students achieving their dreams with AI-powered guidance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            {/* Filled Button */}
            <button
              onClick={() => navigate("/mock-test")}
              className="bg-[#8806CE] cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#65049C] transition-all duration-300"
            >
              Take Free Mock
            </button>

            {/* Outline Button */}
            <button
              onClick={() => navigate("/book-session")}
              className="border-2 cursor-pointer border-[#8806CE] text-[#8806CE] px-8 py-3 rounded-lg font-semibold hover:bg-[#65049C] hover:text-white hover:border-[#65049C] transition-all duration-300"
            >
              Book Career Session
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
