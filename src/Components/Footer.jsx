function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">
            Artha
          </h2>
          <p className="text-sm text-gray-400">
            Helping students make smarter career decisions through
            scientifically designed Career Readiness Assessments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#how" className="hover:text-white">How It Works</a></li>
            <li><a href="#exams" className="hover:text-white">Exams Covered</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Mental Health Support</a></li>
            <li><a href="#" className="hover:text-white">Counseling</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Help Center</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">
            Get career tips & exam updates directly to your inbox.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-l-lg text-orange-600 outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-400 px-4 rounded-r-lg text-white">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Artha. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
