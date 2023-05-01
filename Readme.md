# GraphQl Exercice Summary

**Goal:** Develop a small CV manager with schema, types, relationships, and operations for managing CVs.

# Relationships

1. **User** can have many **CVs**
2. **CV** has one **User**
3. **CV** can have many **Skills**
4. **Skill** can have many **CVs**

## Query

- Reproduce the schema for a small CV manager.
- Create types and relationships (role as enum: user or admin).
- Prepare a mock database in a TypeScript file for testing (consider relationships and use context).
- Implement operations to fetch all CVs and a CV by its ID.
- Enable retrieval of skills and user for a CV.

## Mutations

- Create two inputs for adding and updating a CV.
- Add mutations to add or update a CV.
- Verify the existence of related elements (user and skill).
- Add a mutation for deletion.

## Subscriptions

- Create a subscription to notify on the addition, modification, or deletion of a CV.
