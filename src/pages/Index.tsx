
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface VerificationResult {
  score: number;
  status: 'genuine' | 'suspicious' | 'fake';
  checks: {
    companyExists: boolean;
    domainMatch: boolean;
    roleVerification: boolean;
    mentorCheck: boolean;
    durationCheck: boolean;
    consistencyScore: number;
  };
  extractedInfo: {
    companyName: string;
    duration: string;
    mentor: string;
    domain: string;
    role: string;
    technologies: string[];
  };
}

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast({
        title: "File uploaded successfully",
        description: `${uploadedFile.name} is ready for analysis.`,
      });
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      toast({
        title: "File uploaded successfully",
        description: `${droppedFile.name} is ready for analysis.`,
      });
    }
  };

  const simulateVerification = (): VerificationResult => {
    // Simulate AI verification process
    const mockResults: VerificationResult[] = [
      {
        score: 85,
        status: 'genuine',
        checks: {
          companyExists: true,
          domainMatch: true,
          roleVerification: true,
          mentorCheck: true,
          durationCheck: true,
          consistencyScore: 82
        },
        extractedInfo: {
          companyName: 'TechCorp Solutions',
          duration: '3 months',
          mentor: 'Sarah Johnson',
          domain: 'Software Development',
          role: 'Frontend Developer Intern',
          technologies: ['React', 'JavaScript', 'CSS', 'Git']
        }
      },
      {
        score: 45,
        status: 'suspicious',
        checks: {
          companyExists: true,
          domainMatch: false,
          roleVerification: true,
          mentorCheck: false,
          durationCheck: true,
          consistencyScore: 38
        },
        extractedInfo: {
          companyName: 'GlobalTech Inc',
          duration: '2 months',
          mentor: 'John Smith',
          domain: 'Data Science',
          role: 'Marketing Intern',
          technologies: ['Python', 'Machine Learning', 'SQL']
        }
      },
      {
        score: 25,
        status: 'fake',
        checks: {
          companyExists: false,
          domainMatch: false,
          roleVerification: false,
          mentorCheck: false,
          durationCheck: false,
          consistencyScore: 15
        },
        extractedInfo: {
          companyName: 'XYZ Innovations',
          duration: '1 week',
          mentor: 'Jane Doe',
          domain: 'Blockchain',
          role: 'Senior AI Engineer Intern',
          technologies: ['Blockchain', 'AI', 'Quantum Computing']
        }
      }
    ];
    
    return mockResults[Math.floor(Math.random() * mockResults.length)];
  };

  const handleVerify = async () => {
    if (!file && !textInput.trim()) {
      toast({
        title: "Input required",
        description: "Please upload documentation or enter internship details.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const verificationResult = simulateVerification();
    setResult(verificationResult);
    setIsVerifying(false);

    toast({
      title: "Analysis complete",
      description: `Internship scored ${verificationResult.score}/100`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'genuine': return 'text-green-500';
      case 'suspicious': return 'text-yellow-500';
      case 'fake': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'genuine': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'suspicious': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'fake': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-navy-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              InternGuard
            </h1>
          </div>
          <p className="text-xl text-navy-200 max-w-3xl mx-auto">
            Advanced AI-powered detection system to identify fraudulent internship experiences and protect hiring integrity
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-navy-300">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Company Verification
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Mentor Validation
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Experience Analysis
            </span>
          </div>
        </div>

        {!result ? (
          /* Upload Interface */
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-navy-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-navy-400" />
                  Internship Experience Analysis
                </CardTitle>
                <p className="text-navy-300">
                  Upload documents or enter details about the internship experience to verify its authenticity
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-navy-800">
                    <TabsTrigger value="upload" className="text-navy-200 data-[state=active]:bg-navy-600 data-[state=active]:text-white">
                      Upload Documents
                    </TabsTrigger>
                    <TabsTrigger value="text" className="text-navy-200 data-[state=active]:bg-navy-600 data-[state=active]:text-white">
                      Enter Details Manually
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="mt-6">
                    <div
                      className="border-2 border-dashed border-navy-500 rounded-lg p-12 text-center hover:border-navy-400 transition-colors cursor-pointer"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      <Upload className="w-16 h-16 text-navy-400 mx-auto mb-4" />
                      <p className="text-white text-lg mb-2">
                        {file ? file.name : 'Drop internship documents here or click to browse'}
                      </p>
                      <p className="text-navy-300 text-sm">
                        Supports certificates, offer letters, completion letters (PDF, JPG, PNG)
                      </p>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="text" className="mt-6">
                    <textarea
                      className="w-full h-48 p-4 bg-navy-800 text-white border border-navy-600 rounded-lg resize-none focus:outline-none focus:border-navy-500"
                      placeholder="Enter internship experience details here...
                      
Example:
Company: TechCorp Solutions
Duration: 3 months (June - August 2024)
Role: Frontend Developer Intern
Mentor: Sarah Johnson (sarah.johnson@techcorp.com)
Domain: Web Development
Technologies: React, JavaScript, CSS, Git
Projects: Built responsive dashboard, Implemented user authentication
Office Location: New York, NY
Stipend: $1500/month
                      "
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                  </TabsContent>
                </Tabs>

                <div className="mt-8 text-center">
                  <Button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="bg-navy-600 hover:bg-navy-500 text-white px-8 py-3 text-lg"
                  >
                    {isVerifying ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Analyzing Experience...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Analyze Internship
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results Interface */
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Score Card */}
              <Card className="bg-white/10 backdrop-blur-sm border-navy-700">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    {getStatusIcon(result.status)}
                    <span className="ml-2">Authenticity Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-white mb-2">
                      {result.score}
                    </div>
                    <div className="text-navy-200">out of 100</div>
                  </div>
                  
                  <div className="mb-4">
                    <Progress 
                      value={result.score} 
                      className="h-3"
                    />
                  </div>
                  
                  <div className="text-center">
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(result.status)} border-current text-lg px-4 py-2`}
                    >
                      {result.status === 'genuine' && '✅ Likely Authentic'}
                      {result.status === 'suspicious' && '⚠️ Requires Review'}
                      {result.status === 'fake' && '❌ Likely Fraudulent'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Extracted Information */}
              <Card className="bg-white/10 backdrop-blur-sm border-navy-700">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Experience Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-navy-300">Company:</span>
                    <span className="text-white ml-2">{result.extractedInfo.companyName}</span>
                  </div>
                  <div>
                    <span className="text-navy-300">Role:</span>
                    <span className="text-white ml-2">{result.extractedInfo.role}</span>
                  </div>
                  <div>
                    <span className="text-navy-300">Duration:</span>
                    <span className="text-white ml-2">{result.extractedInfo.duration}</span>
                  </div>
                  <div>
                    <span className="text-navy-300">Mentor/Supervisor:</span>
                    <span className="text-white ml-2">{result.extractedInfo.mentor}</span>
                  </div>
                  <div>
                    <span className="text-navy-300">Domain:</span>
                    <span className="text-white ml-2">{result.extractedInfo.domain}</span>
                  </div>
                  <div>
                    <span className="text-navy-300">Technologies/Skills:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {result.extractedInfo.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-navy-700 text-navy-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Checks */}
            <Card className="bg-white/10 backdrop-blur-sm border-navy-700 mt-8">
              <CardHeader>
                <CardTitle className="text-white text-xl">Verification Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    {result.checks.companyExists ? 
                      <CheckCircle className="w-5 h-5 text-green-500" /> : 
                      <XCircle className="w-5 h-5 text-red-500" />
                    }
                    <span className="text-white">Company Verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {result.checks.domainMatch ? 
                      <CheckCircle className="w-5 h-5 text-green-500" /> : 
                      <XCircle className="w-5 h-5 text-red-500" />
                    }
                    <span className="text-white">Domain Alignment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {result.checks.roleVerification ? 
                      <CheckCircle className="w-5 h-5 text-green-500" /> : 
                      <XCircle className="w-5 h-5 text-red-500" />
                    }
                    <span className="text-white">Role Validation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {result.checks.mentorCheck ? 
                      <CheckCircle className="w-5 h-5 text-green-500" /> : 
                      <XCircle className="w-5 h-5 text-red-500" />
                    }
                    <span className="text-white">Mentor Verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {result.checks.durationCheck ? 
                      <CheckCircle className="w-5 h-5 text-green-500" /> : 
                      <XCircle className="w-5 h-5 text-red-500" />
                    }
                    <span className="text-white">Duration Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{result.checks.consistencyScore}</span>
                    </div>
                    <span className="text-white">Consistency Score</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => setResult(null)}
                variant="outline"
                className="border-navy-500 text-white hover:bg-navy-700"
              >
                Analyze Another Experience
              </Button>
              <Button className="bg-navy-600 hover:bg-navy-500 text-white">
                Download Analysis Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
