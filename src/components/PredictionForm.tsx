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
    companyName: "",
    jobDescription: "",
    jobRole: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!inputs.companyName || !inputs.jobRole || !inputs.jobDescription || !inputs.salary) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(Number(inputs.salary))) {
      toast({
        title: "Invalid Salary",
        description: "Please enter a valid numerical value for salary.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const payload = {
        company_name: inputs.companyName,
        job_description: inputs.jobDescription,
        job_role: inputs.jobRole,
        salary: parseFloat(inputs.salary),
      };

      const response = await fetch("http://localhost:5000/predict", {
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
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="e.g., Tech Corp"
                value={inputs.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobRole">Job Role</Label>
              <Input
                id="jobRole"
                type="text"
                placeholder="e.g., Software Engineer"
                value={inputs.jobRole}
                onChange={(e) => handleInputChange("jobRole", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <textarea
                id="jobDescription"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter job description and requirements..."
                value={inputs.jobDescription}
                onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Expected Salary</Label>
              <Input
                id="salary"
                type="number"
                step="any"
                placeholder="e.g., 85000"
                value={inputs.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                disabled={loading}
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
