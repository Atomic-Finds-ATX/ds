export interface ColorGroup {
  [key: string]: string;
}

export interface ColorsToken {
  palette: {
    orange: string;
    avocado: string;
    oliveTeal: string;
    cream: string;
    mustard: string;
    pink: string;
  };
  accessible: {
    orangeDeep: string;
    orangeBtn: string;
    avocadoDeep: string;
  };
  surfaces: {
    surface: string;
    surfaceSunk: string;
    surfaceRaised: string;
  };
  ink: {
    ink: string;
    inkSoft: string;
    hairline: string;
  };
  status: {
    available: string;
    sold: string;
  };
}

export interface SpacingToken {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
}

export interface RadiiToken {
  sm: number;
  button: number;
  card: number;
  lg: number;
  pill: number;
}

export interface BordersToken {
  width: number;
  heavy: number;
}

export interface ShadowsToken {
  stampSm: string;
  stamp: string;
  stampLift: string;
}

export interface TypographyToken {
  families: {
    display: string;
    script: string;
    body: string;
  };
  sizes: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
}

export interface DesignTokens {
  colors: ColorsToken;
  spacing: SpacingToken;
  radii: RadiiToken;
  borders: BordersToken;
  shadows: ShadowsToken;
  typography: TypographyToken;
}

export declare const colors: ColorsToken;
export declare const spacing: SpacingToken;
export declare const radii: RadiiToken;
export declare const borders: BordersToken;
export declare const shadows: ShadowsToken;
export declare const typography: TypographyToken;
export declare const tokens: DesignTokens;
export default tokens;
