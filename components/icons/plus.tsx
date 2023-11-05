import type { SVGProps } from "react"

export default function Plus({
  width,
  height
}: Pick<SVGProps<SVGSVGElement>, "width" | "height">) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 5.75V18.25"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18.25 12L5.75 12"></path>
    </svg>
  )
}
