import { useState } from "react"

import { Callout, Screen, ScrollBody, TopBar, useSettings } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

export function SettingsPage() {
  const { settings, reload } = useSettings()
  const [provider, setProvider] = useState(settings.provider || "deepseek")
  const providerOf = (key: string) => settings.providers.find((p) => p.key === key)!
  const [model, setModel] = useState(
    settings.provider && settings.model ? settings.model : providerOf(provider).model,
  )
  const [key, setKey] = useState("")
  const [baseUrl, setBaseUrl] = useState(settings.base_url || "")
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const choose = (k: string) => {
    setProvider(k)
    setModel(providerOf(k).model)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    try {
      const res = await api.saveSettings({ provider, api_key: key, model, base_url: baseUrl })
      setMsg({
        ok: res.ok,
        text: res.ok ? `${res.message}，已保存到本机。` : res.message,
      })
      if (res.ok) {
        setKey("")
        await reload()
      }
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message })
    }
    setBusy(false)
  }

  const current = providerOf(provider)
  // 已保存的 Key 只在接口格式相同时沿用：换成另一种格式要重新粘贴
  const saved = settings.provider ? providerOf(settings.provider) : undefined
  const keyReusable = Boolean(settings.key_masked) && saved?.format === current.format

  return (
    <Screen>
      <TopBar title="模型设置" />
      <ScrollBody className="max-w-2xl">
        <div className="workshop-page-heading"><p className="workshop-kicker"><span /> 工坊设置</p><h1>连接你的模型</h1><p>为需求对话与方案推导选择模型服务</p></div>
        <p className="mb-6 text-sm text-muted-foreground">
          引擎靠大模型对话和推导方案。一份方案约 5–7 次调用、2.5–4 万 tokens；每次推导最多 40 次调用、150 万 tokens，超了会自动停下，不会无限扣费。
        </p>
        {settings.mock && (
          <Callout tone="warn" title="离线演示模式">
            当前不调用模型。这里保存的配置会写进本机 .env，下次正常启动时生效。
          </Callout>
        )}

        <form onSubmit={submit} className="workshop-settings-form space-y-8">
          <section>
            <div className="mb-3 text-sm font-medium">模型服务商</div>
            <div className="grid gap-2 sm:grid-cols-3">
              {settings.providers.map((p) => (
                <button
                  type="button"
                  key={p.key}
                  onClick={() => choose(p.key)}
                  aria-pressed={provider === p.key}
                  className={cn(
                    "workshop-provider rounded-lg border px-4 py-4 text-left text-sm transition-colors",
                    provider === p.key ? "is-selected border-foreground bg-card" : "hover:bg-muted/60",
                  )}
                >
                  <div className="flex items-center justify-between gap-2 font-medium">{p.name}<span className="workshop-radio-dot" aria-hidden="true" /></div>
                  <div className="mt-0.5 font-mono text-xs text-muted-foreground">{p.model}</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="mb-2 block text-sm font-medium" htmlFor="key">API Key</label>
            <Input
              id="key"
              type="password"
              autoComplete="off"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={keyReusable ? `已保存（${settings.key_masked}），不改就留空` : "把 API Key 粘贴到这里"}
              className="h-9"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {current.key_page ? (
                <>
                  去这里申请：
                  <a className="text-link hover:underline" href={current.key_page} target="_blank" rel="noopener">
                    {current.key_page}
                  </a>
                  。
                </>
              ) : (
                "Key 和接口地址向你用的中转服务商要。"
              )}
              Key 保存在本机 .env 文件中，仅用于向你选择的模型服务发起请求，不会提交到项目仓库。
            </p>
            {current.key === "openai" && (
              <p className="mt-1 text-xs text-muted-foreground">
                OpenAI 官方接口在国内一般连不上；用中转的，选「OpenAI 格式的中转或其他服务」。
              </p>
            )}
          </section>

          {current.custom_base && (
            <section>
              <label className="mb-2 block text-sm font-medium" htmlFor="base">接口地址</label>
              <Input
                id="base"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://你的中转地址/v1"
                className="h-9 font-mono"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                填到 /v1 为止，引擎会自己接上 /chat/completions。DeepSeek、Kimi 的 OpenAI 格式地址也可以填在这里。
              </p>
            </section>
          )}

          <section>
            <label className="mb-2 block text-sm font-medium" htmlFor="model">模型名</label>
            <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} className="h-9 font-mono" />
            <p className="mt-2 text-xs text-muted-foreground">一般用默认的就行。</p>
          </section>

          <div className="flex flex-wrap items-center gap-3 border-t pt-5">
            <Button type="submit" disabled={busy}>
              {busy ? "正在测试连接…" : "测试连接并保存"}
            </Button>
            {msg && <span className={cn("text-sm", msg.ok ? "text-ok" : "text-destructive")}>{msg.text}</span>}
          </div>
        </form>
      </ScrollBody>
    </Screen>
  )
}
