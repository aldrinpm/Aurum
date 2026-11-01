// Mock implementation for pageTypography.ts

export interface PageTypographyProps {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: number;
  bodyWeight?: number;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
}

/** Splits typography props into type (config) and frame (instance values) */
export function splitTypographyProps(props: PageTypographyProps): [any, any] {
  const type = {
    fontFamily: props.headingFont || 'onest',
    headingWeight: props.headingWeight,
    bodyWeight: props.bodyWeight,
    defaultSize: {
      heading: props.headingSize,
      body: props.bodySize,
    },
    letterSpacing: props.headingLetterSpacing,
  };
  const frame = props;
  return [type, frame];
}

/** Mock hook to apply typography settings */
export function usePageTypography(_typeConfig: any, _type: any) {
  // In a real scenario, this would consume typeConfig and apply it
  // to the frame, potentially returning derived CSS variables or styles.
  return {
    // Minimal mock object matching expected usage pattern
    styleClass: 'kage-typography-style',
    // ... other style props
  };
}