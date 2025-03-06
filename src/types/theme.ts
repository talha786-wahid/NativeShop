export interface ColorShades {
  [key: number]: string;
}

export interface Colors {
  sapphire: string;
  limeGreen: string;
  white: string;
  black: string;
  error: ColorShades;
  success: ColorShades;
  neutral: ColorShades;
  lightningYellowAccent: ColorShades;
  macaroniCheeseAccent: ColorShades;
  frenchLilacAccent: ColorShades;
  sailAccent: ColorShades;
  primary: ColorShades;
}

export interface Fonts {
  [key: string]: string;
}

export interface FontSize {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
}

export interface Theme {
  colors: Colors;
  fonts: Fonts;
  fontSize: FontSize;
}
