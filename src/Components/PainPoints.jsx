function PainPoints() {
  const pains = [
    "Preparing for Multiple Exams & Wasting Time",
    "Following Friends Instead of Your Strengths",
    "No Clear Career Direction",
    "Family Pressure & Exam Anxiety"
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Are You Making These Costly Mistakes?
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pains.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">❌</div>
            <p className="font-medium">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PainPoints;
