"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, Search, Filter } from "lucide-react"
import Link from "next/link"

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiology",
    hospital: "Aga Khan University Hospital",
    location: "Karachi",
    rating: 4.8,
    reviews: 124,
    experience: "15 years",
    availability: "Available Today",
    image: "/female-doctor.png",
    consultationFee: "Rs. 3000",
    languages: ["English", "Urdu"],
  },
  {
    id: 2,
    name: "Dr. Muhammad Hassan",
    specialty: "Neurology",
    hospital: "Shaukat Khanum Memorial Hospital",
    location: "Lahore",
    rating: 4.9,
    reviews: 89,
    experience: "12 years",
    availability: "Available Tomorrow",
    image: "/male-doctor.png",
    consultationFee: "Rs. 2500",
    languages: ["English", "Urdu", "Punjabi"],
  },
  {
    id: 3,
    name: "Dr. Fatima Khan",
    specialty: "Pediatrics",
    hospital: "Children's Hospital Lahore",
    location: "Lahore",
    rating: 4.7,
    reviews: 156,
    experience: "10 years",
    availability: "Available Today",
    image: "/female-pediatrician.png",
    consultationFee: "Rs. 2000",
    languages: ["English", "Urdu"],
  },
  {
    id: 4,
    name: "Dr. Ali Raza",
    specialty: "Orthopedics",
    hospital: "Liaquat National Hospital",
    location: "Karachi",
    rating: 4.6,
    reviews: 98,
    experience: "18 years",
    availability: "Available Today",
    image: "/male-orthopedic-doctor.png",
    consultationFee: "Rs. 3500",
    languages: ["English", "Urdu", "Sindhi"],
  },
  {
    id: 5,
    name: "Dr. Ayesha Malik",
    specialty: "Dermatology",
    hospital: "Shifa International Hospital",
    location: "Islamabad",
    rating: 4.8,
    reviews: 203,
    experience: "8 years",
    availability: "Available Tomorrow",
    image: "/female-dermatologist.png",
    consultationFee: "Rs. 2800",
    languages: ["English", "Urdu"],
  },
  {
    id: 6,
    name: "Dr. Usman Sheikh",
    specialty: "Gastroenterology",
    hospital: "Ziauddin Hospital",
    location: "Karachi",
    rating: 4.5,
    reviews: 67,
    experience: "14 years",
    availability: "Available Today",
    image: "/male-gastroenterologist.jpg",
    consultationFee: "Rs. 3200",
    languages: ["English", "Urdu"],
  },
]

const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Gastroenterology",
]
const locations = ["All Locations", "Karachi", "Lahore", "Islamabad"]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors)

  const handleSearch = () => {
    let filtered = mockDoctors

    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSpecialty !== "All Specialties") {
      filtered = filtered.filter((doctor) => doctor.specialty === selectedSpecialty)
    }

    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter((doctor) => doctor.location === selectedLocation)
    }

    setFilteredDoctors(filtered)
  }

  // Auto-search when filters change
  useState(() => {
    handleSearch()
  }, [searchTerm, selectedSpecialty, selectedLocation])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Doctor</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified healthcare professionals across Pakistan. Book appointments with ease.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search doctors, specialties, or hospitals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""}
            {selectedSpecialty !== "All Specialties" && ` in ${selectedSpecialty}`}
            {selectedLocation !== "All Locations" && ` in ${selectedLocation}`}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{doctor.specialty}</CardDescription>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {doctor.hospital}, {doctor.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {doctor.experience} experience
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={doctor.availability === "Available Today" ? "default" : "secondary"}
                    className="bg-green-100 text-green-800"
                  >
                    {doctor.availability}
                  </Badge>
                  <span className="font-semibold text-blue-600">{doctor.consultationFee}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map((language) => (
                    <Badge key={language} variant="outline" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href={`/doctors/${doctor.id}/book`}>Book Appointment</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedSpecialty("All Specialties")
                setSelectedLocation("All Locations")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
