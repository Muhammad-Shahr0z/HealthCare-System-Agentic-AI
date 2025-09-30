"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock doctor data (in real app, this would be fetched based on ID)
const mockDoctor = {
  id: 1,
  name: "Dr. Sarah Ahmed",
  specialty: "Cardiology",
  hospital: "Aga Khan University Hospital",
  location: "Karachi",
  rating: 4.8,
  reviews: 124,
  experience: "15 years",
  image: "/female-doctor.png",
  consultationFee: "Rs. 3000",
  languages: ["English", "Urdu"],
  availableSlots: {
    "2024-01-15": ["09:00", "10:00", "11:00", "14:00", "15:00"],
    "2024-01-16": ["09:00", "10:30", "11:30", "14:30", "16:00"],
    "2024-01-17": ["10:00", "11:00", "15:00", "16:00"],
  },
}

export default function BookAppointmentPage() {
  const params = useParams()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    symptoms: "",
    previousVisit: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement booking logic
    console.log("Booking appointment:", {
      doctorId: params.id,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      ...formData,
    })
    alert("Appointment booked successfully! You will receive a confirmation email shortly.")
  }

  const getAvailableSlots = () => {
    if (!selectedDate) return []
    const dateString = selectedDate.toISOString().split("T")[0]
    return mockDoctor.availableSlots[dateString] || []
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/doctors" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Doctors
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-4">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={mockDoctor.image || "/placeholder.svg"} alt={mockDoctor.name} />
                    <AvatarFallback>
                      {mockDoctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{mockDoctor.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium text-base">
                      {mockDoctor.specialty}
                    </CardDescription>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{mockDoctor.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({mockDoctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {mockDoctor.hospital}, {mockDoctor.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {mockDoctor.experience} experience
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Consultation Fee:</span>
                  <span className="font-semibold text-blue-600 text-lg">{mockDoctor.consultationFee}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {mockDoctor.languages.map((language) => (
                      <Badge key={language} variant="outline" className="text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Book Appointment</CardTitle>
                <CardDescription>Fill in the details below to schedule your appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Appointment Type */}
                  <div className="space-y-2">
                    <Label htmlFor="appointmentType">Appointment Type</Label>
                    <Select value={appointmentType} onValueChange={setAppointmentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select appointment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">General Consultation</SelectItem>
                        <SelectItem value="followup">Follow-up Visit</SelectItem>
                        <SelectItem value="checkup">Routine Check-up</SelectItem>
                        <SelectItem value="emergency">Emergency Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <div className="border rounded-lg p-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                        className="rounded-md"
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="space-y-2">
                      <Label>Available Time Slots</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {getAvailableSlots().map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            className={`text-sm ${
                              selectedTime === time ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50"
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                      {getAvailableSlots().length === 0 && (
                        <p className="text-sm text-gray-500">
                          No available slots for this date. Please select another date.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Patient Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        placeholder="Enter patient name"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange("patientName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                    <Textarea
                      id="symptoms"
                      placeholder="Describe your symptoms or reason for the appointment"
                      value={formData.symptoms}
                      onChange={(e) => handleInputChange("symptoms", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousVisit">Previous Visit (Optional)</Label>
                    <Select
                      value={formData.previousVisit}
                      onValueChange={(value) => handleInputChange("previousVisit", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Have you visited this doctor before?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, I'm a returning patient</SelectItem>
                        <SelectItem value="no">No, this is my first visit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Summary */}
                  {selectedDate && selectedTime && appointmentType && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Appointment Summary</h3>
                      <div className="space-y-1 text-sm text-blue-800">
                        <p>
                          <strong>Doctor:</strong> {mockDoctor.name}
                        </p>
                        <p>
                          <strong>Date:</strong> {selectedDate.toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Time:</strong> {selectedTime}
                        </p>
                        <p>
                          <strong>Type:</strong> {appointmentType}
                        </p>
                        <p>
                          <strong>Fee:</strong> {mockDoctor.consultationFee}
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    disabled={!selectedDate || !selectedTime || !appointmentType}
                  >
                    Book Appointment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
