import { z } from "zod";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { employees, students, users } from "~/server/db/schema";

const JWT_SECRET = 'maroon-book-jwt-secret';
const NOTIFY_HASH_SALT = 'maroon-book-salt';

function generateAuthToken(userId: number, role: string): string {
    return jwt.sign({
        id: userId,
        role,
    }, JWT_SECRET);
}

function generateNotifyToken(userId: number, role: string): {
    signature: string;
    nonce: string;
} {
    const nonce = Date.now().toString() + '-' + userId;
    const signature = crypto.createHash('sha256')
        .update(NOTIFY_HASH_SALT + userId + role + nonce)
        .digest('hex');

    return {
        signature,
        nonce,
    };
}

function wrapSuccess<T>(data: T): {
    status: 'ok';
    data: T;
} {
    return {
        status: 'ok',
        data,
    };
}

function wrapError(message: string): {
    status: 'error';
    message: string;
} {
    return {
        status: 'error',
        message,
    };
}

export const userRouter = createTRPCRouter({
    loginStudent: publicProcedure
        .input(z.object({
            id: z.number().int().positive(),
            // Bad practice, but this is just a
            // demo app
            password: z.string().min(1),
        }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.query.users.findFirst({
                where: (users, { and, eq }) => and(
                    eq(users.id, input.id),
                    eq(users.role, 'student'),
                ),
            });

            const userDetails = await ctx.db.query.students.findFirst({
                where: (students, { eq }) => eq(students.id, input.id),
            });

            if (!user) {
                return wrapError('User not found');
            }

            // Check password via BCrypt
            const validPassword = await bcrypt.compare(input.password, user.passwordHash);

            if (!validPassword) {
                return wrapError('Invalid password');
            }

            return wrapSuccess({
                id: user.id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,

                // JWT for API Authentication
                authToken: generateAuthToken(user.id, user.role),

                // Credentials for Notification Web Socket Server
                notify: generateNotifyToken(user.id, user.role),

                details: {
                    campus: userDetails?.campus ?? '',
                    program: userDetails?.program ?? '',
                },
            });
        }),

    loginEmployee: publicProcedure
        .input(z.object({
            id: z.number().int().positive(),
            // Bad practice, but this is just a
            // demo app
            password: z.string().min(1),
        }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.query.users.findFirst({
                where: (users, { and, eq }) => and(
                    eq(users.id, input.id),
                    eq(users.role, 'employee'),
                ),
            });

            const userDetails = await ctx.db.query.employees.findFirst({
                where: (employees, { eq }) => eq(employees.id, input.id),
            });

            if (!user) {
                return wrapError('User not found');
            }

            // Check password via BCrypt
            const validPassword = await bcrypt.compare(input.password, user.passwordHash);

            if (!validPassword) {
                return wrapError('Invalid password');
            }

            return wrapSuccess({
                id: user.id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,

                // JWT for API Authentication
                authToken: generateAuthToken(user.id, user.role),

                // Credentials for Notification Web Socket Server
                notify: generateNotifyToken(user.id, user.role),

                details: {
                    campus: userDetails?.campus ?? '',
                    division: userDetails?.division ?? '',
                },
            });
        }),

    getNotifyToken: publicProcedure
        .input(z.object({
            token: z.string(),
        }))
        .query(async ({ input }) => {
            // Verify JWT token
            try {
                const { id, role } = jwt.verify(input.token, JWT_SECRET) as { id: number, role: string };
                return wrapSuccess(generateNotifyToken(id, role));
            } catch {
                return wrapError('Invalid auth token');
            }
        }),
    
    register: publicProcedure
        .input(z.object({
            id: z.number().int().positive(),
            firstName: z.string().min(1),
            middleName: z.string().optional(),
            lastName: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(6),
            role: z.enum(['employee', 'student']),
            campus: z.string().min(1),
            programOrDivision: z.string().min(1),
        }))
        .mutation(async ({ ctx, input }) => {
            const existingUserById = await ctx.db.query.users.findFirst({
                where: (users, { eq }) => eq(users.id, input.id),
            });

            if (existingUserById) {
                return wrapError('User ID already exists');
            }

            const existingUserByEmail = await ctx.db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, input.email),
            });

            if (existingUserByEmail) {
                return wrapError('Email already registered');
            }

            const passwordHash = await bcrypt.hash(input.password, 10);

            await ctx.db.insert(users).values({
                id: input.id,
                firstName: input.firstName,
                middleName: input.middleName,
                lastName: input.lastName,
                email: input.email,
                passwordHash,
                role: input.role,
            });

            // @ts-expect-error: This is fine, we will always set details based on role
            let details: {
                campus: string;
                division: string;
            } | {
                campus: string;
                program: string;
            } = {};
            if (input.role === 'student') {
                await ctx.db.insert(students).values({
                    id: input.id,
                    campus: input.campus,
                    program: input.programOrDivision,
                });

                details = {
                    campus: input.campus,
                    program: input.programOrDivision,
                };
            } else if (input.role === 'employee') {
                await ctx.db.insert(employees).values({
                    id: input.id,
                    campus: input.campus,
                    division: input.programOrDivision,
                });

                details = {
                    campus: input.campus,
                    division: input.programOrDivision,
                };
            }

            return wrapSuccess({
                id: input.id,
                firstName: input.firstName,
                middleName: input.middleName,
                lastName: input.lastName,
                email: input.email,

                // JWT for API Authentication
                authToken: generateAuthToken(input.id, input.role),

                // Credentials for Notification Web Socket Server
                notify: generateNotifyToken(input.id, input.role),

                details,
            });
        }),
});
