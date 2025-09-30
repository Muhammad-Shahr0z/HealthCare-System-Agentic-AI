"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  CalendarIcon,
  Clock,
  MapPin,
  Phone,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell,
  Filter,
  Plus,
} from "lucide-react"
import Link from "next/link"

interface Appointment {
  id: string
  doctorName: string
  doctorImage: string
  specialty: string
  hospital: string
  date: string
  time: string
  type: "consultation" | "followup" | "checkup" | "emergency"
  status: "upcoming" | "completed" | "cancelled" | "pending"
  consultationType: "in-person" | "video" | "phone"
  patientNotes?: string
  fee: string
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Ahmed",
    doctorImage: "/female-doctor.png",
    specialty: "Cardiology",
    hospital: "Aga Khan University Hospital",
    date: "2024-01-20",
    time: "10:00 AM",
    type: "consultation",
    status: "upcoming",
    consultationType: "in-person",
    patientNotes: "Regular checkup for blood pressure monitoring",
    fee: "Rs. 3000",
  },
  {
    id: "2",
    doctorName: "Dr. Muhammad Hassan",
    doctorImage: "/male-doctor.png",
    specialty: "Neurology",
    hospital: "Shaukat Khanum Memorial Hospital",
    date: "2024-01-18",
    time: "2:30 PM",
    type: "followup",
    status: "completed",
    consultationType: "video",
    patientNotes: "Follow-up for migraine treatment",
    fee: "Rs. 2500",
  },
  {
    id: "3",
    doctorName: "Dr. Fatima Khan",
    doctorImage: "/female-pediatrician.png",
    specialty: "Pediatrics",
    hospital: "Children's Hospital Lahore",
    date: "2024-01-25",
    time: "11:30 AM",
    type: "checkup",
    status: "upcoming",
    consultationType: "in-person",
    patientNotes: "Routine vaccination for child",
    fee: "Rs. 2000",
  },
  {
    id: "4",
    doctorName: "Dr. Ali Raza",
    doctorImage: "/male-orthopedic-doctor.png",
    specialty: "Orthopedics",
    hospital: "Liaquat National Hospital",
    date: "2024-01-15",
    time: "9:00 AM",
    type: "consultation",
    status: "cancelled",
    consultationType: "in-person",
    patientNotes: "Knee pain consultation",
    fee: "Rs. 3500",
  },
  {
    id: "5",
    doctorName: "Dr. Ayesha Malik",
    doctorImage: "/female-dermatologist.png",
    specialty: "Dermatology",
    hospital: "Shifa International Hospital",
    date: "2024-01-22",
    time: "3:00 PM",
    type: "consultation",
    status: "pending",
    consultationType: "video",
    patientNotes: "Skin condition evaluation",
    fee: "Rs. 2800",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "upcoming":
      return <Clock className="h-4 w-4" />
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    case "cancelled":
      return <XCircle className="h-4 w-4" />
    case "pending":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getConsultationIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4" />
    case "phone":
      return <Phone className="h-4 w-4" />
    default:
      return <MapPin className="h-4 w-4" />
  }
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const filteredAppointments = mockAppointments.filter((appointment) => {
    if (statusFilter === "all") return true
    return appointment.status === statusFilter
  })

  const upcomingAppointments = mockAppointments.filter((apt) => apt.status === "upcoming")
  const todayAppointments = mockAppointments.filter(
    (apt) => apt.date === new Date().toISOString().split("T")[0] && apt.status === "upcoming",
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Appointments</h1>
            <p className="text-gray-600">Manage your healthcare appointments and consultations</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 mt-4 sm:mt-0">
            <Link href="/doctors">
              <Plus className="mr-2 h-4 w-4" />
              Book New Appointment
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAppointments.length}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-blue-600">{upcomingAppointments.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-green-600">{todayAppointments.length}</p>
                </div>
                <Bell className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {mockAppointments.filter((apt) => apt.status === "completed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
                <CardDescription>Select a date to view appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-hidden">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border w-full [&_.rdp-table]:w-full [&_.rdp-cell]:text-center [&_.rdp-day]:w-8 [&_.rdp-day]:h-8 [&_.rdp-day]:text-sm sm:[&_.rdp-day]:w-10 sm:[&_.rdp-day]:h-10 sm:[&_.rdp-day]:text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-blue-900">Upcoming Appointment</p>
                  <p className="text-xs text-blue-700">Dr. Sarah Ahmed tomorrow at 10:00 AM</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm font-medium text-green-900">Appointment Confirmed</p>
                  <p className="text-xs text-green-700">Dr. Fatima Khan on Jan 25</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-sm font-medium text-yellow-900">Pending Approval</p>
                  <p className="text-xs text-yellow-700">Dr. Ayesha Malik on Jan 22</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl">Appointments</CardTitle>
                    <CardDescription>View and manage your appointments</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list" className="space-y-4 mt-6">
                    {filteredAppointments.map((appointment) => (
                      <Card key={appointment.id} className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                            <div className="flex items-start space-x-4 flex-1 w-full">
                              <Avatar className="h-12 w-12 flex-shrink-0">
                                <AvatarImage
                                  src={appointment.doctorImage || "/placeholder.svg"}
                                  alt={appointment.doctorName}
                                />
                                <AvatarFallback>
                                  {appointment.doctorName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                  <h3 className="font-semibold text-lg truncate">{appointment.doctorName}</h3>
                                  <Badge className={`${getStatusColor(appointment.status)} flex-shrink-0`}>
                                    {getStatusIcon(appointment.status)}
                                    <span className="ml-1 capitalize">{appointment.status}</span>
                                  </Badge>
                                </div>
                                <p className="text-blue-600 font-medium mb-1">{appointment.specialty}</p>
                                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mb-2 gap-1 sm:gap-4">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span className="truncate">{appointment.hospital}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600 mb-2">
                                  <div className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    {new Date(appointment.date).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {appointment.time}
                                  </div>
                                  <div className="flex items-center">
                                    {getConsultationIcon(appointment.consultationType)}
                                    <span className="ml-1 capitalize">{appointment.consultationType}</span>
                                  </div>
                                </div>
                                {appointment.patientNotes && (
                                  <p className="text-sm text-gray-600 mb-2">
                                    <strong>Notes:</strong> {appointment.patientNotes}
                                  </p>
                                )}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <span className="font-semibold text-blue-600">{appointment.fee}</span>
                                  <div className="flex flex-wrap gap-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => setSelectedAppointment(appointment)}
                                          className="flex-1 sm:flex-none"
                                        >
                                          View Details
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-md mx-4">
                                        <DialogHeader>
                                          <DialogTitle>Appointment Details</DialogTitle>
                                          <DialogDescription>
                                            Complete information about your appointment
                                          </DialogDescription>
                                        </DialogHeader>
                                        {selectedAppointment && (
                                          <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                              <Avatar className="h-12 w-12">
                                                <AvatarImage
                                                  src={selectedAppointment.doctorImage || "/placeholder.svg"}
                                                  alt={selectedAppointment.doctorName}
                                                />
                                                <AvatarFallback>
                                                  {selectedAppointment.doctorName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                                </AvatarFallback>
                                              </Avatar>
                                              <div>
                                                <h3 className="font-semibold">{selectedAppointment.doctorName}</h3>
                                                <p className="text-sm text-blue-600">{selectedAppointment.specialty}</p>
                                              </div>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                              <div className="flex justify-between">
                                                <span className="text-gray-600">Date:</span>
                                                <span>{new Date(selectedAppointment.date).toLocaleDateString()}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-gray-600">Time:</span>
                                                <span>{selectedAppointment.time}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-gray-600">Type:</span>
                                                <span className="capitalize">
                                                  {selectedAppointment.consultationType}
                                                </span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-gray-600">Fee:</span>
                                                <span className="font-semibold">{selectedAppointment.fee}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-gray-600">Status:</span>
                                                <Badge className={getStatusColor(selectedAppointment.status)}>
                                                  {selectedAppointment.status}
                                                </Badge>
                                              </div>
                                            </div>
                                            {selectedAppointment.patientNotes && (
                                              <div>
                                                <p className="text-sm font-medium text-gray-600 mb-1">Notes:</p>
                                                <p className="text-sm text-gray-800">
                                                  {selectedAppointment.patientNotes}
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </DialogContent>
                                    </Dialog>
                                    {appointment.status === "upcoming" && (
                                      <>
                                        <Button
                                          size="sm"
                                          className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                                        >
                                          Join Call
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-red-600 hover:bg-red-50 bg-transparent flex-1 sm:flex-none"
                                        >
                                          Cancel
                                        </Button>
                                      </>
                                    )}
                                    {appointment.status === "pending" && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-blue-600 hover:bg-blue-50 bg-transparent flex-1 sm:flex-none"
                                      >
                                        Reschedule
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {filteredAppointments.length === 0 && (
                      <div className="text-center py-12">
                        <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
                        <p className="text-gray-600 mb-4">
                          {statusFilter === "all"
                            ? "You don't have any appointments yet."
                            : `No ${statusFilter} appointments found.`}
                        </p>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                          <Link href="/doctors">Book Your First Appointment</Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="calendar" className="mt-6">
                    <div className="text-center py-12">
                      <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar View</h3>
                      <p className="text-gray-600">Calendar integration coming soon!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
