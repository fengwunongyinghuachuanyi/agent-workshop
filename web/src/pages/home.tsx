import { ArrowRightIcon, FileTextIcon, PackageIcon, PlusIcon, WorkflowIcon } from "@/components/workshop-icons"

import { Chip, ModeCallouts, Screen, ScrollBody, TopBar, timeAgo, useShell } from "@/components/common"
import { Button } from "@/components/ui/button"
import { productHref } from "@/lib/route"

const STEPS = [
  ["说出想法", "从给谁用、怎么用、什么不能做开始，把想法整理成需求。"],
  ["推导 Agent 方案", "拆解需求，选择组件，形成架构、提示词和测试设计。"],
  ["回答问题，再迭代", "逐一确认方案中的未知项，再导出交接包，交给编程工具开发。"],
]

const OUTPUTS = [
  { icon: FileTextIcon, name: "需求文档", file: "PRD.md", desc: "用户、场景与边界", stage: "01" },
  { icon: WorkflowIcon, name: "架构方案", file: "方案.md", desc: "组件选型与实现路径", stage: "02" },
  { icon: PackageIcon, name: "开发交接包", file: "需求 + 方案 + 参考组件", desc: "交给编程工具继续实现", stage: "03" },
]

export function HomePage() {
  const { products } = useShell()
  if (!products) return <Screen><TopBar title="我的产品" /></Screen>

  if (!products.length) {
    return (
      <Screen>
        <TopBar title="我的产品" />
        <ScrollBody className="workshop-home">
          <ModeCallouts />
          <div className="workshop-intro">
            <section className="workshop-intro-copy">
              <p className="workshop-kicker"><span /> 从想法到开发交接</p>
              <h1>把一个想法，<br />推进成 <mark>Agent 方案</mark></h1>
              <p className="workshop-lead">像聊天一样说清楚你想做什么。工坊帮你整理需求、推导架构，再把待确认的问题一项项说清楚。</p>
              <ol className="workshop-steps">
                {STEPS.map(([title, desc], i) => (
                  <li key={title}>
                    <span className="workshop-step-number">0{i + 1}</span>
                    <div><h2>{title}</h2><p>{desc}</p></div>
                  </li>
                ))}
              </ol>
              <Button size="lg" nativeButton={false} render={<a href="#/new" />}>
                开始一个新产品 <ArrowRightIcon />
              </Button>
              <p className="workshop-start-note">从一句话开始，逐步补全需求</p>
            </section>
            <aside className="workshop-output" aria-label="工坊交付的三类产物">
              <div className="workshop-output-header"><span>方案工作台</span><span className="font-mono">01 — 03</span></div>
              <div className="workshop-output-body">
                <p className="text-xs text-muted-foreground">每一轮对话，留下可继续推进的产物</p>
                {OUTPUTS.map(({ icon: Icon, name, file, desc, stage }) => (
                  <div className="workshop-output-row" key={name}>
                    <div className="workshop-output-icon"><Icon aria-hidden="true" /></div>
                    <div className="min-w-0 flex-1"><h3>{name}</h3><p>{desc}</p><span className="workshop-output-file">{file}</span></div>
                    <span className="font-mono text-xs text-muted-foreground">{stage}</span>
                  </div>
                ))}
              </div>
              <div className="workshop-output-footer"><span className="workshop-document-line" /><p>需求确认后，交给编程工具实现<br /><span>工坊负责推导，代码由你继续推进</span></p></div>
            </aside>
          </div>
        </ScrollBody>
      </Screen>
    )
  }

  return (
    <Screen>
      <TopBar title={<>我的产品 <span className="font-mono text-xs font-normal text-muted-foreground">{products.length}</span></>}
        actions={<Button size="sm" nativeButton={false} render={<a href="#/new" />}><PlusIcon /> 新建产品</Button>} />
      <ScrollBody>
        <ModeCallouts />
        <div className="workshop-page-heading"><p className="workshop-kicker"><span /> 产品工作区</p><h1>继续推进你的 Agent</h1><p>查看方案、确认问题，或从现有版本开始下一轮迭代</p></div>
        <div className="workshop-product-list overflow-hidden rounded-xl border bg-card">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b bg-muted/40 px-5 py-3 text-xs text-muted-foreground sm:grid-cols-[3rem_1fr_10rem_6rem]">
            <span className="hidden sm:block">版本</span><span>产品</span><span className="hidden sm:block">状态</span><span className="text-right">更新</span>
          </div>
          {products.map((p) => (
            <a key={p.slug} href={productHref(p.slug)} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b px-5 py-5 text-sm transition-colors last:border-b-0 hover:bg-muted/50 sm:grid-cols-[3rem_1fr_10rem_6rem]">
              <span className="hidden font-mono text-xs text-muted-foreground sm:block">V{p.version}</span>
              <span className="min-w-0"><span className="block truncate font-medium">{p.name}</span><span className="mt-1 block text-xs text-muted-foreground sm:hidden">{!p.has_plan ? "还没有方案" : p.unknowns ? `${p.unknowns} 个待确认问题` : "方案已生成"}</span></span>
              <span className="hidden sm:block">{!p.has_plan ? <Chip>还没有方案</Chip> : p.unknowns ? <Chip tone="ask">{p.unknowns} 个待确认问题</Chip> : <Chip tone="ok">方案已生成</Chip>}</span>
              <span className="text-right text-xs text-muted-foreground">{timeAgo(p.updated)}</span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">需求文档、方案和迭代记录，保存在每个产品的本地工作区</p>
      </ScrollBody>
    </Screen>
  )
}
