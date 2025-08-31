import { getGlobalRegistry } from "@booking-platform-shared/theme";

export default function StylesInjector() {
  const registry = getGlobalRegistry();

  if (!registry) {
    return null;
  }

  const styles = registry.getStyles();
  registry.flush();

  if (styles.length === 0) {
    return null;
  }

  // Combine all CSS into a single string
  const combinedCSS = styles
    .map((style: any) => style.props?.dangerouslySetInnerHTML?.__html || "")
    .filter(Boolean)
    .join("\n");

  if (!combinedCSS.trim()) {
    return null;
  }

  return (
      <style
        dangerouslySetInnerHTML={{ __html: combinedCSS }}
        data-sx-injected="true"
      />
  );
}
