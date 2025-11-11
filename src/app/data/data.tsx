export const courses = [
    {
        courseID: "CMSC1351STAY2526",
        courseTitle: "CMSC 135",
        courseDescription: "Data Communication and Networking",
        coursefacultyID: "S5vN1xT4kJ",
        sections: [ 
          {
            sectionName: "L",
            noOfStudents: 15,
            courseCode: "EnrollToCMSC135L"
          },
          {
            sectionName: "M",
            noOfStudents: 18,
            courseCode: "EnrollToCMSC135M"
          }
        ],
        academicYear: "AY 2025 - 2026",
        semester: "1st Semester",
        examIDs: [
          "EN2B8",
          "PH4C5",
          "BI7D1",
          "CH6E3",
          "HI9F4",
          "EC2G7"
        ]
    },
    {
        courseID: "SCI101STAY2526",
        courseTitle: "SCIENCE 10",
        courseDescription: "Science 10 Description lol",
        coursefacultyID: "K9bL3pH7qS",
        sections: [
          {
            sectionName: "A",
            noOfStudents: 30,
            courseCode: "EnrollToSCI10A"
          },
          {
            sectionName: "B",
            noOfStudents: 25,
            courseCode: "EnrollToSCI10B"
          },
          {
            sectionName: "C",
            noOfStudents: 28,
            courseCode: "EnrollToSCI10C"
          }
        ],
        academicYear: "AY 2025 - 2026",
        semester: "1st Semester",
        examIDs: []
    },
    {
        courseID: "ETHICS11STAY2526",
        courseTitle: "ETHICS 1",
        coursefacultyID: "V3dJ9uP6sW",
        courseDescription: "Ethics and Moral Reasoning in Everyday Life",
        sections: [
          {
            sectionName: "D",
            noOfStudents: 24,
            courseCode: "EnrollToETHICS1D"
          },
          {
            sectionName: "F",
            noOfStudents: 30,
            courseCode: "EnrollToETHICS1F"
          },
          {
            sectionName: "G",
            noOfStudents: 32,
            courseCode: "EnrollToETHICS1G"
          }
        ],
        academicYear: "AY 2025 - 2026",
        semester: "1st Semester",
        examIDs: []
    }
];

export type Course = {
  courseID: string,
  courseTitle: string,
  courseDescription: string,
  coursefacultyID: string,
  sections: Section[],
  academicYear: string,
  semester: string,
  examIDs: string[]
}

export type Section = {
  sectionName: string,
  noOfStudents: number,
  courseCode: string
}

export type ReferenceExam = {
  examID: string,
  courseID: string,
  sections: string[],
  examTitle: string,
  items: number
}

