import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Users,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  ExternalLink,
  Download,
  Share2,
} from "lucide-react";
import MeetingAnalytics from "./MeetingAnalytics.jsx";

const MeetingDetailModal = ({ meeting, isOpen, onClose }) => {
  if (!meeting) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Calendar className="h-6 w-6 text-blue-600" />
            {meeting.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-base">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {meeting.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {meeting.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {meeting.attendees.length} attendees
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Meeting Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {meeting.attendees.length}
                </p>
                <p className="text-sm text-gray-600">Attendees</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {meeting.keyPoints.length}
                </p>
                <p className="text-sm text-gray-600">Key Points</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-orange-500" />
                </div>
                <p className="text-2xl font-bold text-orange-600">
                  {meeting.actionItems.length}
                </p>
                <p className="text-sm text-gray-600">Action Items</p>
              </CardContent>
            </Card>
          </div>

          {/* Meeting Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Key Discussion Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Key Discussion Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meeting.keyPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Action Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meeting.actionItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {meeting.status === "completed" ? "Done" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendees List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Meeting Attendees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {meeting.attendees.map((attendee, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {attendee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </div>
                    <span className="text-sm text-gray-700 truncate">
                      {attendee}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meeting Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-500" />
                Meeting Analytics
              </CardTitle>
              <CardDescription>
                Statistical analysis for this meeting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MeetingAnalytics meetingsData={[meeting]} />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  meeting.status === "completed" ? "default" : "secondary"
                }
              >
                {meeting.status}
              </Badge>
              <Badge
                variant={
                  meeting.priority === "high" ? "destructive" : "outline"
                }
              >
                {meeting.priority} priority
              </Badge>
              <Badge variant="outline">{meeting.category}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Open Full View
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDetailModal;
