export const TICKET_STATUSES = ["To Do", "In Progress", "Review", "Done"] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const STATUS_MAPPING: Record<string, TicketStatus> = {
  "to do": "To Do",
  "in progress": "In Progress",
  review: "Review",
  done: "Done",
  todo: "To Do",
  "in-progress": "In Progress",
  inprogress: "In Progress",
  pending: "To Do",
  completed: "Done",
  finished: "Done",
};

export const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "border-l-red-500";
    case "medium":
      return "border-l-yellow-500";
    case "low":
      return "border-l-green-500";
    default:
      return "border-l-gray-300";
  }
};

export const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case "To Do":
      return "bg-gray-50";
    case "In Progress":
      return "bg-blue-50";
    case "Review":
      return "bg-yellow-50";
    case "Done":
      return "bg-green-50";
    default:
      return "bg-white";
  }
};
