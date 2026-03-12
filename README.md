# Meal Calc

## Purpose of This Document
This README is the base document for defining the product, organizing the backend scope, and later deriving the README for each module.

It should answer:
- what product is being built
- who it is for
- what belongs in the first version
- which modules exist and why
- which technical decisions are already made
- which decisions are still open

If a future module README cannot be written from this document, then this document is still missing context.

## Product Vision
Meal Calc is an API-first project intended to support a future mobile application focused on meal tracking, calorie management, and nutrition-oriented planning.

The product should help a user understand:
- how many calories they consume
- how many calories they burn
- how their meals relate to a personal objective

Pending definition:
- exact primary value of the product
- whether the main focus is tracking, planning, recommendation, AI assistance, or cost optimization

## Problem to Solve
Users who want to manage weight, nutrition, or meal consistency usually need to combine several disconnected tools:
- food tracking
- calorie estimation
- activity tracking
- meal planning
- ingredient or price lookup

This project aims to centralize those capabilities behind a backend that can later be consumed by a mobile app.

Pending definition:
- the exact pain point to prioritize in V1
- whether this is mainly for personal use, portfolio, MVP validation, or production use

## Target User
Initial assumption:
- a user who wants to monitor food intake and calorie balance
- a user who may want help choosing meals aligned with a goal

Pending definition:
- age range or user profile
- level of nutritional knowledge
- whether the user is focused on weight loss, weight gain, maintenance, fitness, or general health
- whether there will be one type of user or multiple roles

## Product Goals
Expected goals of the product:
- track food intake
- calculate calorie intake and output
- organize meals around a user objective
- create a backend foundation for a mobile app

Pending definition:
- success criteria for V1
- most important user outcome
- measurable product objective

## Scope
### In Scope for Initial Definition
- API backend as the main source of business logic
- calorie-related domain modeling
- meals and ingredients management
- user data and history foundation
- future compatibility with a mobile client

### Candidate Features
- food and ingredient tracking
- meal creation and meal composition
- calorie and macro calculation
- user history
- activity-based calorie output
- AI-assisted food recognition or estimation
- price lookup for ingredients or products

### Out of Scope Until Defined
- final mobile app implementation
- production-grade AI pipeline
- production-grade scraping pipeline
- advanced recommendation logic
- medical or clinical guidance

## Initial Version Boundaries
This section should be completed before writing detailed module README files.

Questions to resolve:
- What must exist in V1 for the product to be useful?
- Which modules are mandatory in V1?
- Which modules are exploratory only?
- Which features must be postponed to avoid overbuilding?

Suggested format:
- V1 includes:
- V1 excludes:
- V1 success means:

## Core User Flow
Draft high-level flow:
1. A user creates an account or profile.
2. The user defines a physical profile and a goal.
3. The user registers meals, ingredients, or daily consumption.
4. The system calculates calorie intake and possibly calorie output.
5. The user reviews progress and history.
6. The system may later suggest meals, detect food from images, or estimate prices.

Pending definition:
- whether activity tracking is part of the core flow
- whether AI is part of the core flow or a support feature
- whether meal planning is manual, assisted, or automatic

## Core Modules
These modules should each receive their own README later.

### Users
Purpose:
- manage identity, profile, body data, and personal objective

Still needs definition:
- authentication strategy
- user roles
- profile fields beyond age, height, weight, and gender
- whether goals are static or historical

### Calories
Purpose:
- calculate calorie-related values for intake, output, and user targets

Still needs definition:
- whether it includes only calorie target calculation or also intake summaries and activity burn
- whether macros are included from V1
- formulas and assumptions used by the system

### Meals
Purpose:
- represent meals, their ingredients, and how users consume or save them

Still needs definition:
- whether meals are reusable recipes, meal logs, or both
- whether meals belong to users, templates, or both
- whether portions use grams, units, milliliters, or multiple measurement types

### Ingredients
Purpose:
- represent food items and their nutritional values

Still needs definition:
- source of nutritional data
- support for macros, micronutrients, prices, brands, and regional data
- whether values are stored per 100 g, per unit, or both

### Activity
Purpose:
- represent energy expenditure through exercise or physical activity

Still needs definition:
- whether this belongs in V1
- which activity data is stored
- whether calculations are manual, estimated, or integrated from external sources

### AI
Purpose:
- support tasks that are difficult to do manually, such as food recognition or meal estimation

Still needs definition:
- whether AI is in V1
- whether AI is limited to text, image recognition, or both
- whether AI suggests meals, estimates portions, or only classifies inputs
- acceptable accuracy and operational cost

### Prices
Purpose:
- support ingredient or product price lookup to help meal decisions

Still needs definition:
- whether this is core or secondary
- whether it belongs in this repo or in a separate service
- source of price data
- whether a Rust service is actually required

## Domain Model
Current entities suggested by the schema:
- User
- Meal
- Ingredient
- UserMeal
- UserIngredient
- MealIngredient

The current schema is a starting point, not a final business model.

Still needs definition:
- user goal entity
- daily log entity
- activity entity
- meal type or meal occasion
- macro fields
- history and progress tracking
- whether user-meal relation represents favorites, ownership, consumption, or another concept

## Backend Responsibility
This API should eventually act as:
- the main business logic layer
- the main persistence layer
- the integration layer for nutrition data, AI, and possible pricing services

Pending definition:
- what logic must stay in backend
- what logic can live in the mobile app
- which features require asynchronous jobs or separate services

## Mobile App Relationship
The backend is being designed with a future mobile app in mind.

This README should eventually clarify:
- what the mobile app consumes from this API
- what workflows start in mobile but resolve in backend
- whether the mobile app is only a client or also contains business logic

## Tech Stack
Current stack:
- NestJS for backend API
- Prisma for ORM and schema management
- PostgreSQL as the current database choice

Candidate stack decisions still to confirm:
- mobile framework
- authentication provider
- AI provider or model strategy
- external nutrition database
- scraping or crawler strategy for prices
- whether Rust is needed for a separate service
- infrastructure and deployment model

## Open Decisions
This section should stay visible until the product is more defined.

- What is the exact V1?
- What is the most important user problem?
- Is AI part of the first release or a later enhancement?
- Is price lookup actually part of the core product?
- What data source will be used for ingredients and nutrition?
- Will this be a single backend or multiple services?
- What mobile stack will consume this API?
- What should be considered a successful first milestone?

## Roadmap Draft
Suggested order of definition before implementation grows further:
1. Define product objective and target user.
2. Define V1 scope and what is explicitly out.
3. Define core user flow.
4. Define module responsibilities.
5. Adjust the domain model to match those responsibilities.
6. Confirm the stack and external dependencies.
7. Write module-specific README files.

## Module README Requirements
Before creating a README for a module, this document should make it possible to answer:
- Why does the module exist?
- What feature or objective does it support?
- What data does it own?
- What logic does it contain?
- What does it not do?
- What other modules does it depend on?
- Is it part of V1 or future work?

## Local Setup
To be completed:
- environment variables
- database setup
- development commands
- test commands
- seed strategy

## Notes
This document should remain focused on product definition, scope, and system organization.

Detailed technical documentation for each feature should live in module-specific README files once the sections above are sufficiently defined.
