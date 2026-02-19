function ExamCoverage() {
  const categories = [
    "Engineering Exams",
    "Medical Entrance",
    "Management Exams",
    "Central Govt Jobs",
    "State Govt Jobs",
    "Defense & Teaching"
  ];

  return (
    <section id="exams" className="bg-gray-50 py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        We Cover 50+ Competitive Exams
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-lg">{item}</h3>
          </div>
        ))}
      </div>

      <button className="mt-12 bg-orange-500 hover:bg-orange-400 text-white px-8 py-3 rounded-lg shadow-lg cursor-pointer">
        Find My Perfect Exam
      </button>
    </section>
  );
}

export default ExamCoverage;
