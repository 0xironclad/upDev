import { AppFrame } from "@/components/hq/app-frame"

/** Layout for all authenticated HQ pages — wraps them in the app shell. */
export default function HqLayout({ children }: { children: React.ReactNode }) {
  return <AppFrame>{children}</AppFrame>
}
