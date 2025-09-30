"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Ambulance,
  Phone,
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  Heart,
  Shield,
  Navigation,
  Star,
  Zap,
  PhoneCall,
} from "lucide-react"

interface Hospital {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  specialties: string[]
  emergencyServices: string[]
  phone: string
  estimatedTime: string
}

interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  image?: string
}

const nearbyHospitals: Hospital[] = [
  {
    id: "1",
    name: "Aga Khan University Hospital",
    address: "Stadium Road, Karachi",
    distance: "2.3 km",
    rating: 4.8,
    specialties: ["Cardiology", "Emergency Medicine", "Trauma Care"],
    emergencyServices: ["24/7 Emergency", "Ambulance", "ICU", "Trauma Center"],
    phone: "+92-21-34864000",
    estimatedTime: "8 mins",
  },
  {
    id: "2",
    name: "Liaquat National Hospital",
    address: "National Stadium Road, Karachi",
    distance: "3.1 km",
    rating: 4.6,
    specialties: ["Emergency Medicine", "Surgery", "Orthopedics"],
    emergencyServices: ["24/7 Emergency", "Ambulance", "Surgery", "Blood Bank"],
    phone: "+92-21-34412001",
    estimatedTime: "12 mins",
  },
  {
    id: "3",
    name: "Ziauddin Hospital",
    address: "Clifton, Karachi",
    distance: "4.2 km",
    rating: 4.5,
    specialties: ["Emergency Medicine", "Neurology", "Cardiology"],
    emergencyServices: ["24/7 Emergency", "Ambulance", "ICU", "Dialysis"],
    phone: "+92-21-35862937",
    estimatedTime: "15 mins",
  },
]

const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "Ahmad Ali",
    relationship: "Father",
    phone: "+92-300-1234567",
    image: "/male-contact.png",
  },
  {
    id: "2",
    name: "Fatima Ali",
    relationship: "Mother",
    phone: "+92-300-7654321",
    image: "/female-contact.png",
  },
  {
    id: "3",
    name: "Hassan Ali",
    relationship: "Brother",
    phone: "+92-301-9876543",
    image: "/male-contact-2.png",
  },
]

