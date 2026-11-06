# 界面设计与维护

当前版本采用用户确认的黑白灰编辑式风格。参考 career-interview-theta.vercel.app 的排版规律；没有复制参考品牌、正文、图片或脚本。绿色强调已按要求移除。

## 文件分工

- `web/src/index.css`：Tailwind、字体、基础语义变量与通用正文。
- `web/src/workspace.css`：统一工作区样式。前段保留共享控件几何，后段是当前编辑式主题；顺序属于层叠约定。
- `web/src/components/workshop-icons.tsx`：50 个原创语义图形、53 个组件导出（含兼容别名）。
- `web/src/components/assistant-ui/elements/thread.aui.tsx`：对话、消息、输入、发送/停止、分支与历史加载。
- `web/src/components/chat/tool-cards.tsx`：可编辑的需求与迭代确认卡片。
- `web/src/pages/`：首页、新建、方案与版本、项目检查、模型设置。
- `blueprint/web/static/`：构建后供 Python 服务直接提供的页面、字体和资源。

## 视觉规则

纸面为白色，正文接近黑色；深色模式使用对应的中性底色。背景为低对比的 64px 网格，侧栏保持纯色。主操作与当前导航使用黑白反差，说明文字与分隔线使用灰阶。错误和警告保留明确文字与必要的语义色。

导航取消悬浮大圆角与蓝色渐变。开场标题桌面最大约 60px，手机使用独立字号；实际聊天正文保持可读大小。输入框的焦点由外框表现，避免重复内边框。卡片用于可编辑草稿和产物，不把所有内容都堆成卡片。

图标采用 24px 坐标、1.7px 圆角笔画；装饰 SVG 隐藏于无障碍树，操作名由按钮或链接提供。保留短暂操作反馈；减少动态效果规则位于主题文件中。

## 继续开发

修改主题后运行 `npm --prefix web run build` 和 `npm --prefix web run lint`。构建会同步更新 Python 静态资源，源码和产物应一起交付。前端行为继续使用原有 Base UI 与 assistant-ui，不用纯静态页面替代。

普通用户直接运行 Python 服务，无需 Node。源码开发建议 Node 22.12+、npm；锁文件位于 `web/package-lock.json`。开发时运行 Python 服务于 8765，再在 `web/` 中运行 `npm run dev`；接口代理已配置。
