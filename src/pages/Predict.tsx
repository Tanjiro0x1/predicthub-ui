import PredictionForm from "@/components/PredictionForm";
import Navbar from "@/components/Navbar";

const Predict = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get Your Job Prediction
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter job details below and our AI will analyze the match, salary expectations, and provide insights
          </p>
        </header>

        <PredictionForm />
      </div>

      <footer className="border-t mt-16 py-8 text-center text-sm text-muted-foreground">
        <p>Powered by Flask ML API • Real-time predictions • Secure data handling</p>
      </footer>
    </div>
  );
};

export default Predict;
