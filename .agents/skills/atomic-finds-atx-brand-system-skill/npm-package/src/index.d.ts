import { ReactNode, CSSProperties, ComponentType } from 'react';
export * from '../dist/tokens.d.ts';

export interface ButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  as?: ComponentType<any> | string;
  onClick?: (event: any) => void;
  [key: string]: any;
}

export interface TagProps {
  children?: ReactNode;
  variant?: 'era' | 'material' | 'accent' | 'available' | 'sold';
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export interface InspectionStampProps {
  team?: string;
  verdict?: string;
  curator?: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export interface ProductCardProps {
  name: string;
  era?: string;
  material?: string;
  status?: 'available' | 'sold';
  price?: string;
  imageSrc?: string;
  imageAlt?: string;
  story?: string;
  nachoTip?: string;
  nachoImageSrc?: string;
  passport?: any;
  className?: string;
  style?: CSSProperties;
  onSelect?: (event: any) => void;
  [key: string]: any;
}

export interface PassportCardProps {
  pieceName: string;
  era?: string;
  photoSrc?: string;
  photoAlt?: string;
  originName?: string;
  originHeritage?: string;
  weaveSwatchSrc?: string;
  story?: string;
  nachoPhotoSrc?: string;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export interface CuratorCardProps {
  name: string;
  role?: string;
  bio?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  stampVerdict?: string;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export interface RecordCardProps {
  pieceName: string;
  foundLocation?: string;
  fields?: Array<{ label: string; value: string }>;
  closing?: string;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export interface MotifProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

export declare const Button: ComponentType<ButtonProps>;
export declare const Tag: ComponentType<TagProps>;
export declare const InspectionStamp: ComponentType<InspectionStampProps>;
export declare const ProductCard: ComponentType<ProductCardProps>;
export declare const PassportCard: ComponentType<PassportCardProps>;
export declare const CuratorCard: ComponentType<CuratorCardProps>;
export declare const RecordCard: ComponentType<RecordCardProps>;
export declare const MotifStarburst: ComponentType<MotifProps>;
export declare const MotifSparkle: ComponentType<MotifProps>;

export declare const brand: {
  name: string;
  tagline: string;
  location: string;
  version: string;
};