export const students = [
  // Students
  {
    userID: "1",
    firstName: "Test",
    middleName: "Student",
    lastName: "User",
    studentNo: "1",
    password: "testPass",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "test@gmail.com",
    enrolledCourses: [
      "CMSC1351STAY2526"
    ]
  },
  {
    userID: "a9F4kP2qWz",
    firstName: "Juan Angelo",
    middleName: "Marello",
    lastName: "Dela Cruz",
    studentNo: "2021-14885",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "jmdelacruz@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "L"
      }
    ]
  },
  {
    userID: "X7bR3mL0sJ",
    firstName: "Maria Therese",
    middleName: "Santos",
    lastName: "Lopez",
    studentNo: "2021-14886",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "mtsantos@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "L"
      }
    ]
  },
  {
    userID: "pQ8wT6vH1k",
    firstName: "Mark Anthony",
    middleName: "Ramos",
    lastName: "Reyes",
    studentNo: "2021-14887",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "maramos@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "L"
      }
    ]
  },
  {
    userID: "Z5nY2cA9eL",
    firstName: "Anna Clarisse",
    middleName: "Villanueva",
    lastName: "Torres",
    studentNo: "2021-14888",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "acvillanueva@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "L"
      }
    ]
  },
  {
    userID: "rK1xM8bF3q",
    firstName: "John Paul",
    middleName: "De Guzman",
    lastName: "Castillo",
    studentNo: "2021-14889",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "jpguzman@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "L"
      }
    ]
  },
  {
    userID: "V0dJ7uP4sW",
    firstName: "Kristine Mae",
    middleName: "Garcia",
    lastName: "Flores",
    studentNo: "2021-14890",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "kmgarcia@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "M"
      }
    ]
  },
  {
    userID: "hL6tR9kQ2z",
    firstName: "Ryan Miguel",
    middleName: "Torralba",
    lastName: "Delos Santos",
    studentNo: "2021-14891",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "rmtorralba@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "M"
      }
    ]
  },
  {
    userID: "S3yN5vC0pX",
    firstName: "Angelica Joy",
    middleName: "Magbanua",
    lastName: "Santiago",
    studentNo: "2021-14892",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "ajmagbanua@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "M"
      }
    ]
  },
  {
    userID: "mF8aH1rD7w",
    firstName: "Christian Luke",
    middleName: "Bautista",
    lastName: "Reyes",
    studentNo: "2021-14893",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "clbautista@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "M"
      }
    ]
  },
  {
    userID: "G2bK4zT6qJ",
    firstName: "Gabrielle Faith",
    middleName: "Serrano",
    lastName: "Cruz",
    studentNo: "2021-14894",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "gfserrano@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "M"
      }
    ]
  },
  {
    userID: "N9vD3pL8xK",
    firstName: "Joshua Ryan",
    middleName: "Villanueva",
    lastName: "Lopez",
    studentNo: "2021-14895",
    password: "1234567890",
    program: "BS Computer Science",
    campus: "Tacloban College",
    upMail: "jrvillanueva@up.edu.ph",
    enrolledCourses: [
      {
        courseID: "CMSC1351STAY2526",
        sectionName: "M"
      }
    ]
  }
];

export const faculty = [
  // facultyessors
  {
    userID: "2",
    firstName: "Test",
    middleName: "facultyessor",
    lastName: "User",
    password: "testPass",
    facultyNo: "2",
    college: "Division of Humanities",
    campus: "Tacloban College",
    upMail: "test@up.edu.ph",
  },
  {
    userID: "P1aF9kQ2wZ",
    firstName: "Maria Lorna",
    middleName: "Santos",
    lastName: "Reyes",
    password: "1234567890",
    facultyNo: "2023-27949",
    college: "Division of Humanities",
    campus: "Tacloban College",
    upMail: "mlsantos@up.edu.ph"
  },
  {
    userID: "T4gR6mJ8xV",
    firstName: "Juan Carlos",
    middleName: "Torralba",
    lastName: "Villanueva",
    password: "1234567890",
    facultyNo: "2023-27950",
    college: "Division of Social Sciences",
    campus: "Tacloban College",
    upMail: "jctorralba@up.edu.ph"
  },
  {
    userID: "K9bL3pH7qS",
    firstName: "Angela Marie",
    middleName: "Garcia",
    lastName: "Lopez",
    password: "1234567890",
    facultyNo: "2023-27951",
    college: "Department of Natural Sciences and Mathematics",
    campus: "Tacloban College",
    upMail: "amgarcia@up.edu.ph"
  },
  {
    userID: "H2mD8rF5vP",
    firstName: "Christian Luke",
    middleName: "Bautista",
    lastName: "Cruz",
    password: "1234567890",
    facultyNo: "2023-27952",
    college: "Division of Management",
    campus: "Tacloban College",
    upMail: "clbautista@up.edu.ph"
  },
  {
    userID: "S5vN1xT4kJ",
    firstName: "Reynold",
    middleName: "Caranzo",
    lastName: "Almaden",
    password: "1234567890",
    facultyNo: "2023-27953",
    college: "Department of Natural Sciences and Mathematics",
    campus: "Tacloban College",
    upMail: "rcalmaden@up.edu.ph"
  },
  {
    userID: "M8qP7hL2rX",
    firstName: "Kristine Mae",
    middleName: "Magbanua",
    lastName: "Flores",
    password: "1234567890",
    facultyNo: "2023-27954",
    college: "Division of Humanities",
    campus: "Tacloban College",
    upMail: "kmmagbanua@up.edu.ph"
  },
  {
    userID: "V3dJ9uP6sW",
    firstName: "Joshua Ryan",
    middleName: "Serrano",
    lastName: "Cruz",
    password: "1234567890",
    facultyNo: "2023-27955",
    college: "Division of Social Sciences",
    campus: "Tacloban College",
    upMail: "jryanserrano@up.edu.ph"
  },
  {
    userID: "L6hT4kQ9vZ",
    firstName: "Gabrielle Faith",
    middleName: "Torres",
    lastName: "Santiago",
    password: "1234567890",
    facultyNo: "2023-27956",
    college: "Division of Management",
    campus: "Tacloban College",
    upMail: "gftorres@up.edu.ph"
  },
  {
    userID: "N2vD3pL8xK",
    firstName: "Mark Anthony",
    middleName: "Ramos",
    lastName: "Reyes",
    password: "1234567890",
    facultyNo: "2023-27957",
    college: "Department of Natural Sciences and Mathematics",
    campus: "Tacloban College",
    upMail: "maramos@up.edu.ph"
  },
  {
    userID: "F7cK1wR5mY",
    firstName: "Angelica Joy",
    middleName: "Villanueva",
    lastName: "Torres",
    password: "1234567890",
    facultyNo: "2023-27958",
    college: "Division of Humanities",
    campus: "Tacloban College",
    upMail: "ajvillanueva@up.edu.ph"
  }
];


