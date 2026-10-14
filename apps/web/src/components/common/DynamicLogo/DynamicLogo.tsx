import { useId, type CSSProperties, type FC } from 'react';
import { Logo1 } from './Logo1';
import { Logo2 } from './Logo2';
import { Logo3 } from './Logo3';
import './DynamicLogo.scss';

export interface DynamicLogoProps {
  version?: 1 | 2 | 3;
  scale?: number;
  size?: number | string;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

const DEFAULT_LOGO: 1 | 2 | 3 = 3;

const DEFAULT_SCALES: Record<1 | 2 | 3, number> = {
  1: 1,
  2: 1.3,
  3: 1.4,
};

const LOGO_COMPONENTS: Record<
  1 | 2 | 3,
  FC<{ maskId: string; title?: string; style?: CSSProperties; className?: string }>
> = {
  1: Logo1,
  2: Logo2,
  3: Logo3,
};

export const DynamicLogo: FC<DynamicLogoProps> = ({
  version = DEFAULT_LOGO,
  scale,
  size,
  className = '',
  style,
  title = 'co1dsand',
}) => {
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const maskId = `dynamic-logo-${version}-${reactId}`;
  const effectiveScale = scale ?? DEFAULT_SCALES[version];

  const svgStyle: CSSProperties = {
    transform: effectiveScale === 1 ? undefined : `scale(${effectiveScale})`,
    transformOrigin: 'center center',
  };

  const containerStyle: CSSProperties = {
    ...(size !== undefined ? { width: size, height: size } : {}),
    ...style,
  };

  const LogoComponent = LOGO_COMPONENTS[version] ?? Logo3;

  return (
    <span
      className={`dynamic-logo ${className}`.trim()}
      style={containerStyle}
      role="img"
      aria-label={title}
    >
      <LogoComponent maskId={maskId} title={title} style={svgStyle} className="dynamic-logo-svg" />
    </span>
  );
};

export default DynamicLogo;
