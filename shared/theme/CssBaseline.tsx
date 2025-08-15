export const CssBaseline = () => {
  const baselineStyles = `
    /* CSS Reset - Modern Normalize */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
    }

    html,
    body {
      height: 100%;
    }

    body {
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    img,
    picture,
    video,
    canvas,
    svg {
      display: block;
      max-width: 100%;
    }

    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      overflow-wrap: break-word;
    }

    #root,
    #__next {
      isolation: isolate;
    }

    /* Remove default styling */
    h1, h2, h3, h4, h5, h6 {
      font-size: inherit;
      font-weight: inherit;
    }

    a {
      color: inherit;
      text-decoration: inherit;
    }

    button {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }

    ul, ol {
      list-style: none;
    }

    /* Focus management */
    :focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `;

  return (
    <style dangerouslySetInnerHTML={{ __html: baselineStyles }} />
  );
};
