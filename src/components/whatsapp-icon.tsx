import type { SVGProps } from "react";

export function WhatsAppIcon({
  size = 22,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M20.7 11.65a8.7 8.7 0 0 1-12.95 7.57L3 20.7l1.47-4.6a8.7 8.7 0 1 1 16.23-4.45Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 6.95c-.22-.5-.46-.5-.67-.51h-.57c-.2 0-.52.08-.8.39-.28.3-1.06 1.04-1.06 2.53 0 1.5 1.09 2.94 1.24 3.14.15.2 2.14 3.27 5.19 4.58.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.79-.73 2.04-1.44.26-.7.26-1.31.18-1.44-.08-.13-.28-.2-.59-.36l-2.13-1c-.29-.11-.5-.16-.7.15-.2.3-.79 1-.97 1.2-.18.2-.36.23-.67.08-.3-.16-1.3-.48-2.48-1.54-.92-.82-1.54-1.84-1.72-2.14-.18-.31-.02-.47.13-.63.14-.14.31-.36.47-.54.15-.18.2-.3.3-.51.1-.2.05-.39-.02-.54l-.98-2.18Z"
        fill="currentColor"
        transform="translate(2.1 1.6) scale(.77)"
      />
    </svg>
  );
}
