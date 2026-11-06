/* oxlint-disable react/only-export-components -- Every export is an SVG component produced by this local icon factory. */
import { forwardRef, type ReactNode, type SVGProps } from "react"

/** Agent Workshop's native SVG set: a shared 24px grid, rounded 1.7px outlines
 * and a quiet interior tint. Original drawings; no third-party icon assets.
 * Every icon is decorative by default: the surrounding control owns its name.
 */
export type WorkshopIconProps = SVGProps<SVGSVGElement> & { size?: number | string }

function icon(name: string, drawing: ReactNode) {
  const Icon = forwardRef<SVGSVGElement, WorkshopIconProps>(function WorkshopIcon(
    { size = 24, className, children, ...props }, ref,
  ) {
    return (
      <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width={size} height={size}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"
        data-workshop-icon={name} className={`workshop-icon ${className ?? ""}`} {...props}>
        {drawing}{children}
      </svg>
    )
  })
  Icon.displayName = `${name}Icon`
  return Icon
}

const tint = { fill: "currentColor", fillOpacity: .11, stroke: "none", "data-icon-fill": "" } as const
const documentShape = <><path {...tint} d="M6 3.5h8l4 4v13H6z" /><path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z" /><path d="M14 3.5v5h5" /></>
const folderShape = <><path {...tint} d="M3 6h6l2 2h10v11H3z" /><path d="M3 10V6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>
const check = <path d="m7.5 12 3 3 6-6" />
const cross = <path d="m8.5 8.5 7 7m0-7-7 7" />
const circle = <><circle {...tint} cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="8.5" /></>

