<div align="center">

<img src="docs/images/project-mark.svg" width="88" alt="Agent 工坊" />

# Agent 工坊 · Agent Workshop

**把一个 Agent 点子，推进为可确认的需求、架构方案和开发交接包。**

[![Test](https://github.com/fengwunongyinghuachuanyi/agent-workshop/actions/workflows/test.yml/badge.svg)](https://github.com/fengwunongyinghuachuanyi/agent-workshop/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/downloads/)

项目维护与版本定制：[**fengwunongyinghuachuanyi**](https://github.com/fengwunongyinghuachuanyi)

[快速开始](#快速开始) · [能做什么](#能做什么) · [使用引导](使用引导.md) · [架构方法](BLUEPRINT.md) · [问题反馈](https://github.com/fengwunongyinghuachuanyi/agent-workshop/issues)

</div>

## 为什么做这个工具

有一个 Agent 点子，接下来往往不知道要补哪些需求、选哪些机制、怎样交给编程工具实现。

Agent 工坊把这个过程组织成一条可以持续迭代的路径：

```text
一句话想法 → 需求追问 → PRD → 架构与组件选型 → 回答待确认问题
                                      ↓
                              导出开发交接包
                                      ↓
                       编程工具实现代码 → 检查 → 新一轮迭代
```

它在你的电脑上运行，可以通过网页使用，也可以配合能够读取本地文件的编程助手使用。本仓库是独立运行版本。

## 能做什么

| 你要完成的事 | 工坊提供什么 |
|---|---|
| 把一个想法说清楚 | 对话式需求追问、需求草稿和待确认问题 |
| 选择 Agent 需要的机制 | 从 17 个 Harness 组件中进行规则选型，并列出理由 |
| 形成可开发的方案 | 七层架构、工具清单、系统提示词、上下文策略和测试设计 |
| 观察预期交互 | 根据方案进行模拟试玩，记录需要调整的地方 |
| 交给编程工具开发 | 导出需求、方案、组件参考和开发提示词 |
| 检查已有项目 | 只读检查源码，产出带证据的差距报告 |
| 持续修改产品 | PRD 版本记录、方案重推和迭代记录 |

## 快速开始

需要 Python 3.10 或更新版本，以及可用的模型 API。macOS 和 Linux 是主要使用环境；Windows 建议使用 WSL。

```bash
git clone https://github.com/fengwunongyinghuachuanyi/agent-workshop.git
cd agent-workshop
bash setup.sh
.venv/bin/python -m blueprint ui
```

网页会在本机地址打开。进入「模型设置」，选择服务商、填写自己的 API Key 和模型名，点击「测试连接并保存」，成功后开始新建产品。

**macOS 双击启动**：完成下载后，也可以双击 `启动界面.command`；使用终端问答则双击 `启动引擎.command`。运行期间保留启动窗口，结束时关闭即可。

如需手动配置，复制 `.env.example` 为 `.env`，按模板填写模型接口。支持 Anthropic Messages 和 OpenAI 兼容 Chat Completions；模型是否支持工具调用，以实际连接和功能测试为准。

**API Key 由使用者自行提供。** 仓库不提供共享密钥或免费模型服务。引擎会将需求或所检查的代码内容发送给你配置的模型服务。真实模型调用可能产生费用。

### 使用网页

1. 选择「新建产品」，说出你的想法。
2. 回答追问，确认需求草稿。
3. 查看方案，补充待确认问题。
4. 用「试玩」观察预期交互；这里的业务操作是模拟的。
5. 导出交接包，交给编程工具或开发者实现。
6. 有新需求时，通过「加新需求」继续迭代。

### 配合编程工具

把下面这段话交给能够读写本地文件的编程工具，替换项目路径、产品名称和想法：

```text
工坊目录：/你的路径/agent-workshop
先读《使用引导.md》，按产品循环工作。
产品名：我的待办助手
我的想法：用自然语言记录待办，时间不明确时先追问。
先建立工作区、生成方案并列出待确认问题。
需求确认后，再把代码写进 out/我的待办助手/skeleton/。
```

### 命令行

```bash
.venv/bin/python -m blueprint init "我的待办助手" "用自然语言管理待办" --plan
.venv/bin/python -m blueprint verify out/我的待办助手
.venv/bin/python -m blueprint revise out/我的待办助手 "增加每周回顾"
.venv/bin/python -m blueprint handoff out/我的待办助手

# 只读检查一个已有项目
.venv/bin/python -m blueprint audit /你的项目路径 -o out/项目检查
```

未配置 API 时，可以让当前编程助手按《使用引导.md》分析，并明确注明没有运行模型管线。`--mock` 是流程演示，不能当作真实分析结果。

## 产物在哪里

```text
out/<产品名>/
├── PRD.md               当前需求
├── prd/                 历史需求版本
├── 方案.md、plan.json    架构方案与选型
├── skeleton/            编程工具实现的产品代码
├── verify/              检查报告
└── 迭代记录.md           每一轮需求与选型变化
```

API 配置、本地运行数据和产品产物不纳入 Git 提交。

## 能力边界

- 工坊负责需求推导、方案、参考组件、交接和静态检查；产品代码由编程工具或开发者实现。
- 「试玩」模拟产品交互，不等于已经接通真实业务系统。
- 代码检查没有运行被检查的项目；报告不能代替真实功能、权限和稳定性测试。
- 组件目录中的参考实现不等于你的产品已集成该能力。
- 部署上线和上线后的持续运行需要另外完成。

## 开发与验证

```bash
.venv/bin/python -m pytest -q
.venv/bin/python -m blueprint eval

# 修改网页源码后，重新构建 Python 服务使用的静态资源
cd web
npm ci
npm run build
```

网页源码位于 `web/`，运行产物位于 `blueprint/web/static/`。CI 会运行 Python 测试、离线评估和网页构建一致性检查。源码使用者运行已提交的网页产物时，不需要安装 Node.js。

## 文档

- [使用引导](使用引导.md)：任务入口、产品循环与编程工具约定。
- [架构蓝图](BLUEPRINT.md)：五步推导方法与 17 个组件的选型依据。
- [入门指南](docs/beginner-guide.md)：如何把模糊想法说清楚。
- [方案和检查示例](docs/examples/README.md)：阅读输出结构与能力边界。
- [维护手册](docs/维护手册.md)：模型、规则、提示词和评估方法。
- [版本说明](docs/DISTRIBUTION.md)：本发行版范围与变更。
- [贡献指南](CONTRIBUTING.md)：问题反馈和提交方式。

## 维护与许可

由 [fengwunongyinghuachuanyi](https://github.com/fengwunongyinghuachuanyi) 维护本发行版，反馈与讨论请使用本仓库 [Issues](https://github.com/fengwunongyinghuachuanyi/agent-workshop/issues)。代码遵循 [MIT 许可证](LICENSE)，随附的版权与许可声明继续适用。
