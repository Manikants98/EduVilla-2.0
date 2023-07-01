import InfoIcon from "@mui/icons-material/Info";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import PeopleIcon from "@mui/icons-material/People";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

export const navItems = [
  {
    id: 1,
    item: "Home",
    icon: <HomeRoundedIcon />,
    to: "/home",
  },
  {
    id: 2,
    item: "Profile",
    icon: <AccountCircleIcon />,
    to: "/profile",
  },
  {
    id: 3,
    item: "Courses",
    icon: <AutoAwesomeMotionIcon />,
    to: "/courses",
  },
  {
    id: 4,
    item: "Users",
    icon: <PeopleIcon />,
    to: "/users",
  },
  {
    id: 5,
    item: "Contact Us",
    icon: <PermContactCalendarIcon />,
    to: "/contact",
  },
  {
    id: 6,
    item: "About Us",
    icon: <InfoIcon />,
    to: "/about",
  },
];

export const registerFormData = [
  {
    id: "name",
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "confirm_password",
    name: "confirm_password",
    label: "Confirm Password",
    type: "password",
  },
];

export const loginFormData = [
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
  },
];

export const courseData = [
  {
    id: "heading",
    name: "heading",
    placeholder: "Course Name",
    type: "text",
  },

  {
    id: "description",
    name: "description",
    placeholder: "Description",
    type: "text",
  },
];

export const profileData = [
  {
    id: "name",
    name: "name",
    placeholder: "Name",
  },
  {
    id: "email",
    name: "email",
    placeholder: "Email",
  },
  {
    id: "city",
    name: "city",
    placeholder: "City",
  },
  {
    id: "state",
    name: "state",
    placeholder: "State",
  },
  {
    id: "zipcode",
    name: "zipcode",
    placeholder: "Zipcode",
  },
  { id: "country", name: "country", placeholder: "Country" },
  {
    id: "phone",
    name: "phone",
    placeholder: "Contact Number",
  },
  {
    id: "dob",
    name: "dob",
    placeholder: "Date of Birth",
  },
];

export const categoryData = [
  {
    id: "6a4c7504-4b1d-11ed-b878-0242ac120002",
    heading: "Front-End",
  },
  {
    id: "6a4c7842-4b1d-11ed-b878-0242ac120002",
    heading: "Back-End",
  },
  {
    id: "6a4c7aa4-4b1d-11ed-b878-0242ac120002",
    heading: "Database",
  },
  {
    id: "6a4c7c8e-4b1d-11ed-b878-0242ac120002",
    heading: "Hosting",
  },
  {
    id: "6a4c7e64-4b1d-11ed-b878-0242ac120002",
    heading: "Others",
  },
];

export const contactData = [
  {
    id: "name",
    name: "name",
    placeholder: "Name",
    type: "text",
  },
  {
    id: "email",
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    id: "message",
    name: "message",
    placeholder: "Your Message",
    type: "text",
  },
];
export const chapters = [
  {
    id: "chapter_name",
    name: "chapter_name",
    placeholder: "Chapter Name",
    type: "text",
  },
  {
    id: "description",
    name: "description",
    placeholder: "Description",
    type: "text",
  },
  {
    id: "content",
    name: "content",
    placeholder: "Content",
    type: "text",
  },
];
