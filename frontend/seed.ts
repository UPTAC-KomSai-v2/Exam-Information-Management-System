import { env } from "~/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "~/server/db/schema";
import bcrypt from "bcryptjs";

const conn = postgres(env.DATABASE_URL);
const db = drizzle(conn, { schema })

async function main() {
    console.log('Creating seed users...');
    const studentPassword = bcrypt.hashSync('123456', 10);

    const studentUser: typeof schema.users.$inferInsert = {
        id: 202512345,
        firstName: 'John',
        middleName: 'A',
        lastName: 'Doe',
        email: 'jdoe@up.edu.ph',
        role: 'student',
        passwordHash: studentPassword,
    };

    const studentDetails: typeof schema.students.$inferInsert = {
        id: studentUser.id,
        campus: 'UPTC',
        program: 'BS Computer Science',
    };

    const employeePassword = bcrypt.hashSync('123456', 10);

    const employeeUser: typeof schema.users.$inferInsert = {
        id: 202512346,
        firstName: 'Jane',
        middleName: 'B',
        lastName: 'Smith',
        email: 'jsmith@up.edu.ph',
        role: 'employee',
        passwordHash: employeePassword,
    };

    const employeeDetails: typeof schema.employees.$inferInsert = {
        id: employeeUser.id,
        campus: 'UPTC',
        division: 'DNSM',
    };

    const course1: typeof schema.courses.$inferInsert = {
        courseTitle: 'CMSC 135',
        courseDescription: 'Data Communication and Networking',
        academicYear: 'AY 2025 - 2026',
        semester: 'First Semester',
        courseEmployeeID: employeeUser.id,
    };

    const course1SectionL: typeof schema.courseSections.$inferInsert = {
        sectionName: 'L',
        courseCode: 'CMSC135-L',
        courseID: -1, // to be set after course insertion
    };

    console.log('Clearing existing users...');
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(schema.users);
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(schema.students);
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(schema.employees);

    console.log('Seeding database with initial users...');
    await db.insert(schema.users).values([studentUser, employeeUser]);
    await db.insert(schema.students).values(studentDetails);
    await db.insert(schema.employees).values(employeeDetails);

    const course1Entry = await db.insert(schema.courses).values(course1).returning();
    course1SectionL.courseID = course1Entry[0]!.courseID;

    const course1SectionLEntry = await db.insert(schema.courseSections).values(course1SectionL).returning();

    const enrollment1: typeof schema.enrollments.$inferInsert = {
        studentID: studentUser.id,
        sectionID: course1SectionLEntry[0]!.sectionID,
    };

    await db.insert(schema.enrollments).values(enrollment1);

    const seededUsers = await db.select().from(schema.users);
    console.log('Seeded Users:', seededUsers);

    console.log('Done');

    void conn.end();
}

void main();