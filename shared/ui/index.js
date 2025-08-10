// Shared UI Components
// This package contains reusable components across all applications

// Component exports (named exports from component files)
export * from "./src/Container/Container.jsx";
export * from "./src/Button/Button.jsx";
export * from "./src/Typography/Typography.jsx";
export * from "./src/Grid/Grid.jsx";
export * from "./src/TextField/TextField.jsx";
export * from "./src/Select/Select.jsx";

// CSS utilities
export { generateCSSVariables, injectCSSVariables } from "./src/utils/cssVariables.js";

// Future exports:
// export { default as Header } from './Header/Header.jsx';
// export { default as Footer } from './Footer/Footer.jsx';
// export { default as Button } from './Button/Button.jsx';
// export { default as Card } from './Card/Card.jsx';
// export { default as Modal } from './Modal/Modal.jsx';
// export { default as Layout } from './Layout/Layout.jsx';
