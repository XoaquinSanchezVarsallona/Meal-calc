# Meal Calc

## Overview
Meal Calc is an API-first project designed to support a future mobile app focused on nutrition tracking, calorie management, and meal organization.

The core idea of the product is not only to track what a user eats, but to help the user build meals that fit a personal calorie goal using the ingredients they already have available.

This project is currently intended for:
- personal use
- portfolio building
- defining a solid backend foundation before starting the mobile app

## Product Vision
The long-term vision of Meal Calc is to provide a system that helps users:
- understand their daily calorie intake
- organize meals around a personal physical objective
- use available ingredients more effectively
- reduce friction when deciding what to eat

The main product direction is meal generation and meal organization around the user's daily requirements, with calorie tracking as the supporting logic.

## Problem It Solves
Users who want to improve their eating habits or reach a physical goal often need to combine several separate tools:
- calorie trackers
- meal planners
- recipe apps
- activity trackers
- ingredient searches

Meal Calc aims to centralize the most useful parts of that workflow into one backend that can later power a mobile experience.

## Target User
The current target user is:
- a person between roughly 15 and 34 years old
- someone interested in well-being, body goals, or food organization
- someone without advanced nutritional restrictions in the first version
- someone who wants practical help instead of detailed medical advice

This project currently assumes a single user type rather than multiple roles or account classes.

## Product Goals
The current goals of the project are:
- track food intake
- calculate calorie intake
- define a basic calorie target for the user
- organize meals around a personal objective
- prepare a backend that can later support a mobile application

In practical terms, the product should help a user answer:
- How much am I eating?
- Does this meal fit my goal?
- What can I cook with what I already have?

## Version 1 Scope
### V1 Includes
- user profile foundation
- meals and ingredients management
- calorie-related calculations
- meal organization based on user needs
- basic delivery of useful nutritional information

### V1 Excludes
- AI-assisted food recognition
- exercise adjustment logic
- calories burned through activity
- production-grade price lookup
- advanced recommendation systems

### V1 Success Criteria
Version 1 is successful if it can:
- represent meals and ingredients clearly
- calculate and expose useful calorie information
- support the user's basic meal-planning needs
- provide enough structure to continue into a mobile app

## Core User Flow
The intended basic flow is:
1. A user creates a profile.
2. The user defines personal body data and an objective.
3. The user registers ingredients and meals.
4. The system calculates how those meals relate to the user's calorie needs.
5. The user reviews available meals and chooses options that support the objective.

In later versions, this flow may expand with AI assistance, price information, and smarter suggestions.

## Core Modules
The current backend is organized around these module areas.

### Users
Purpose:
- manage profile information
- store body-related data
- support a personal objective

Expected responsibilities:
- identity and account data
- physical profile data
- target-related settings

Open points:
- authentication strategy
- whether goals are stored historically or only as the current state
- whether more profile data is needed beyond weight, height, age, and gender

### Calories
Purpose:
- provide calorie calculations related to meals and users

Expected responsibilities:
- calculate user calorie requirements
- relate meals to calorie targets
- expose calorie summaries useful to the rest of the system

Open points:
- formula selection
- whether macros are part of V1 or a near-term extension
- whether this module should also include future activity burn logic

### Meals
Purpose:
- represent meals and how they are built from ingredients

Expected responsibilities:
- create and manage meals
- link ingredients to meals
- support meal planning around calorie goals

Open points:
- whether meals are reusable templates, user-created recipes, or both
- portion definition strategy
- whether meal difficulty should be modeled explicitly

### Ingredients
Purpose:
- represent the foods available to the user and their nutritional values

Expected responsibilities:
- define ingredient data
- support calorie information per ingredient
- act as the base for meal composition

Open points:
- source of ingredient data
- support for macros, prices, and brands
- whether values are stored per 100 g, per portion, or both

### Activity
Purpose:
- represent calorie output from movement or exercise

Current status:
- planned for later
- not part of V1

### AI
Purpose:
- support future food recognition, estimation, or assisted planning

Current status:
- exploratory
- not part of V1

Possible future responsibilities:
- food recognition from images
- portion estimation
- meal suggestion support

### Prices
Purpose:
- support future ingredient or product price lookup

Current status:
- future feature
- not part of V1

Possible future direction:
- separate service, potentially in Rust
- scraping or crawler-based product lookup

## Domain Model
The current schema already suggests the first layer of the domain:
- `User`
- `Meal`
- `Ingredient`
- `UserMeal`
- `UserIngredient`
- `MealIngredient`

This is a good start for representing ownership and relationships, but the model is still incomplete for the product vision.

Likely future additions:
- user objective
- meal history or daily log
- meal type or category
- macro fields
- activity tracking entity

## Backend Responsibility
This API is intended to become the main backend for the product and later the main service consumed by the mobile app.

Its responsibility should be:
- business logic
- data persistence
- calorie-related calculations
- meal and ingredient management
- future integrations for AI or pricing if needed

The mobile app should consume this backend rather than replicate the business rules.

## Relationship to the Future Mobile App
The future mobile app should act mainly as a client layer for:
- user interaction
- daily tracking workflows
- meal browsing and planning
- profile updates

The backend should remain the source of truth for:
- user data
- meals and ingredients
- calorie calculations
- future recommendation support

## Current Stack
Current backend stack:
- NestJS
- Prisma
- PostgreSQL

Technology decisions still to close:
- mobile framework
- authentication solution
- source of ingredient and nutrition data
- AI provider or model strategy
- pricing-service architecture
- deployment model

## Open Decisions
The project is now defined enough to move forward, but these decisions are still open:
- exact formula and logic for calorie targets
- whether macros are part of the first stable feature set
- how ingredient nutrition data will be sourced
- whether meals should include difficulty and preparation metadata
- what mobile stack will consume this API
- whether pricing belongs in this repository or in a separate service

## Recommended Roadmap
1. Finalize the user profile and objective model.
2. Finalize meal and ingredient responsibilities.
3. Refine the calorie module rules and formulas.
4. Adjust the Prisma schema to match the product definition.
5. Write README files for each module based on this document.
6. Implement the API around the V1 scope.
7. Revisit AI, activity, and pricing after the core product works.

## What This README Should Enable Next
This document should now be enough to write a module README that answers:
- why the module exists
- what feature it supports
- what data it owns
- what logic it contains
- what is inside its scope
- what is outside its scope

If a module README still feels ambiguous, the missing definition should be added here first before documenting the module in detail.
