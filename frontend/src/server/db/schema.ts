// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `maroon-book_${name}`);

export const users = createTable(
    "user",
    (d) => ({
        // Student Number or Employee Number
        id: d.integer().primaryKey().notNull().unique(),
        firstName: d.varchar({ length: 128 }).notNull(),
        middleName: d.varchar({ length: 128 }),
        lastName: d.varchar({ length: 128 }).notNull(),
        email: d.varchar({ length: 256 }).notNull().unique(),
        // BCrypt hashed password
        passwordHash: d.varchar({ length: 60 }).notNull(),
        role: d.varchar({ length: 32 }).notNull(),
    }),
    (t) => [index("id_idx").on(t.id)],
);
