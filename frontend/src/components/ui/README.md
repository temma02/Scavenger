# UI Component Library Documentation

## Base Components

### 1. Button
A customizable button component with several variants and sizes.
- **Variants**: `primary`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **Sizes**: `default`, `sm`, `lg`, `icon`
- **Props**: Inherits all HTML button props + `asChild` for Radix Slot integration.

### 2. Input
A styled text input component.
- **Props**: Inherits all HTML input props.

### 3. Card
A set of components for building cards with headers, content, and footers.
- Components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### 4. Switch
A toggle switch component powered by Radix UI.
- **Props**: Inherits Radix Switch props.

## Theme & Dark Mode
The library supports fully reactive dark mode using `next-themes`.
- Wrap the app with `ThemeProvider`.
- Use the `dark` class on the `<html>` or `<body>` tag.
- Tailwind colors are defined using HSL variables in `index.css`.

## Utilities
- `cn(...)`: A utility for merging tailwind classes using `clsx` and `tailwind-merge`.
