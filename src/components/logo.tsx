import type { ComponentProps } from 'react';

/**
 * Attic logo mark.
 * Uses flat fills compatible with SVG renderers including Satori (`next/og`).
 */
export function Logo({ width = 56, height = 56, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="48" height="48" rx="12" fill="#22262F" />
      <path
        d="M18.3429 18.9107L29.4775 12.4821L22.7968 8.625L11.6624 15.0535L11.6621 27.9105L18.3429 31.7676L18.3429 18.9107Z"
        fill="#FFFFFF"
        fillOpacity="0.75"
      />
      <path
        d="M36.335 19.3396L36.335 32.1967L25.2003 38.625L18.5195 34.7679L29.6541 28.3393L29.6542 15.4824L36.335 19.3396Z"
        fill="#FFFFFF"
        fillOpacity="0.55"
      />
    </svg>
  );
}

export const LogoMark = Logo;
export default Logo;
