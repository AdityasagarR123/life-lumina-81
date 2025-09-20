import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { User, Stethoscope } from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('patient');
  const navigate = useNavigate();

  const handleLogin = (userType: 'patient' | 'doctor') => {
    if (userType === 'patient') {
      navigate('/patient-dashboard');
    } else {
      navigate('/doctor-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light mb-4">OncoAI</h1>
          <p className="text-muted-foreground">Access your personalized cancer care insights</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="patient" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Patient
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Doctor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patient">
            <Card>
              <CardHeader>
                <CardTitle>Patient Login</CardTitle>
                <CardDescription>
                  Access your personalized treatment analysis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-email">Email</Label>
                  <Input id="patient-email" placeholder="Enter your email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-password">Password</Label>
                  <Input id="patient-password" type="password" placeholder="Enter your password" />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleLogin('patient')}
                >
                  Access My Dashboard
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  New patient? Contact your healthcare provider for access
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctor">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Login</CardTitle>
                <CardDescription>
                  Access patient insights and aggregated medical data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">Email</Label>
                  <Input id="doctor-email" placeholder="doctor@hospital.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-password">Password</Label>
                  <Input id="doctor-password" type="password" placeholder="Enter your password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-id">Medical License ID</Label>
                  <Input id="doctor-id" placeholder="Enter your license number" />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleLogin('doctor')}
                >
                  Access Professional Dashboard
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Healthcare professionals only
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-muted-foreground"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;