export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  name: string;
  email: string;
  location: string;
  joinedAt: string;
  bookings: number;
  status: UserStatus;
};

export const USERS: User[] = [
  {
    id: "u-1",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    location: "Bangalore, India",
    joinedAt: "2024-04-10T00:00:00",
    bookings: 3,
    status: "active",
  },
  {
    id: "u-2",
    name: "Neha Verma",
    email: "neha@gmail.com",
    location: "Mumbai, India",
    joinedAt: "2024-04-09T00:00:00",
    bookings: 5,
    status: "active",
  },
  {
    id: "u-3",
    name: "Vikram Singh",
    email: "vikram@gmail.com",
    location: "Delhi, India",
    joinedAt: "2024-04-08T00:00:00",
    bookings: 2,
    status: "active",
  },
  {
    id: "u-4",
    name: "Ananya Patel",
    email: "ananya@gmail.com",
    location: "Pune, India",
    joinedAt: "2024-04-02T00:00:00",
    bookings: 4,
    status: "active",
  },
  {
    id: "u-5",
    name: "Rohit Kumar",
    email: "rohit@gmail.com",
    location: "Hyderabad, India",
    joinedAt: "2024-03-28T00:00:00",
    bookings: 1,
    status: "inactive",
  },
  {
    id: "u-6",
    name: "Meera Nair",
    email: "meera@gmail.com",
    location: "Chennai, India",
    joinedAt: "2024-03-25T00:00:00",
    bookings: 3,
    status: "active",
  },
  {
    id: "u-7",
    name: "Aditya Rao",
    email: "aditya@gmail.com",
    location: "Bangalore, India",
    joinedAt: "2024-03-20T00:00:00",
    bookings: 6,
    status: "active",
  },
  {
    id: "u-8",
    name: "Sana Khan",
    email: "sana@gmail.com",
    location: "Lucknow, India",
    joinedAt: "2024-03-18T00:00:00",
    bookings: 2,
    status: "active",
  },
  {
    id: "u-9",
    name: "Kabir Joshi",
    email: "kabir@gmail.com",
    location: "Jaipur, India",
    joinedAt: "2024-03-12T00:00:00",
    bookings: 0,
    status: "inactive",
  },
  {
    id: "u-10",
    name: "Isha Menon",
    email: "isha@gmail.com",
    location: "Kochi, India",
    joinedAt: "2024-03-05T00:00:00",
    bookings: 4,
    status: "active",
  },
  {
    id: "u-11",
    name: "Dev Malhotra",
    email: "dev@gmail.com",
    location: "Gurgaon, India",
    joinedAt: "2024-02-27T00:00:00",
    bookings: 1,
    status: "active",
  },
  {
    id: "u-12",
    name: "Tanvi Shah",
    email: "tanvi@gmail.com",
    location: "Ahmedabad, India",
    joinedAt: "2024-02-20T00:00:00",
    bookings: 3,
    status: "active",
  },
  {
    id: "u-13",
    name: "Nikhil Das",
    email: "nikhil@gmail.com",
    location: "Kolkata, India",
    joinedAt: "2024-02-11T00:00:00",
    bookings: 2,
    status: "inactive",
  },
  {
    id: "u-14",
    name: "Riya Kapoor",
    email: "riya@gmail.com",
    location: "Noida, India",
    joinedAt: "2024-02-03T00:00:00",
    bookings: 5,
    status: "active",
  },
];
