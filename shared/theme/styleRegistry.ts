export interface StyleRegistryOptions {
  key?: string
}

export class StyleRegistry {
  private styles: Map<string, string> = new Map()
  private key: string

  constructor(options: StyleRegistryOptions = {}) {
    this.key = options.key || 'sx'
  }

  // Register a style rule with its CSS
  register(className: string, css: string) {
    // Only register if not already present (avoids re-generating)
    if (!this.styles.has(className)) {
      this.styles.set(className, css)
    }
  }

  // Get all collected styles as CSS string
  getStyles(): string {
    return Array.from(this.styles.entries())
      .map(([className, css]) => `.${className}{${css}}`)
      .join('\n')
  }

  // Flush styles after they've been sent to the client
  flush() {
    this.styles.clear()
  }

  // Get number of registered styles
  getCount(): number {
    return this.styles.size
  }
}

// Global registry for SSR collection
let globalRegistry: StyleRegistry | null = null

export function setGlobalRegistry(registry: StyleRegistry) {
  globalRegistry = registry
}

export function getGlobalRegistry(): StyleRegistry | null {
  return globalRegistry
}

export function createStyleRegistry(options: { key?: string } = {}): StyleRegistry {
  return new StyleRegistry(options)
}
