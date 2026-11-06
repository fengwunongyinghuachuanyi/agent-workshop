import { AuditHistoryIcon, FolderIcon, LayersIcon, PlusIcon, ScanSearchIcon, SettingsIcon, XIcon } from "@/components/workshop-icons"
import { useCallback, useEffect, useState } from "react"

import { SettingsContext, ShellContext } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { api, type AuditSummary, type ProductSummary, type Settings } from "@/lib/api"
import { auditHref, productHref, useRoute, type Route } from "@/lib/route"
import { cn } from "@/lib/utils"
import { AuditPage, AuditsPage, NewAuditPage } from "@/pages/audits"
import { HomePage } from "@/pages/home"
import { NewProductPage } from "@/pages/new-product"
import { ProductPage } from "@/pages/product"
import { SettingsPage } from "@/pages/settings"

function useSystemDarkMode() {
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)")
    const apply = () => document.documentElement.classList.toggle("dark", media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])
}

const itemClass = (active: boolean) =>
  cn(
    "workshop-nav flex min-h-9 items-center gap-2 rounded-lg px-3 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
    active && "is-active bg-sidebar-accent font-medium text-sidebar-foreground",
  )

function Sidebar({
  route,
  settings,
  products,
  audits,
  onNavigate,
}: {
  route: Route
  settings: Settings | null
  products: ProductSummary[] | null
  audits: AuditSummary[] | null
  onNavigate: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-20 shrink-0 items-center gap-3 px-5">
        <a href="#/" onClick={onNavigate} className="flex items-center gap-3 text-base font-medium" aria-label="Agent 工坊首页">
          <span className="brand-mark"><LayersIcon aria-hidden="true" /></span>
          <span>Agent 工坊<span className="mt-1 block font-mono text-xs font-normal text-muted-foreground">Agent Workshop</span></span>
        </a>
        <Button variant="ghost" size="icon-sm" className="ms-auto md:hidden" onClick={onNavigate} aria-label="关闭菜单">
          <XIcon />
        </Button>
      </div>

      <div className="space-y-1 px-3 pt-2">
        <a href="#/new" onClick={onNavigate} className={cn(itemClass(route.page === "new"), "workshop-create")} aria-current={route.page === "new" ? "page" : undefined}>
          <PlusIcon className="size-4" /> 新建产品
        </a>
        <a href="#/audits/new" onClick={onNavigate} className={itemClass(route.page === "audit-new")}>
          <ScanSearchIcon className="size-4" /> 检查一个项目
        </a>
      </div>

      <nav aria-label="工作区" className="mt-8 min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        <a
          href="#/"
          onClick={onNavigate}
          className={cn(
            "workshop-nav-section mb-2 flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            route.page === "home" && "is-active bg-sidebar-accent text-foreground",
          )}
        >
          <FolderIcon className="size-4" /> 我的产品
          <span className="ms-auto font-mono text-xs">{products?.length ?? "—"}</span>
        </a>
        {products?.length === 0 && <p className="sidebar-empty">新建后，产品会保存在这里</p>}
        {products?.map((p) => (
          <a
            key={p.slug}
            href={productHref(p.slug)}
            onClick={onNavigate}
            className={itemClass(route.page === "product" && route.slug === p.slug)}
            title={p.name}
          >
            <span className="min-w-0 flex-1 truncate">{p.name}</span>
            {p.has_plan && p.unknowns > 0 && (
              <span className="font-mono text-xs font-normal text-ask" title={`${p.unknowns} 个待确认问题`}>{p.unknowns}</span>
            )}
          </a>
        ))}

        <a
          href="#/audits"
          onClick={onNavigate}
          className={cn(
            "workshop-nav-section mt-6 mb-2 flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            route.page === "audits" && "is-active bg-sidebar-accent text-foreground",
          )}
        >
          <AuditHistoryIcon className="size-4" /> 检查过的项目
          <span className="ms-auto font-mono text-xs">{audits?.length ?? "—"}</span>
        </a>
        {audits?.length === 0 && <p className="sidebar-empty">项目检查记录会显示在这里</p>}
        {audits?.map((a) => (
          <a
            key={a.slug}
            href={auditHref(a.slug)}
            onClick={onNavigate}
            className={itemClass(route.page === "audit" && route.slug === a.slug)}
            title={a.root}
          >
            <span className="min-w-0 flex-1 truncate">{a.name}</span>
            {a.completion != null && (
              <span className="font-mono text-xs font-normal text-muted-foreground" title="必选组件信号覆盖率">
                {Math.round(a.completion * 100)}%
              </span>
            )}
          </a>
        ))}
      </nav>

      <div className="border-t px-3 py-4">
        <a href="#/settings" onClick={onNavigate} className={cn(itemClass(route.page === "settings"), "h-auto gap-3 py-3")}>
          <SettingsIcon className="size-4 shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block">模型设置</span>
            {settings && (
              <span className="mt-1 flex items-center gap-2 truncate font-mono text-xs font-normal text-muted-foreground">
                <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", settings.mock ? "bg-warn" : settings.configured ? "bg-ok" : "bg-muted-foreground")} />
                {settings.mock ? "离线演示" : settings.configured ? settings.model || "已配置模型" : "未配置模型"}
              </span>
            )}
          </span>
        </a>
      </div>
    </div>
  )
}