export const examScores = [
    // using a specific 
    // Long Exam 1 Lecture
  { examScoreID: "A1B2C", referencedExamID: "EN2B8", studentID: "a9F4kP2qWz", section: "M", score: 42 },
  { examScoreID: "D3E4F", referencedExamID: "EN2B8", studentID: "X7bR3mL0sJ", section: "L", score: 45 },
  { examScoreID: "G5H6I", referencedExamID: "EN2B8", studentID: "pQ8wT6vH1k", section: "M", score: 38 },
  { examScoreID: "J7K8L", referencedExamID: "EN2B8", studentID: "Z5nY2cA9eL", section: "L", score: 44 },
  { examScoreID: "M9N0O", referencedExamID: "EN2B8", studentID: "rK1xM8bF3q", section: "M", score: 41 },
  { examScoreID: "P1Q2R", referencedExamID: "EN2B8", studentID: "V0dJ7uP4sW", section: "L", score: 47 },
  { examScoreID: "S3T4U", referencedExamID: "EN2B8", studentID: "hL6tR9kQ2z", section: "M", score: 39 },
  { examScoreID: "V5W6X", referencedExamID: "EN2B8", studentID: "S3yN5vC0pX", section: "L", score: 46 },
  { examScoreID: "Y7Z8A", referencedExamID: "EN2B8", studentID: "mF8aH1rD7w", section: "M", score: 43 },
  { examScoreID: "B9C0D", referencedExamID: "EN2B8", studentID: "G2bK4zT6qJ", section: "L", score: 40 },
  { examScoreID: "E1F2G", referencedExamID: "EN2B8", studentID: "N9vD3pL8xK", section: "M", score: 41 },

  // Long Exam 1 Laboratory
  { examScoreID: "H3I4J", referencedExamID: "PH4C5", studentID: "a9F4kP2qWz", section: "M", score: 52 },
  { examScoreID: "K5L6M", referencedExamID: "PH4C5", studentID: "X7bR3mL0sJ", section: "L", score: 55 },
  { examScoreID: "N7O8P", referencedExamID: "PH4C5", studentID: "pQ8wT6vH1k", section: "M", score: 48 },
  { examScoreID: "Q9R0S", referencedExamID: "PH4C5", studentID: "Z5nY2cA9eL", section: "L", score: 53 },
  { examScoreID: "T1U2V", referencedExamID: "PH4C5", studentID: "rK1xM8bF3q", section: "M", score: 51 },
  { examScoreID: "W3X4Y", referencedExamID: "PH4C5", studentID: "V0dJ7uP4sW", section: "L", score: 56 },
  { examScoreID: "Z5A6B", referencedExamID: "PH4C5", studentID: "hL6tR9kQ2z", section: "M", score: 50 },
  { examScoreID: "C7D8E", referencedExamID: "PH4C5", studentID: "S3yN5vC0pX", section: "L", score: 54 },
  { examScoreID: "F9G0H", referencedExamID: "PH4C5", studentID: "mF8aH1rD7w", section: "M", score: 52 },
  { examScoreID: "I1J2K", referencedExamID: "PH4C5", studentID: "G2bK4zT6qJ", section: "L", score: 49 },
  { examScoreID: "L3M4N", referencedExamID: "PH4C5", studentID: "N9vD3pL8xK", section: "M", score: 51 },

  // Long Exam 2 Lecture
  { examScoreID: "O5P6Q", referencedExamID: "BI7D1", studentID: "a9F4kP2qWz", section: "L", score: 45 },
  { examScoreID: "R7S8T", referencedExamID: "BI7D1", studentID: "X7bR3mL0sJ", section: "M", score: 47 },
  { examScoreID: "U9V0W", referencedExamID: "BI7D1", studentID: "pQ8wT6vH1k", section: "L", score: 43 },
  { examScoreID: "X1Y2Z", referencedExamID: "BI7D1", studentID: "Z5nY2cA9eL", section: "M", score: 44 },
  { examScoreID: "A3B4C", referencedExamID: "BI7D1", studentID: "rK1xM8bF3q", section: "L", score: 46 },
  { examScoreID: "D5E6F", referencedExamID: "BI7D1", studentID: "V0dJ7uP4sW", section: "M", score: 42 },
  { examScoreID: "G7H8I", referencedExamID: "BI7D1", studentID: "hL6tR9kQ2z", section: "L", score: 48 },
  { examScoreID: "J9K0L", referencedExamID: "BI7D1", studentID: "S3yN5vC0pX", section: "M", score: 45 },
  { examScoreID: "M1N2O", referencedExamID: "BI7D1", studentID: "mF8aH1rD7w", section: "L", score: 43 },
  { examScoreID: "P3Q4R", referencedExamID: "BI7D1", studentID: "G2bK4zT6qJ", section: "M", score: 44 },
  { examScoreID: "S5T6U", referencedExamID: "BI7D1", studentID: "N9vD3pL8xK", section: "L", score: 46 },

  // Long Exam 2 Laboratory
  { examScoreID: "V7W8X", referencedExamID: "CH6E3", studentID: "a9F4kP2qWz", section: "M", score: 54 },
  { examScoreID: "Y9Z0A", referencedExamID: "CH6E3", studentID: "X7bR3mL0sJ", section: "L", score: 57 },
  { examScoreID: "B1C2D", referencedExamID: "CH6E3", studentID: "pQ8wT6vH1k", section: "M", score: 50 },
  { examScoreID: "E3F4G", referencedExamID: "CH6E3", studentID: "Z5nY2cA9eL", section: "L", score: 56 },
  { examScoreID: "H5I6J", referencedExamID: "CH6E3", studentID: "rK1xM8bF3q", section: "M", score: 52 },
  { examScoreID: "K7L8M", referencedExamID: "CH6E3", studentID: "V0dJ7uP4sW", section: "L", score: 55 },
  { examScoreID: "N9O0P", referencedExamID: "CH6E3", studentID: "hL6tR9kQ2z", section: "M", score: 53 },
  { examScoreID: "Q1R2S", referencedExamID: "CH6E3", studentID: "S3yN5vC0pX", section: "L", score: 54 },
  { examScoreID: "T3U4V", referencedExamID: "CH6E3", studentID: "mF8aH1rD7w", section: "M", score: 51 },
  { examScoreID: "W5X6Y", referencedExamID: "CH6E3", studentID: "G2bK4zT6qJ", section: "L", score: 50 },
  { examScoreID: "Z7A8B", referencedExamID: "CH6E3", studentID: "N9vD3pL8xK", section: "M", score: 52 },

  // Long Exam 3 Lecture
  { examScoreID: "C1D2E", referencedExamID: "HI9F4", studentID: "a9F4kP2qWz", section: "L", score: 46 },
  { examScoreID: "F3G4H", referencedExamID: "HI9F4", studentID: "X7bR3mL0sJ", section: "M", score: 48 },
  { examScoreID: "I5J6K", referencedExamID: "HI9F4", studentID: "pQ8wT6vH1k", section: "L", score: 44 },
  { examScoreID: "L7M8N", referencedExamID: "HI9F4", studentID: "Z5nY2cA9eL", section: "M", score: 45 },
  { examScoreID: "O9P0Q", referencedExamID: "HI9F4", studentID: "rK1xM8bF3q", section: "L", score: 47 },
  { examScoreID: "R1S2T", referencedExamID: "HI9F4", studentID: "V0dJ7uP4sW", section: "M", score: 43 },
  { examScoreID: "U3V4W", referencedExamID: "HI9F4", studentID: "hL6tR9kQ2z", section: "L", score: 49 },
  { examScoreID: "X5Y6Z", referencedExamID: "HI9F4", studentID: "S3yN5vC0pX", section: "M", score: 46 },
  { examScoreID: "A7B8C", referencedExamID: "HI9F4", studentID: "mF8aH1rD7w", section: "L", score: 44 },
  { examScoreID: "D9E0F", referencedExamID: "HI9F4", studentID: "G2bK4zT6qJ", section: "M", score: 45 },
  { examScoreID: "G1H2I", referencedExamID: "HI9F4", studentID: "N9vD3pL8xK", section: "L", score: 47 },

  // Long Exam 3 Laboratory
  { examScoreID: "J3K4L", referencedExamID: "EC2G7", studentID: "a9F4kP2qWz", section: "M", score: 55 },
  { examScoreID: "M5N6O", referencedExamID: "EC2G7", studentID: "X7bR3mL0sJ", section: "L", score: 58 },
  { examScoreID: "P7Q8R", referencedExamID: "EC2G7", studentID: "pQ8wT6vH1k", section: "M", score: 53 },
  { examScoreID: "S9T0U", referencedExamID: "EC2G7", studentID: "Z5nY2cA9eL", section: "L", score: 57 },
  { examScoreID: "V1W2X", referencedExamID: "EC2G7", studentID: "rK1xM8bF3q", section: "M", score: 56 },
  { examScoreID: "Y3Z4A", referencedExamID: "EC2G7", studentID: "V0dJ7uP4sW", section: "L", score: 54 },
  { examScoreID: "B5C6D", referencedExamID: "EC2G7", studentID: "hL6tR9kQ2z", section: "M", score: 57 },
  { examScoreID: "E7F8G", referencedExamID: "EC2G7", studentID: "S3yN5vC0pX", section: "L", score: 55 },
  { examScoreID: "H9I0J", referencedExamID: "EC2G7", studentID: "mF8aH1rD7w", section: "M", score: 52 },
  { examScoreID: "K1L2M", referencedExamID: "EC2G7", studentID: "G2bK4zT6qJ", section: "L", score: 53 },
  { examScoreID: "N3O4P", referencedExamID: "EC2G7", studentID: "N9vD3pL8xK", section: "M", score: 56 }
]

export const referenceExams = [
    {
        examID: "EN2B8",
        courseID: "CMSC1351STAY2526",
        sections: ["L", "M"],
        examTitle: "Long Exam 1 Lecture",
        items: 50
    },
    {
        examID: "PH4C5",
        courseID: "CMSC1351STAY2526",
        sections: ["L", "M"],
        examTitle: "Long Exam 1 Laboratory",
        items: 60
    },
    {
        examID: "BI7D1",
        courseID: "CMSC1351STAY2526",
        sections: ["L", "M"],
        examTitle: "Long Exam 2 Lecture",
        items: 50
    },
    {
        examID: "CH6E3",
        courseID: "CMSC1351STAY2526",
        sections: ["L", "M"],
        examTitle: "Long Exam 2 Laboratory",
        items: 60
    },
    {
        examID: "HI9F4",
        courseID: "CMSC1351STAY2526",
        sections: ["L", "M"],
        examTitle: "Long Exam 3 Lecture",
        items: 50
    },
    {
        examID: "EC2G7",
        courseID: "CMSC1351STAY2526",
        sections: ["L", "M"],
        examTitle: "Long Exam 3 Laboratory",
        items: 60
    }
]