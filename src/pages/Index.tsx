import PredictionForm from "@/components/PredictionForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ML Prediction Interface
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter your numerical data and get instant predictions from the Flask API
          </p>
        </header>

        <PredictionForm />

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Connected to Flask API • Real-time predictions • Secure data handling</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
