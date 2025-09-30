"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Heart,
  AlertTriangle,
  Calendar,
  MapPin,
  BarChart3,
  PieChartIcon,
} from "lucide-react"

// Mock data for analytics
const diseaseData = [
  { name: "Diabetes", cases: 2400, trend: 12, color: "#3B82F6" },
  { name: "Hypertension", cases: 1800, trend: -5, color: "#EF4444" },
  { name: "Heart Disease", cases: 1200, trend: 8, color: "#F59E0B" },
  { name: "Respiratory", cases: 900, trend: -12, color: "#10B981" },
  { name: "Mental Health", cases: 750, trend: 25, color: "#8B5CF6" },
  { name: "Cancer", cases: 600, trend: 3, color: "#EC4899" },
]

const ageGroupData = [
  { name: "0-18", value: 25, color: "#3B82F6" },
  { name: "19-35", value: 35, color: "#10B981" },
  { name: "36-50", value: 22, color: "#F59E0B" },
  { name: "51-65", value: 12, color: "#EF4444" },
  { name: "65+", value: 6, color: "#8B5CF6" },
]

const monthlyTrends = [
  { month: "Jan", patients: 1200, appointments: 980, emergencies: 45 },
  { month: "Feb", patients: 1350, appointments: 1100, emergencies: 52 },
  { month: "Mar", patients: 1180, appointments: 950, emergencies: 38 },
  { month: "Apr", patients: 1420, appointments: 1200, emergencies: 41 },
  { month: "May", patients: 1580, appointments: 1350, emergencies: 48 },
  { month: "Jun", patients: 1650, appointments: 1400, emergencies: 55 },
]

const cityData = [
  { city: "Karachi", patients: 3200, hospitals: 45, doctors: 1200 },
  { city: "Lahore", patients: 2800, hospitals: 38, doctors: 980 },
  { city: "Islamabad", patients: 1500, hospitals: 22, doctors: 650 },
  { city: "Faisalabad", patients: 1200, hospitals: 18, doctors: 420 },
  { city: "Rawalpindi", patients: 980, hospitals: 15, doctors: 380 },
]

const topSymptoms = [
  { symptom: "Fever", count: 1250, percentage: 22 },
  { symptom: "Headache", count: 980, percentage: 17 },
  { symptom: "Cough", count: 850, percentage: 15 },
  { symptom: "Fatigue", count: 720, percentage: 13 },
  { symptom: "Chest Pain", count: 650, percentage: 11 },
  { symptom: "Nausea", count: 480, percentage: 8 },
  { symptom: "Dizziness", count: 420, percentage: 7 },
  { symptom: "Back Pain", count: 380, percentage: 7 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("patients")

  const totalPatients = 8750
  const totalAppointments = 6200
  const totalEmergencies = 279
  const totalDoctors = 3630

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Healthcare Analytics</h1>
            <p className="text-gray-600">Comprehensive health data insights for Pakistan</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-3xl font-bold text-gray-900">{totalPatients.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12.5% from last month</span>
                  </div>
                </div>
                <Users className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{totalAppointments.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+8.2% from last month</span>
                  </div>
                </div>
                <Calendar className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Emergency Cases</p>
                  <p className="text-3xl font-bold text-gray-900">{totalEmergencies}</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600">-3.1% from last month</span>
                  </div>
                </div>
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Doctors</p>
                  <p className="text-3xl font-bold text-gray-900">{totalDoctors.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+5.7% from last month</span>
                  </div>
                </div>
                <Activity className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diseases">Disease Trends</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Monthly Trends
                  </CardTitle>
                  <CardDescription>Patient visits and appointments over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="patients"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="appointments"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* City Distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    City-wise Distribution
                  </CardTitle>
                  <CardDescription>Healthcare metrics by major cities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="city" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="patients" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Trends */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  Emergency Cases Trend
                </CardTitle>
                <CardDescription>Monthly emergency case statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="emergencies" stroke="#EF4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diseases" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Disease Cases Chart */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Disease Prevalence</CardTitle>
                  <CardDescription>Most common diseases in Pakistan</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={diseaseData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="cases" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Disease Trends */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Disease Trends</CardTitle>
                  <CardDescription>Monthly change in disease cases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {diseaseData.map((disease) => (
                    <div key={disease.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: disease.color }}></div>
                        <div>
                          <p className="font-medium">{disease.name}</p>
                          <p className="text-sm text-gray-600">{disease.cases.toLocaleString()} cases</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {disease.trend > 0 ? (
                          <TrendingUp className="h-4 w-4 text-red-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-500" />
                        )}
                        <span
                          className={`text-sm font-medium ${disease.trend > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {disease.trend > 0 ? "+" : ""}
                          {disease.trend}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Age Group Distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="mr-2 h-5 w-5" />
                    Age Group Distribution
                  </CardTitle>
                  <CardDescription>Patient demographics by age</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ageGroupData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ageGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Demographics Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Demographics Breakdown</CardTitle>
                  <CardDescription>Detailed age group statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ageGroupData.map((group) => (
                    <div key={group.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: group.color }}></div>
                          <span className="font-medium">{group.name} years</span>
                        </div>
                        <span className="text-sm font-medium">{group.value}%</span>
                      </div>
                      <Progress value={group.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* City Healthcare Infrastructure */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Healthcare Infrastructure by City</CardTitle>
                <CardDescription>Hospitals and doctors distribution across major cities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cityData.map((city) => (
                    <Card key={city.city} className="border">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-3">{city.city}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Patients:</span>
                            <span className="font-medium">{city.patients.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hospitals:</span>
                            <span className="font-medium">{city.hospitals}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Doctors:</span>
                            <span className="font-medium">{city.doctors.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ratio:</span>
                            <span className="font-medium">{Math.round(city.patients / city.doctors)}:1</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Symptoms Chart */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Most Common Symptoms</CardTitle>
                  <CardDescription>Symptoms reported by patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={topSymptoms}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="symptom" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Symptoms List */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Symptom Statistics</CardTitle>
                  <CardDescription>Detailed breakdown of reported symptoms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topSymptoms.map((symptom, index) => (
                    <div key={symptom.symptom} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="font-medium">{symptom.symptom}</p>
                          <p className="text-sm text-gray-600">{symptom.count.toLocaleString()} reports</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">{symptom.percentage}%</p>
                        <Progress value={symptom.percentage} className="w-16 h-2 mt-1" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Symptom Trends */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-500" />
                  Symptom Trends Analysis
                </CardTitle>
                <CardDescription>Key insights from symptom data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-blue-900 mb-2">Most Common</h3>
                    <p className="text-sm text-blue-800">
                      Fever remains the most reported symptom, accounting for 22% of all cases.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h3 className="font-semibold text-green-900 mb-2">Trending Down</h3>
                    <p className="text-sm text-green-800">
                      Respiratory symptoms have decreased by 15% compared to last month.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="font-semibold text-yellow-900 mb-2">Watch List</h3>
                    <p className="text-sm text-yellow-800">
                      Mental health symptoms showing 25% increase, requiring attention.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
