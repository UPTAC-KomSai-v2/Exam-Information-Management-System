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

    console.log('Clearing existing users...');
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(schema.users);

    console.log('Seeding database with initial users...');
    await db.insert(schema.users).values([studentUser, employeeUser]);

    const seededUsers = await db.select().from(schema.users);
    console.log('Seeded Users:', seededUsers);

    console.log('Done');

    void conn.end();
}

void main();