export default function App() {
  useSystemDarkMode()
  const route = useRoute()
  const [settings, setSettings] = useState<Settings | null>(null)
  const [products, setProducts] = useState<ProductSummary[] | null>(null)
  const [audits, setAudits] = useState<AuditSummary[] | null>(null)
  const [error, setError] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const reload = useCallback(async () => {
    try {
      setSettings(await api.settings())
      setError("")
    } catch (err) {
      setError((err as Error).message)
    }
  }, [])

  const reloadProducts = useCallback(async () => {
    try {
      setProducts((await api.products()).products)
    } catch {
      /* 侧边栏读不到列表不影响当前页面；下次切换页面再试 */
    }
  }, [])

  const reloadAudits = useCallback(async () => {
    try {
      setAudits((await api.audits()).audits)
    } catch {
      /* 同上 */
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  // 新建产品、升版本后都会换页面，换页时顺手刷新侧边栏
  const routeKey = route.page === "product" || route.page === "audit" ? `${route.page}:${route.slug}` : route.page
  useEffect(() => {
    reloadProducts()
    reloadAudits()
  }, [reloadProducts, reloadAudits, routeKey])

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <TooltipProvider>
      <ShellContext.Provider value={{ products, reloadProducts, audits, reloadAudits, openSidebar: () => setSidebarOpen(true) }}>
        <div className="workshop-app flex h-svh overflow-hidden">
          <aside
            className={cn(
              "workshop-sidebar fixed inset-y-0 start-0 z-40 w-64 shrink-0 border-e bg-sidebar transition-transform md:static md:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <Sidebar route={route} settings={settings} products={products} audits={audits} onNavigate={closeSidebar} />
          </aside>
          {sidebarOpen && <div className="fixed inset-0 z-30 bg-foreground/20 md:hidden" onClick={closeSidebar} />}

          <main id="main-content" className="flex min-w-0 flex-1 flex-col">
            {error && <div className="mx-auto mt-10 max-w-xl px-4 text-center text-sm text-destructive">{error}</div>}
            {settings && (
              <SettingsContext.Provider value={{ settings, reload }}>
                {route.page === "home" && <HomePage />}
                {route.page === "new" && <NewProductPage />}
                {route.page === "settings" && <SettingsPage />}
                {route.page === "product" && <ProductPage slug={route.slug} tab={route.tab} />}
                {route.page === "audits" && <AuditsPage />}
                {route.page === "audit-new" && <NewAuditPage />}
                {route.page === "audit" && <AuditPage slug={route.slug} tab={route.tab} />}
              </SettingsContext.Provider>
            )}
          </main>
        </div>
      </ShellContext.Provider>
      <Toaster position="bottom-center" />
    </TooltipProvider>
  )
}
