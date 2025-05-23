// Dummy data for inbox conversations with different images
export const conversationsData = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Thanks for the update!",
    lastTime: "2:15 PM",
    unread: 2,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Hi, I need help with my order.",
        time: "2:00 PM",
      },
      {
        id: 2,
        sender: "agent",
        text: "Sure, I can help you with that. What seems to be the issue?",
        time: "2:02 PM",
      },
      {
        id: 3,
        sender: "user",
        text: "I received the wrong item.",
        time: "2:05 PM",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Got it, thanks!",
    lastTime: "Yesterday",
    unread: 0,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Can you update me on my shipment?",
        time: "Yesterday 3:00 PM",
      },
      {
        id: 2,
        sender: "agent",
        text: "Your shipment is on the way and should arrive tomorrow.",
        time: "Yesterday 3:05 PM",
      },
      {
        id: 3,
        sender: "user",
        text: "Got it, thanks!",
        time: "Yesterday 3:10 PM",
      },
    ],
  },
  {
    id: 3,
    name: "Michael Lee",
    lastMessage: "Please advise on next steps.",
    lastTime: "3 days ago",
    unread: 1,
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "I want to cancel my subscription.",
        time: "3 days ago",
      },
      {
        id: 2,
        sender: "agent",
        text: "I can help you with that. May I know the reason?",
        time: "3 days ago",
      },
      {
        id: 3,
        sender: "user",
        text: "Please advise on next steps.",
        time: "3 days ago",
      },
    ],
  },
  {
    id: 4,
    name: "Emily Clark",
    lastMessage: "Thanks for your help!",
    lastTime: "5 days ago",
    unread: 0,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "How do I reset my password?",
        time: "5 days ago",
      },
      {
        id: 2,
        sender: "agent",
        text: "You can reset your password by clicking on 'Forgot Password' on the login page.",
        time: "5 days ago",
      },
      {
        id: 3,
        sender: "user",
        text: "Thanks for your help!",
        time: "5 days ago",
      },
    ],
  },
  {
    id: 5,
    name: "David Kim",
    lastMessage: "Looking forward to the update.",
    lastTime: "1 week ago",
    unread: 0,
    avatar: "https://randomuser.me/api/portraits/men/72.jpg",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Is there an update on the new feature?",
        time: "1 week ago",
      },
      {
        id: 2,
        sender: "agent",
        text: "Yes, it will be released next month.",
        time: "1 week ago",
      },
      {
        id: 3,
        sender: "user",
        text: "Looking forward to the update.",
        time: "1 week ago",
      },
    ],
  },
];