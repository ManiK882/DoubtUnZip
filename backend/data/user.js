const users = [
  // 5 Students
  {
    _id:"68568f6f203d5a79bf0311a7",
    name: "Riya Sharma",
    email: "riya@student.com",
    password: "student123",
    role: "student",
    bio: "A curious learner.",
    postedDoubts:["68569030c9d83d9356a96891"]
  },
  {
    _id:"68568f6f203d5a79bf0311a8",
    name: "Aman Gupta",
    email: "aman@student.com",
    password: "student123",
    role: "student",
    bio: "Computer science enthusiast.",
    postedDoubts:["68569030c9d83d9356a9688f"]
  },
  {
    _id:"68568f6f203d5a79bf0311a9",
    name: "Sneha Patil",
    email: "sneha@student.com",
    password: "student123",
    role: "student",
    bio: "Enjoys solving coding problems.",
    postedDoubts:["68569030c9d83d9356a9688d"]
  },
  {
    _id:"68568f6f203d5a79bf0311aa",
    name: "Rohan Mehta",
    email: "rohan@student.com",
    password: "student123",
    role: "student",
    bio: "Aspiring full-stack developer.",
    postedDoubts:["68569030c9d83d9356a9688b"]
  },
  {
    _id:"68568f6f203d5a79bf0311ab",
    name: "Priya Nair",
    email: "priya@student.com",
    password: "student123",
    role: "student",
    bio: "Frontend focused student.",
    postedDoubts:["68569030c9d83d9356a96889"]
  },

  // 5 Educators
  {
    _id:"68568f6f203d5a79bf0311ac",
    name: "Dr. Kavita Rao",
    email: "kavita@educator.com",
    password: "educator123",
    role: "educator",
    bio: "Professor of Computer Science.",
    solvedDoubts:["68569030c9d83d9356a96891"],
    postedDoubts:["68569030c9d83d9356a96887"]
  },
  {
    _id:"68568f6f203d5a79bf0311ad",
    name: "Sandeep Kumar",
    email: "sandeep@educator.com",
    password: "educator123",
    role: "educator",
    bio: "Backend developer and mentor.",
    solvedDoubts:["68569030c9d83d9356a9688f"],
    postedDoubts:["68569030c9d83d9356a96885"]
  },
  {
    _id:"68568f6f203d5a79bf0311ae",
    name: "Nandini Verma",
    email: "nandini@educator.com",
    password: "educator123",
    role: "educator",
    bio: "Specialist in JavaScript and React.",
    solvedDoubts:["68569030c9d83d9356a9688f"],
    postedDoubts:["68569030c9d83d9356a96883"],
  },
  {
    _id:"68568f6f203d5a79bf0311af",
    name: "Anil Joshi",
    email: "anil@educator.com",
    password: "educator123",
    role: "educator",
    bio: "Helps students crack DSA interviews.",
    solvedDoubts:["68569030c9d83d9356a9688d","68569030c9d83d9356a96889"],
    postedDoubts:"68569030c9d83d9356a96881"
  },
  {
    _id:"68568f6f203d5a79bf0311b0",
    name: "Meera Das",
    email: "meera@educator.com",
    password: "educator123",
    role: "educator",
    bio: "Passionate about teaching algorithms.",
    solvedDoubts:["68569030c9d83d9356a9688d","68569030c9d83d9356a9688b"],
    postedDoubts:["68569030c9d83d9356a9687f"]
  }
];
module.exports={users};