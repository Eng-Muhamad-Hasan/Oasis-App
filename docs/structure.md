# Starter Kit Structure

```txt
src/app/          Expo Router routes and layouts
src/features/     product modules
src/components/   shared UI components
src/theme/        design tokens
src/constants/    stable app values and options
src/config/       runtime config and feature flags
src/providers/    app-wide provider composition
src/hooks/        shared hooks
src/lib/          API, storage, analytics, notifications
src/i18n/         translations
src/utils/        pure helpers
src/types/        shared TypeScript types
tests/            shared test examples
```

## Rule Of Thumb

- `app/` is for routing.
- `features/` is for product logic.
- `components/ui/` is for reusable design.
- `lib/` is for infrastructure.

Use `features/component-showcase` as an example of a feature module, then replace or remove it when your real product modules are ready.
