import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Brain, MapPin, TrendingUp, MessageCircle, ArrowLeft, Globe, BarChart3, Users } from 'lucide-react';
import { ComposedChart, Bar, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { ChatbotWidget } from '@/components/ui/chatbot-widget';

// Mock doctor dashboard data
const doctorData = {
  insights: [
    {
      title: "Treatment Response Optimization",
      description: "78% of Stage II breast cancer patients responded best to combined immunotherapy and targeted therapy",
      percentage: 78,
      trend: "up",
      category: "Treatment"
    },
    {
      title: "Early Detection Impact",
      description: "Patients diagnosed through AI-assisted screening show 23% better 5-year survival rates",
      percentage: 23,
      trend: "up",
      category: "Screening"
    },
    {
      title: "Side Effect Management",
      description: "Personalized dosing protocols reduced severe side effects by 34% across all treatment groups",
      percentage: 34,
      trend: "up",
      category: "Care Quality"
    },
    {
      title: "Geographic Health Disparities",
      description: "Rural areas show 15% later stage diagnoses, suggesting need for mobile screening programs",
      percentage: 15,
      trend: "down",
      category: "Public Health"
    }
  ],
  regionalData: [
    { region: "North America", cases: 2400, survival: 82, lat: 45, lng: -100 },
    { region: "Europe", cases: 1890, survival: 79, lat: 50, lng: 10 },
    { region: "Asia Pacific", cases: 3200, survival: 71, lat: 35, lng: 120 },
    { region: "South America", cases: 680, survival: 68, lat: -15, lng: -60 },
    { region: "Africa", cases: 450, survival: 58, lat: 0, lng: 20 },
    { region: "Middle East", cases: 320, survival: 65, lat: 25, lng: 45 }
  ],
  treatmentOutcomes: [
    { treatment: "Immunotherapy", success: 85, cases: 1200 },
    { treatment: "Targeted Therapy", success: 78, cases: 980 },
    { treatment: "Chemotherapy", success: 72, cases: 1500 },
    { treatment: "Surgery Only", success: 68, cases: 800 },
    { treatment: "Radiation", success: 74, cases: 600 }
  ],
  cancerTypes: [
    { name: "Breast", value: 35, color: "#3b82f6" },
    { name: "Lung", value: 28, color: "#ef4444" },
    { name: "Colorectal", value: 15, color: "#f59e0b" },
    { name: "Prostate", value: 12, color: "#10b981" },
    { name: "Other", value: 10, color: "#6b7280" }
  ]
};

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const getIntensityColor = (cases: number) => {
    const maxCases = Math.max(...doctorData.regionalData.map(d => d.cases));
    const intensity = cases / maxCases;
    
    if (intensity > 0.8) return 'bg-destructive';
    if (intensity > 0.6) return 'bg-warning';
    if (intensity > 0.4) return 'bg-info';
    if (intensity > 0.2) return 'bg-accent';
    return 'bg-success';
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
                <h1 className="text-2xl font-semibold">Professional Dashboard</h1>
                <p className="text-muted-foreground">OncoAI Clinical Insights</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                <Users className="h-4 w-4 mr-2" />
                {doctorData.regionalData.reduce((acc, curr) => acc + curr.cases, 0).toLocaleString()} Patients
              </Badge>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask OncoAI
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* AI Insights Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">AI-Generated Insights</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {doctorData.insights.map((insight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {insight.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {insight.percentage}%
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${
                        insight.trend === 'up' ? 'text-success' : 'text-warning'
                      }`}>
                        <TrendingUp className={`h-4 w-4 ${
                          insight.trend === 'down' ? 'rotate-180' : ''
                        }`} />
                        {insight.trend === 'up' ? 'Improvement' : 'Attention Needed'}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Geographical Heatmap */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global Cancer Case Distribution
              </CardTitle>
              <CardDescription>
                Patient case density and survival rates by region
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simplified world map representation */}
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg h-80 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Interactive map visualization would appear here</p>
                  </div>
                </div>
                
                {/* Regional data overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      {doctorData.regionalData.map((region, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getIntensityColor(region.cases)}`}></div>
                          <div>
                            <div className="font-medium">{region.region}</div>
                            <div className="text-muted-foreground">
                              {region.cases} cases • {region.survival}% survival
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Treatment Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Treatment Success Rates
              </CardTitle>
              <CardDescription>
                Comparative effectiveness across different treatment modalities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={doctorData.treatmentOutcomes}>
                    <XAxis dataKey="treatment" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="success" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Area 
                      dataKey="cases" 
                      fill="hsl(var(--accent))" 
                      fillOpacity={0.3}
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cancer Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Cancer Type Distribution</CardTitle>
              <CardDescription>
                Current patient case breakdown by cancer type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={doctorData.cancerTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {doctorData.cancerTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Chat Button */}
      <ChatbotWidget userType="doctor" />
    </div>
  );
};

export default DoctorDashboard;