// context.ts
import { fakeDatabase } from './data/fakeDatabase';
export interface ContextType {
    data: typeof fakeDatabase;
}

export const context: ContextType = {
    data: fakeDatabase,
};
