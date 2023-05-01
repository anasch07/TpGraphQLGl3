// fakeDatabase.ts
import {v4 as uuidv4} from 'uuid';

type Role = 'ADMIN' | 'USER';

// export interface Skill {
//     id: string;
//     designation: string;
// }

// export interface Cv {
//     id: string;
//     name: string;
//     age: number;
//     job: string;
//     skills: Skill[];
// }
export interface SkillInput {
    designation: string;
    id: string;
}

export interface CvInput {
    name: string;
    age: number;
    job: string;
    id: string;
    skills: SkillInput[];
}

export interface Cv extends CvInput {
    id: string;
}

export interface Skill extends SkillInput {
    id: string;
}


export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    cvs: Cv[];
}

const randomDesignations = ['Web Developer', 'Data Analyst', 'Software Engineer', 'UI/UX Designer'];
const randomJobs = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist'];

const generateRandomSkill = (): Skill => ({
    id: uuidv4(),
    // he needs to have at least one designation
    designation: randomDesignations[Math.floor(Math.random() * randomDesignations.length)],
});

const generateRandomCv = (): Cv => ({
    id: uuidv4(),
    name: `John Doe ${Math.floor(Math.random() * 100)}`,
    age: Math.floor(Math.random() * (65 - 18 + 1)) + 18,
    // he needs to have at least one job
    job: randomJobs[Math.floor(Math.random() * randomJobs.length)],
    // he needs to have at least one skill
    skills: Array.from({length: Math.floor(Math.random() * 2) + 1}, generateRandomSkill),
});

const generateRandomUser = (): User => ({
    id: uuidv4(),
    name: `User ${Math.floor(Math.random() * 100)}`,
    email: `user${Math.floor(Math.random() * 100)}@example.com`,
    role: Math.random() < 0.5 ? 'ADMIN' : 'USER',
    // he needs to have at least one cv
    cvs: Array.from({length: Math.floor(Math.random() * 2) + 1}, generateRandomCv),
});

export const fakeDatabase: User[] = Array.from({length: 3}, generateRandomUser);