export default function EmergencyPage() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [emergencyDetails, setEmergencyDetails] = useState({
    type: "",
    description: "",
    location: "",
  })
  const [ambulanceStatus, setAmbulanceStatus] = useState<"idle" | "calling" | "dispatched" | "arriving">("idle")

  const handleEmergencyCall = () => {
    setIsEmergencyActive(true)
    setAmbulanceStatus("calling")

    // Simulate ambulance dispatch process
    setTimeout(() => {
      setAmbulanceStatus("dispatched")
      // Notify family members
      notifyFamily()
    }, 3000)

    setTimeout(() => {
      setAmbulanceStatus("arriving")
    }, 8000)
  }

  const notifyFamily = () => {
    // Simulate family notification
    console.log("Notifying family members...")
    emergencyContacts.forEach((contact) => {
      console.log(`Sending emergency alert to ${contact.name} at ${contact.phone}`)
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "calling":
        return "bg-yellow-100 text-yellow-800"
      case "dispatched":
        return "bg-blue-100 text-blue-800"
      case "arriving":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "calling":
        return "Connecting to emergency services..."
      case "dispatched":
        return "Ambulance dispatched - ETA 8 minutes"
      case "arriving":
        return "Ambulance arriving soon!"
      default:
        return "Ready for emergency"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Emergency Alert Banner */}
        {isEmergencyActive && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <div>
                  <h3 className="font-semibold text-red-900">Emergency Active</h3>
                  <p className="text-sm text-red-700">{getStatusMessage(ambulanceStatus)}</p>
                </div>
              </div>
              <Badge className={getStatusColor(ambulanceStatus)}>
                {ambulanceStatus === "calling" && <Phone className="mr-1 h-3 w-3" />}
                {ambulanceStatus === "dispatched" && <Ambulance className="mr-1 h-3 w-3" />}
                {ambulanceStatus === "arriving" && <Navigation className="mr-1 h-3 w-3" />}
                {ambulanceStatus.charAt(0).toUpperCase() + ambulanceStatus.slice(1)}
              </Badge>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="h-12 w-12 text-red-600" />
              <Zap className="h-6 w-6 text-yellow-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Emergency Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get immediate help when you need it most. Our emergency services are available 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emergency Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Emergency Call */}
            <Card className="border-0 shadow-lg border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-2xl text-red-900 flex items-center">
                  <Ambulance className="mr-3 h-8 w-8" />
                  Emergency Ambulance
                </CardTitle>
                <CardDescription className="text-lg">
                  Call an ambulance immediately for life-threatening emergencies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyType">Emergency Type</Label>
                    <Input
                      id="emergencyType"
                      placeholder="e.g., Heart attack, Accident"
                      value={emergencyDetails.type}
                      onChange={(e) => setEmergencyDetails({ ...emergencyDetails, type: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Current Location</Label>
                    <Input
                      id="location"
                      placeholder="Your current address"
                      value={emergencyDetails.location}
                      onChange={(e) => setEmergencyDetails({ ...emergencyDetails, location: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleEmergencyCall}
                      disabled={ambulanceStatus !== "idle"}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                      size="lg"
                    >
                      <PhoneCall className="mr-2 h-5 w-5" />
                      {ambulanceStatus === "idle" ? "Call Ambulance" : "Emergency Active"}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the emergency situation..."
                    value={emergencyDetails.description}
                    onChange={(e) => setEmergencyDetails({ ...emergencyDetails, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Users className="mr-2 h-6 w-6 text-blue-600" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>Family members who will be notified automatically</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.image || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.relationship}</p>
                        <p className="text-sm text-blue-600">{contact.phone}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Contacts
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Guidelines */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Heart className="mr-2 h-6 w-6 text-red-500" />
                  Emergency Guidelines
                </CardTitle>
                <CardDescription>Important steps to follow during emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-red-900 mb-3">Heart Attack Signs</h3>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Chest pain or discomfort</li>
                      <li>• Shortness of breath</li>
                      <li>• Pain in arms, neck, jaw</li>
                      <li>• Nausea or lightheadedness</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-3">Stroke Signs</h3>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Face drooping</li>
                      <li>• Arm weakness</li>
                      <li>• Speech difficulty</li>
                      <li>• Time to call emergency</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-3">Severe Bleeding</h3>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Apply direct pressure</li>
                      <li>• Elevate the wound</li>
                      <li>• Don't remove objects</li>
                      <li>• Call for help immediately</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-3">Choking</h3>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Encourage coughing</li>
                      <li>• Give back blows</li>
                      <li>• Perform abdominal thrusts</li>
                      <li>• Call emergency if severe</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nearby Hospitals */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <MapPin className="mr-2 h-6 w-6 text-green-600" />
                  Nearby Hospitals
                </CardTitle>
                <CardDescription>Emergency facilities near your location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {nearbyHospitals.map((hospital) => (
                  <Card key={hospital.id} className="border hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{hospital.name}</h3>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-medium">{hospital.rating}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-300">
                            {hospital.distance}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {hospital.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          ETA: {hospital.estimatedTime}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {hospital.emergencyServices.slice(0, 2).map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-transparent"
                                onClick={() => setSelectedHospital(hospital)}
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Hospital Details</DialogTitle>
                                <DialogDescription>Complete information about this hospital</DialogDescription>
                              </DialogHeader>
                              {selectedHospital && (
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="font-semibold text-lg">{selectedHospital.name}</h3>
                                    <div className="flex items-center mt-1">
                                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                      <span className="ml-1 text-sm font-medium">{selectedHospital.rating}</span>
                                      <span className="ml-2 text-sm text-gray-500">
                                        • {selectedHospital.distance} away
                                      </span>
                                    </div>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <p className="font-medium text-gray-600">Address:</p>
                                      <p>{selectedHospital.address}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-600">Phone:</p>
                                      <p className="text-blue-600">{selectedHospital.phone}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-600">Specialties:</p>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedHospital.specialties.map((specialty) => (
                                          <Badge key={specialty} variant="outline" className="text-xs">
                                            {specialty}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-600">Emergency Services:</p>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedHospital.emergencyServices.map((service) => (
                                          <Badge key={service} variant="secondary" className="text-xs">
                                            {service}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  <Navigation className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Numbers */}
        <Card className="mt-6 border-0 shadow-lg bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-blue-900 mb-4">Emergency Hotlines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Ambulance</p>
                    <p className="text-blue-700">1122</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Police</p>
                    <p className="text-blue-700">15</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Fire Brigade</p>
                    <p className="text-blue-700">16</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