export const LayersIcon = icon("workshop", <>
  <rect {...tint} x="3" y="4" width="18" height="16" rx="3" />
  <rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M9 9v11" />
  <path d="m12.5 12 2 2-2 2m4-4v4M6 6.5h.01M9 6.5h.01" />
</>)
export const FolderIcon = icon("products", <>
  <rect {...tint} x="3.5" y="7.5" width="13" height="13" rx="2.5" />
  <rect x="3.5" y="7.5" width="13" height="13" rx="2.5" /><path d="M7.5 7.5v-2a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M7 12h6M7 16h4" />
</>)
export const FileTextIcon = icon("requirements", <>{documentShape}<path d="M8.5 12h7M8.5 15.5h5" /></>)
export const FileText = FileTextIcon
export const FileIcon = icon("file", documentShape)
export const WorkflowIcon = icon("architecture", <>
  <rect {...tint} x="3" y="3.5" width="8" height="6" rx="2" />
  <rect {...tint} x="13" y="14.5" width="8" height="6" rx="2" />
  <rect x="3" y="3.5" width="8" height="6" rx="2" /><rect x="13" y="14.5" width="8" height="6" rx="2" />
  <path d="M7 9.5v6a2 2 0 0 0 2 2h4M11 6.5h6a2 2 0 0 1 2 2v2.5" /><circle cx="19" cy="11" r=".8" fill="currentColor" stroke="none" />
</>)
export const PackageIcon = icon("handoff", <>
  <path {...tint} d="m4 7 8-4 8 4v11l-8 4-8-4z" />
  <path d="m12 21-7-3.5a2 2 0 0 1-1-1.7V8.2a2 2 0 0 1 1-1.7l6-3a2 2 0 0 1 2 0l6 3a2 2 0 0 1 1 1.7V11M4.5 7.5 12 11l7.5-3.5M12 11v10M8 5.5l8 4" />
  <path d="M16 17h6m-2.5-2.5L22 17l-2.5 2.5" />
</>)
export const ScanSearchIcon = icon("inspect", <>
  <rect {...tint} x="3" y="3" width="12" height="16" rx="2" />
  <path d="M10 20H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l4 4v3M13 3v4h4M6.5 9h4M6.5 12h2" />
  <circle cx="16" cy="15.5" r="4" /><path d="m19 18.5 2.5 2.5M14.5 15.5h3" />
</>)
export const AuditHistoryIcon = icon("audit-history", <>
  <rect {...tint} x="4" y="5" width="14" height="15" rx="2.5" />
  <path d="M11 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M8 3v3M14 3v3M7.5 10h6" />
  <circle cx="17" cy="17" r="4.5" /><path d="M17 14.5V17l1.5 1" />
</>)
export const SettingsIcon = icon("settings", <>
  <path {...tint} d="m12 3 3 2 3 .5.5 3 2 3-2 3-.5 3-3 .5-3 2-3-2-3-.5-.5-3-2-3 2-3 .5-3 3-.5z" />
  <path d="m14 3 .6 2.3 2.4 1 2.1-.5 2 3.4-1.7 1.7v2.2l1.7 1.7-2 3.4-2.1-.5-2.4 1L14 21h-4l-.6-2.3-2.4-1-2.1.5-2-3.4 1.7-1.7v-2.2L2.9 9.2l2-3.4 2.1.5 2.4-1L10 3z" />
  <circle cx="12" cy="12" r="3" />
</>)
export const PlusIcon = icon("create", <><rect {...tint} x="3.5" y="3.5" width="17" height="17" rx="5" /><path d="M12 6.5v11M6.5 12h11" /></>)
export const MenuIcon = icon("menu", <><path d="M4 6h16M4 12h12M4 18h16" /><circle cx="20" cy="12" r=".8" fill="currentColor" stroke="none" /></>)
export const XIcon = icon("close", <path d="m6.5 6.5 11 11m0-11-11 11" />)
export const ArrowRightIcon = icon("arrow-right", <path d="M4 12h15m-5-5 5 5-5 5" />)
export const ArrowUpIcon = icon("send", <path d="M12 20V4m-5 5 5-5 5 5" />)
export const ArrowDownIcon = icon("arrow-down", <path d="M12 4v16m-5-5 5 5 5-5" />)
export const ChevronDownIcon = icon("chevron-down", <path d="m6.5 9 5.5 5.5L17.5 9" />)
export const ChevronLeftIcon = icon("chevron-left", <path d="m14.5 6.5-5.5 5.5 5.5 5.5" />)
export const ChevronRightIcon = icon("chevron-right", <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />)
export const DownloadIcon = icon("download", <>
  <path {...tint} d="M4 14h16v6H4z" /><path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4M12 3v12m-4-4 4 4 4-4" />
</>)
export const CopyIcon = icon("copy", <>
  <rect {...tint} x="8" y="8" width="12" height="13" rx="2.5" /><rect x="8" y="8" width="12" height="13" rx="2.5" />
  <path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8" />
</>)
export const FolderOpenIcon = icon("folder-open", <>
  <path {...tint} d="M2.5 10.5H21L18.5 20H4z" /><path d="M3 10V6a2 2 0 0 1 2-2h4l2 3h7a2 2 0 0 1 2 2v1.5M4 20h13a2 2 0 0 0 2-1.5l2-7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 .7L2.5 18A1.5 1.5 0 0 0 4 20Z" />
</>)
export const FolderSearchIcon = icon("folder-search", <>{folderShape}<circle cx="11" cy="13" r="3" /><path d="m13.5 15.5 2 2" /></>)
export const RefreshCwIcon = icon("refresh", <><path d="M20 9a8 8 0 0 0-14-3L3 9m0-5v5h5M4 15a8 8 0 0 0 14 3l3-3m0 5v-5h-5" /></>)
export const RotateCcwIcon = icon("restart", <><path d="M4 9a8 8 0 1 1 0 7M4 4v5h5" /><path {...tint} d="M12 5a7 7 0 1 1-6 10h6z" /></>)
export const ScaleIcon = icon("rejudge", <>
  <path {...tint} d="M2.5 13.5h7a3.5 3.5 0 0 1-7 0m12 0h7a3.5 3.5 0 0 1-7 0" />
  <path d="M12 3v18M8 21h8M5 6h14M5 6l-3 7h6zM19 6l-3 7h6z" />
</>)
export const CheckIcon = icon("check", <path d="m5 12 4.5 4.5L19 7" />)
export const CircleCheckIcon = icon("success", <>{circle}{check}</>)
export const XCircleIcon = icon("error", <>{circle}{cross}</>)
export const CircleMinusIcon = icon("skipped", <>{circle}<path d="M8 12h8" /></>)
export const InfoIcon = icon("info", <>{circle}<path d="M12 11v5M12 7.5h.01" /></>)
export const AlertCircleIcon = icon("attention", <>{circle}<path d="M12 7v6M12 16.5h.01" /></>)
export const OctagonXIcon = icon("blocked", <>
  <path {...tint} d="M8 3h8l5 5v8l-5 5H8l-5-5V8z" /><path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z" />{cross}
</>)
export const TriangleAlertIcon = icon("warning", <>
  <path {...tint} d="m12 3 10 18H2z" /><path d="M10.3 4.2 2.7 17.5A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.5L13.7 4.2a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4.5M12 17h.01" />
</>)
export const ShieldAlertIcon = icon("permission", <>
  <path {...tint} d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6z" /><path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6zM12 8v5M12 16.5h.01" />
</>)
export const HandIcon = icon("approval", <>
  <path {...tint} d="M7 12V6h10v5h4v4l-5 6H9l-6-8 2-2z" /><path d="M8 12V5a1.5 1.5 0 0 1 3 0v6-8a1.5 1.5 0 0 1 3 0v8-6a1.5 1.5 0 0 1 3 0v7-3a1.5 1.5 0 0 1 3 0v6a6 6 0 0 1-6 6h-2a6 6 0 0 1-4.8-2.4L3 13a1.5 1.5 0 0 1 2.4-1.8L8 14" />
</>)
export const WrenchIcon = icon("tool", <>
  <path {...tint} d="m8 12 5-5 4 4-5 5-4 5-5-3z" /><path d="M13 4a5 5 0 0 0-5 6L3.7 15.3a3.5 3.5 0 0 0 5 5L14 15a5 5 0 0 0 6-6l-4 3-4-4 3-4z" />
</>)
export const LoaderCircleIcon = icon("loading", <><circle cx="12" cy="12" r="8" opacity=".18" /><path d="M12 4a8 8 0 0 1 8 8" /></>)
export const Loader2Icon = LoaderCircleIcon
export const LoaderIcon = LoaderCircleIcon
export const BrainIcon = icon("reasoning", <>
  <path {...tint} d="M12 4c-6-4-10 4-7 7-5 5 2 12 7 8 5 4 12-3 7-8 3-3-1-11-7-7" />
  <path d="M12 5a3 3 0 0 0-6-.5 4 4 0 0 0-2 7 4 4 0 0 0 3 7 3 3 0 0 0 5 .5M12 5a3 3 0 0 1 6-.5 4 4 0 0 1 2 7 4 4 0 0 1-3 7 3 3 0 0 1-5 .5V5M7 8l2 2M17 8l-2 2M7 15l2-2M17 15l-2-2" />
</>)
export const BracesIcon = icon("code", <><path d="M8 3H6a2 2 0 0 0-2 2v4l-2 3 2 3v4a2 2 0 0 0 2 2h2M16 3h2a2 2 0 0 1 2 2v4l2 3-2 3v4a2 2 0 0 1-2 2h-2" /><path d="m13 8-2 8" opacity=".45" /></>)
export const ImageIcon = icon("image", <>
  <rect {...tint} x="3" y="3" width="18" height="18" rx="3" /><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8" cy="8" r="1.5" /><path d="m3 16 5-4 4 4 4-5 5 6" />
</>)
export const ImageOffIcon = icon("image-unavailable", <><path d="M10 3h8a3 3 0 0 1 3 3v8M21 21H6a3 3 0 0 1-3-3V6M3 3l18 18M4 17l4-4 4 4M15 9h.01" /></>)
export const MusicIcon = icon("audio-file", <>
  <path {...tint} d="m9 5 12-2v5L9 10z" /><path d="M9 17V5l12-2v12M9 9l12-2" /><ellipse cx="5.5" cy="18" rx="3.5" ry="3" /><ellipse cx="17.5" cy="16" rx="3.5" ry="3" />
</>)
export const VideoIcon = icon("video", <><rect {...tint} x="3" y="6" width="12" height="12" rx="3" /><rect x="3" y="6" width="12" height="12" rx="3" /><path d="m15 10 6-3v10l-6-3" /></>)
export const MicIcon = icon("microphone", <><rect {...tint} x="9" y="3" width="6" height="12" rx="3" /><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" /></>)
export const PhoneIcon = icon("phone", <><path {...tint} d="M6 3 3 6c0 8 7 15 15 15l3-3-5-4-3 2-5-5 2-3z" /><path d="m6 3 4 5-2 3a13 13 0 0 0 5 5l3-2 5 4-3 3C10 21 3 14 3 6z" /></>)
export const AudioLinesIcon = icon("voice", <><path d="M3 10v4M7.5 6v12M12 3v18M16.5 7v10M21 10v4" /></>)
export const PlayIcon = icon("play", <><path {...tint} d="m7 4 13 8-13 8z" /><path d="m7 4 13 8-13 8z" /></>)
export const PauseIcon = icon("pause", <><rect {...tint} x="5" y="4" width="5" height="16" rx="1.5" /><rect {...tint} x="14" y="4" width="5" height="16" rx="1.5" /><rect x="5" y="4" width="5" height="16" rx="1.5" /><rect x="14" y="4" width="5" height="16" rx="1.5" /></>)
export const SquareIcon = icon("stop", <><rect {...tint} x="5" y="5" width="14" height="14" rx="3" /><rect x="5" y="5" width="14" height="14" rx="3" /></>)
export const PencilIcon = icon("edit", <><path {...tint} d="m14 5 5 5L9 20l-6 1 1-6z" /><path d="m14 5 5 5M3 21l1-6L17 2a2 2 0 0 1 3 0l2 2a2 2 0 0 1 0 3L9 20z" /></>)
