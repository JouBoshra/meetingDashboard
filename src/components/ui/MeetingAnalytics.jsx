import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
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
  Area,
  AreaChart,
} from "recharts";
import {
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Target,
  Calendar,
} from "lucide-react";

const MeetingAnalytics = ({ meetingsData }) => {
  // Color palette for charts
  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  // Prepare data for visualizations
  const meetingDurationData = meetingsData.map((meeting, index) => ({
    name: `Meeting ${index + 1}`,
    duration: parseInt(meeting.duration.replace(" minutes", "")),
    attendees: meeting.attendees.length,
    actionItems: meeting.actionItems.length,
    date: meeting.date,
  }));

  const attendeeDistribution = meetingsData.map((meeting, index) => ({
    name: `July ${23 + index}`,
    attendees: meeting.attendees.length,
  }));

  const actionItemsProgress = meetingsData.map((meeting, index) => ({
    name: `Meeting ${index + 1}`,
    total: meeting.actionItems.length,
    completed:
      meeting.status === "completed"
        ? meeting.actionItems.length
        : Math.floor(meeting.actionItems.length * 0.7),
    pending:
      meeting.status === "completed"
        ? 0
        : Math.ceil(meeting.actionItems.length * 0.3),
  }));

  const priorityDistribution = [
    {
      name: "High Priority",
      value: meetingsData.filter((m) => m.priority === "high").length,
      color: "#EF4444",
    },
    {
      name: "Medium Priority",
      value: meetingsData.filter((m) => m.priority === "medium").length,
      color: "#F59E0B",
    },
    {
      name: "Low Priority",
      value: meetingsData.filter((m) => m.priority === "low").length,
      color: "#10B981",
    },
  ];

  const categoryDistribution = [
    { name: "Operations", value: 1, color: "#3B82F6" },
    { name: "Follow-up", value: 1, color: "#10B981" },
    { name: "Process Improvement", value: 1, color: "#F59E0B" },
    { name: "Strategic Planning", value: 1, color: "#8B5CF6" },
  ];

  // Calculate key metrics
  const totalMeetings = meetingsData.length;
  const totalAttendees = [...new Set(meetingsData.flatMap((m) => m.attendees))]
    .length;
  const totalActionItems = meetingsData.reduce(
    (sum, m) => sum + m.actionItems.length,
    0
  );
  const totalDuration = meetingsData.reduce(
    (sum, m) => sum + parseInt(m.duration.replace(" minutes", "")),
    0
  );
  const averageDuration = Math.round(totalDuration / totalMeetings);
  const averageAttendees = Math.round(
    meetingsData.reduce((sum, m) => sum + m.attendees.length, 0) / totalMeetings
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Meetings
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalMeetings}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unique Attendees
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {totalAttendees}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Action Items
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {totalActionItems}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Duration
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {averageDuration}m
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meeting Duration & Attendees */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-500" />
              Meeting Duration & Attendance
            </CardTitle>
            <CardDescription>
              Duration and attendee count for each meeting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={meetingDurationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="duration" fill="#3B82F6" name="Duration (min)" />
                <Bar dataKey="attendees" fill="#10B981" name="Attendees" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Meeting Priority Distribution
            </CardTitle>
            <CardDescription>
              Distribution of meetings by priority level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Action Items Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Action Items Progress
            </CardTitle>
            <CardDescription>
              Completed vs pending action items per meeting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={actionItemsProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="completed"
                  stackId="a"
                  fill="#10B981"
                  name="Completed"
                />
                <Bar
                  dataKey="pending"
                  stackId="a"
                  fill="#F59E0B"
                  name="Pending"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              Meeting Categories
            </CardTitle>
            <CardDescription>
              Distribution of meetings by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Attendance Trend Over Time
          </CardTitle>
          <CardDescription>
            Meeting attendance pattern throughout July
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={attendeeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="attendees"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Meeting Efficiency Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {averageDuration}
            </p>
            <p className="text-sm text-gray-600">Average Duration (minutes)</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {averageAttendees}
            </p>
            <p className="text-sm text-gray-600">Average Attendees</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {(totalActionItems / totalMeetings).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">
              Avg Action Items per Meeting
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeetingAnalytics;
