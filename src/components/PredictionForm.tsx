import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface PredictionResult {
  prediction: number | string;
  confidence?: number;
  details?: Record<string, any>;
}

const PredictionForm = () => {
  const [inputs, setInputs] = useState({
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState("http://localhost:5000/predict");

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const values = Object.values(inputs);
    if (values.some((val) => val === "" || isNaN(Number(val)))) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numerical values for all fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const payload = {
        features: [
          parseFloat(inputs.feature1),
          parseFloat(inputs.feature2),
          parseFloat(inputs.feature3),
          parseFloat(inputs.feature4),
        ],
      };

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      
      toast({
        title: "Prediction Successful",
        description: "The model has processed your input.",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Prediction Failed",
        description: error instanceof Error ? error.message : "Unable to connect to the prediction API.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-2xl">Input Data</CardTitle>
          <CardDescription>Enter numerical values for prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feature1">Feature 1</Label>
              <Input
                id="feature1"
                type="number"
                step="any"
                placeholder="Enter value"
                value={inputs.feature1}
                onChange={(e) => handleInputChange("feature1", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feature2">Feature 2</Label>
              <Input
                id="feature2"
                type="number"
                step="any"
                placeholder="Enter value"
                value={inputs.feature2}
                onChange={(e) => handleInputChange("feature2", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feature3">Feature 3</Label>
              <Input
                id="feature3"
                type="number"
                step="any"
                placeholder="Enter value"
                value={inputs.feature3}
                onChange={(e) => handleInputChange("feature3", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feature4">Feature 4</Label>
              <Input
                id="feature4"
                type="number"
                step="any"
                placeholder="Enter value"
                value={inputs.feature4}
                onChange={(e) => handleInputChange("feature4", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="endpoint" className="text-sm text-muted-foreground">
                API Endpoint (optional)
              </Label>
              <Input
                id="endpoint"
                type="text"
                placeholder="http://localhost:5000/predict"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                disabled={loading}
                className="text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-[var(--shadow-soft)] transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Get Prediction"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-2xl">Prediction Result</CardTitle>
          <CardDescription>Model output will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <svg
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground">No prediction yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Submit the form to see results
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-6 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Prediction</p>
                <p className="text-4xl font-bold text-foreground">
                  {typeof result.prediction === "number"
                    ? result.prediction.toFixed(4)
                    : result.prediction}
                </p>
              </div>

              {result.confidence !== undefined && (
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {(result.confidence * 100).toFixed(2)}%
                  </p>
                </div>
              )}

              {result.details && Object.keys(result.details).length > 0 && (
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <p className="text-sm font-medium text-foreground mb-3">Additional Details</p>
                  {Object.entries(result.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/_/g, " ")}:
                      </span>
                      <span className="font-medium text-foreground">
                        {typeof value === "number" ? value.toFixed(4) : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionForm;
