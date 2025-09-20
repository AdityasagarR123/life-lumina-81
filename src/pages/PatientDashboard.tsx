import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { RiskMeter } from '@/components/ui/risk-meter';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Activity, MessageCircle, ArrowLeft, CheckCircle, DollarSign, Bandage } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { ChatbotWidget } from '@/components/ui/chatbot-widget';

// Mock patient data
const patientData = {
  name: "Sarah Johnson",
  age: 45,
  cancerType: "Breast Cancer",
  stage: "Stage II",
  survivalProbability: 87,
  survivalTimeframe: "5 years",
  riskLevel: "Moderate" as "Low" | "Moderate" | "High",
  treatments: [
    {
      name: "Targeted Therapy A",
      effectiveness: 92,
      affordability: 78,
      sideEffectMinimization: 85
    },
    {
      name: "Chemotherapy Protocol B",
      effectiveness: 88,
      affordability: 95,
      sideEffectMinimization: 65
    },
    {
      name: "Immunotherapy C",
      effectiveness: 82,
      affordability: 60,
      sideEffectMinimization: 90
    }
  ],
  sideEffects: [
    { name: "Fatigue", riskScore: 65 },
    { name: "Nausea", riskScore: 45 },
    { name: "Hair Loss", riskScore: 80 },
    { name: "Appetite Loss", riskScore: 35 },
    { name: "Neuropathy", riskScore: 25 }
  ]
};

const PatientDashboard = () => {
  const navigate = useNavigate();

  const getRiskColor = (score: number) => {
    if (score < 30) return 'hsl(var(--success))';
    if (score < 60) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-semibold">Patient Dashboard</h1>
                <p className="text-muted-foreground">OncoAI Analysis</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with OncoAI
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Welcome, {patientData.name}!
            </CardTitle>
            <CardDescription className="text-lg">
              Here is a summary of your OncoAI analysis for {patientData.cancerType} ({patientData.stage})
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Survival Probability */}
          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-success">
                <Shield className="h-5 w-5" />
                Survival Probability
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProgressCircle
                value={patientData.survivalProbability}
                color="hsl(var(--success))"
                className="mb-4"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{patientData.survivalProbability}%</div>
                  <div className="text-sm text-muted-foreground">5 year</div>
                </div>
              </ProgressCircle>
              <p className="text-center text-muted-foreground">
                Your estimated survivability over {patientData.survivalTimeframe} is{' '}
                <span className="font-semibold text-success">{patientData.survivalProbability}%</span>
              </p>
            </CardContent>
          </Card>

          {/* Risk Level */}
          <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-warning">
                <Activity className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <RiskMeter level={patientData.riskLevel} className="mb-4" />
              <p className="text-center text-muted-foreground">
                Current Risk Level:{' '}
                <Badge 
                  variant={
                    patientData.riskLevel === 'Low' 
                      ? 'default' 
                      : patientData.riskLevel === 'Moderate' 
                        ? 'secondary' 
                        : 'destructive'
                  }
                  className={
                    patientData.riskLevel === 'Low'
                      ? 'bg-success text-success-foreground'
                      : patientData.riskLevel === 'Moderate'
                        ? 'bg-warning text-warning-foreground'
                        : 'bg-destructive text-destructive-foreground'
                  }
                >
                  {patientData.riskLevel}
                </Badge>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Treatment Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recommended Treatments</CardTitle>
            <CardDescription>
              Treatment options ranked by effectiveness, affordability, and side effect profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {patientData.treatments.map((treatment, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      {treatment.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Effectiveness</span>
                          <span className="text-sm font-bold">{treatment.effectiveness}%</span>
                        </div>
                        <Progress value={treatment.effectiveness} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-success" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Affordability</span>
                          <span className="text-sm font-bold">{treatment.affordability}%</span>
                        </div>
                        <Progress value={treatment.affordability} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Bandage className="h-5 w-5 text-success" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Side Effects</span>
                          <span className="text-sm font-bold">{treatment.sideEffectMinimization}%</span>
                        </div>
                        <Progress value={treatment.sideEffectMinimization} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Side Effects Risk */}
        <Card>
          <CardHeader>
            <CardTitle>Potential Side Effects & Risk Assessment</CardTitle>
            <CardDescription>
              Understanding possible side effects helps in making informed decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientData.sideEffects} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="riskScore" radius={[4, 4, 0, 0]}>
                    {patientData.sideEffects.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRiskColor(entry.riskScore)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-success"></div>
                <span>Low Risk (0-30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-warning"></div>
                <span>Moderate Risk (30-60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-destructive"></div>
                <span>High Risk (60%+)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Chat Button */}
      <ChatbotWidget userType="patient" />
    </div>
  );
};

export default PatientDashboard;