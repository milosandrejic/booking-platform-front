import React from 'react'

export interface StyleRegistryOptions {
  key?: string
  nonce?: string
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

  // Get all collected styles as React elements for injection
  getStyles(): React.ReactElement[] {
    const styleElements: React.ReactElement[] = []

    this.styles.forEach((css, className) => {
      styleElements.push(
        React.createElement('style', {
          key: `${this.key}-${className}`,
          'data-registry': this.key,
          dangerouslySetInnerHTML: {
            __html: `.${className}{${css}}`
          },
        })
      )
    })

    return styleElements
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

export function createStyleRegistry(options?: StyleRegistryOptions): StyleRegistry {
  return new StyleRegistry(options)
}
