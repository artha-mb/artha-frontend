function MentalHealth() {
  return (
    <section className="bg-blue-50 py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">

        <div className="text-5xl mb-6">🧠💚</div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Feeling Overwhelmed or Anxious?
        </h2>

        <p className="text-lg text-gray-600 mb-10">
          68% of students face mental stress during exam preparation.
          Artha not only evaluates your skills but also supports
          your mental well-being.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Free Counseling</h3>
            <p className="text-sm text-gray-600">
              Talk to certified psychologists about exam stress.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Career Clarity</h3>
            <p className="text-sm text-gray-600">
              Clarity reduces anxiety and builds confidence.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Ongoing Support</h3>
            <p className="text-sm text-gray-600">
              Monthly check-ins to track mental progress.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default MentalHealth;
