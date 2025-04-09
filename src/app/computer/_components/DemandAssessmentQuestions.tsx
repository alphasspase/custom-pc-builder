export default function DemandAssessmentQuestions() {
  return (
    <section className="p-10 py-20 flex items-center justify-center bg-primary-gray-600">
      <div className="text-center space-y-8">
        <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
          <h1>
            Demand
            <span className="text-transparent px-2 bg-gradient-to-r from-yellow-300 to-primary bg-clip-text">
              Assesment
            </span>
            Questions
          </h1>
        </div>

        <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          {`Unleash the power of our intelligent configurator and craft your perfect PC. Answer a few simple questions, and we’ll tailor a build with the best components to match your needs—whether you’re gaming, streaming, or multitasking.`}
        </p>
      </div>
    </section>
  );
}
