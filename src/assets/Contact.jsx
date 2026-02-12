import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-violet-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">

        {/* Left Side - Company Info */}
        <div className="text-black flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold">Get in Touch</h2>
          <p className="text-lg text-gray-600">
            We would love to hear from you! Whether you have a question about
            services, pricing, or anything else, our team is ready to answer
            all your questions.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-xl">📍 Address</h4>
              <p className="text-gray-600">123 Business Street, City, Country</p>
            </div>

            <div>
              <h4 className="font-semibold text-xl">📞 Phone</h4>
              <p className="text-gray-600">+91 1234567890</p>
            </div>

            <div>
              <h4 className="font-semibold text-xl">✉️ Email</h4>
              <p className="text-gray-600">contact@company.com</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form className="space-y-5">
            <div>
              <label className="block text-black mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-black mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-black mb-2 font-medium">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8806CE] text-white font-semibold py-3 rounded-lg hover:bg-[#65049C] transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
