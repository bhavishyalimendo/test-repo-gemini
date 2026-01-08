export interface Todo {
    id: number;
    name: string; // "name" as per user request
    description?: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}
