AI Module Architecture Guide

Purpose
- Centralize all AI-related behavior in one place.
- Keep prompt construction, model calls, parsing, and validation separated.
- Avoid mixing AI logic with business rules from calories, meals, or users.

Recommended structure
- ai.module.ts
	- Registers only the providers needed by the AI feature.
	- Imports ConfigModule if the module reads AI_URL, AI_MODEL, or similar settings.
- ai.service.ts
	- Owns the HTTP call to the AI provider.
	- Exposes small, reusable methods such as prompt(), generateText(), or generateJson().
- prompt builders
	- Functions or classes that build prompts for a specific use case.
	- Example: meal suggestions, calorie explanation, ingredient substitution.
- response validators
	- Functions that validate and normalize model output before the app uses it.
	- If the model returns JSON, validate shape, required fields, and value ranges.
- optional domain services
	- If the AI logic grows, split it into feature-specific services instead of one giant service.

Suggested internal flow
1. A feature service calls the AI layer with a clear intent.
2. A prompt builder converts domain data into a compact prompt.
3. AiService sends the request to the model.
4. A parser or validator checks the response.
5. The feature service decides whether to persist or return the result.

Best practices
- Keep prompts small and specific.
- Pass only the data the model really needs.
- Ask for structured output whenever possible, ideally JSON.
- Version prompts when the behavior matters.
- Treat model output as untrusted input.
- Set timeouts and handle failures gracefully.
- Log requests and failures without leaking sensitive user data.
- Keep business rules in code, not in the prompt.

What should live in the AI module
- Model integration code.
- Prompt templates for AI use cases.
- Output parsing and validation.
- Retry or fallback policy if the provider fails.

What should not live in the AI module
- Core calorie formulas.
- Prisma queries for users, meals, or ingredients.
- Auth logic.
- UI-specific formatting.
- Heavy business logic that belongs to calories or meals.

Example target shape
```text
src/ai/
	ai.module.ts
	ai.service.ts
	prompts/
		meal-plan.prompt.ts
		calorie-summary.prompt.ts
	validators/
		ai-response.validator.ts
	types/
		ai.types.ts
```

How this should evolve in Meal Calc
- Start with one generic AI service and a small set of prompt builders.
- Add one feature-specific method per use case instead of one giant prompt function.
- Keep meal logic inside meals and calorie logic inside calories.
- Use AI as an assistant, not as the source of truth for calculations.

Practical rule of thumb
- If the code decides "what is correct", it belongs outside the AI module.
- If the code decides "how to ask the model" or "how to read the answer", it belongs inside the AI module.

Current project recommendation
- AiModule should import ConfigModule if it reads environment variables.
- AiService should only call the provider and return raw or parsed output.
- Prompt templates should be moved into dedicated files once there is more than one use case.
- Each AI feature should validate responses before returning them to the rest of the app.
