---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.autodoc/README.md
title: ioBroker.autodoc
hash: jmoRTQjUc0jOo2v1G8WdgUEiLsntOD9B9YWSHD4HITU=
---
![标识](../../../en/adapterref/iobroker.autodoc/admin/autodoc.png)

# IoBroker.autodoc
自动为您的 ioBroker 安装生成结构化文档（HTML、Markdown、JSON）——按需、按计划或系统更改时生成。

版本：0.9.46

**安装**

1. 打开 **[ioBroker Admin](https://www.iobroker.net/#en/documentation)** 并从适配器列表中安装 **`iobroker.autodoc`**。
2. 官方适配器索引：**[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)**（**最新版**）。维护者工作流程/PR：**[待办事项 — § 1.1 版本](TODO.md#release-veroeffentlichung)**。

| | |
| --- | --- |
| **存储库** | [github.com/crunchip77/ioBroker.autodoc](https://github.com/crunchip77/ioBroker.autodoc) |
| **问题** | [GitHub Issues](https://github.com/crunchip77/ioBroker.autodoc/issues) |

**CI:** ![测试与发布](https://github.com/crunchip77/ioBroker.autodoc/workflows/Test%20and%20Release/badge.svg)

＃＃ 描述
该适配器会扫描适配器、主机、房间、函数、脚本、别名、用户数据和相关元数据，然后在一次运行中写入**三个配置文件**：

| 简介 | 受众 | 重点 |
| --- | --- | --- |
| **管理员** | 运维人员 | 实例、主机、资源、脚本、维护提示、诊断 |
| **用户** | 家庭 | 房间、设备、自动化（简明语言） |
| **新用户引导** | 访客 | 欢迎、功能介绍、二维码/最新HTML链接 |

导出内容以 `/files/autodoc.<instance>/` 格式编写（最新 HTML + 轮换时间戳的 `.md` / `.html` / `.json`）。可选的通知和**选择加入的 AI** 文本（由不同的提供商提供）可以丰富文档内容。

＃＃ 要求
- **Node.js** ≥ 22（参见 `package.json` → `engines`）
- **ioBroker.js-controller** ≥ 6.0.11（在 `io-package.json` → `common.dependencies` 中声明）
- **ioBroker Admin** ≥ 7.6.20（在 `io-package.json` → `common.globalDependencies` 中声明）——这是 **json** 配置 UI 和 `jsonConfig` 功能（例如 `textSendTo`、可折叠面板）所必需的

AutoDoc 本身**不需要**其他适配器。可选：如果您想从管理文件浏览器之外打开生成的文件，则需要一个**Web 服务器**适配器；导出文件始终位于 `/files/autodoc.<instance>/` 目录下。**PDF** 配置文件需要将可选的 npm 包 **`puppeteer`**（捆绑的 Chromium）安装在适配器目录中——请参阅下方的**可选 PDF 导出**。

＃＃ 配置
### 文档实例概述
在 **ioBroker 管理后台** 中配置实例（包含基础设置、手动注释、高级选项、通知和 AI 等选项卡）。生成过程可以手动触发、在启动时触发、按定时器触发以及在适配器更改后触发（已进行防抖处理）。

**文档语言**（基本设置）决定了**所有 HTML 配置文件**和 Markdown 中的标题和固定措辞。它还控制着用于库存比较的**简短摘要行**（“自上次运行以来的更改”）以及重新生成时的**变更日志**卡片——较早存储的变更日志行将以**当前**导出语言显示，而不是保存时的语言。

在“高级 → 包含内容和限制”中，“隐藏管理导出中的‘自上次运行以来的更改’”选项仅移除“管理”HTML系统章节顶部的黄色增量框以及“管理”Markdown中对应的子章节。“变更日志”章节、“用户”和“新用户引导”导出不受影响。

当 AutoDoc 检测到自上次快照以来至少发生一次库存变更时（首次运行或无变更时跳过），**用户/家庭**配置文件会在标题栏后添加一条简短的日常提示信息。**新用户引导**流程不包含此额外通知。

操作员的简短**入门**（安装路径、选项卡、导出、哈希、检查器）：**[`docs/user-guide/README.md`](docs/user-guide/README.md)** · **德语** 配置 wiki（标签页、屏幕截图、演示场景）：**[`docs/user-guide/README.de.md`](docs/user-guide/README.de.md)**。

有用的**状态**（选择）：`action.generate`；**`action.exportPdf`**（当适配器目录中安装了可选的**`puppeteer`**时，从最新的HTML写入**PDF**配置文件，位于`/files`下——无需完全重新生成）；`info.lastGeneration` / `info.nextGeneration`；`info.htmlUrlAdmin` / `info.htmlUrlUser` / `info.htmlUrlOnboarding`；`info.templateVersion`（HTML模板/渲染器对齐）；`info.forumCardPlain`（论坛的纯文本“系统卡”，在生成文档时更新）。

**导出与存储：**每次成功运行后，**`documentation.exportHashes`** 会保存从 `/files` 获取的最新 MD / JSON / 管理 HTML 的 **SHA-256（十六进制）**，并在 PDF 导出步骤写入 `autodoc-{admin,user,onboarding}.pdf` 时，**合并摘要**。规范的完整 Markdown、JSON 模型和管理 HTML **仅**保存在 **`/files/`** 下（`autodoc-latest.*` 为配置文件 HTML）。状态 **`documentation.markdown`**、**`documentation.html`** 和 **`documentation.json`** 仅保存**简短占位符**——如需全文，请使用 **`info.htmlUrl*`**、**`/files/`** 或下载操作。

### 媒体、Redis 和状态存储（简述）
- **规范导出**始终位于**`/files/autodoc.<instance>/`**下，并且每次运行时都会**覆盖**（不会在那里积累旧的HTML版本）。
- **`documentation.*` 正文状态** 仅为**占位符**（大型有效负载不会在对象数据库中重复存储）。需要**全文**读取**`/files/`**或使用**`info.htmlUrl*`**/下载操作的脚本和集成。
- **照片和大型二进制文件：**请勿将大型图像或二进制数据块作为**大型状态值**存储在 ioBroker 的**对象数据库**中——**尤其是在使用 Redis 时**（二进制有效负载会占用大量内存）。请使用**外部 URL**（例如您的 NAS、HTTP 服务器）或小型**内联 SVG** 图表；同样的原则也能确保 **jsonl** 设置的可预测性。AutoDoc 将**完整的** Markdown/HTML/JSON 文件保存在 **`/files/`** 目录下；**`documentation.markdown`**、**`documentation.html`** 和 **`documentation.json`** 仅作为**简短的占位符**，并非媒体存储。
- 基本原理、选项和未来的媒体工作：[`PLAN.md` — 媒体 (MVP) 和限制](PLAN.md#architektur-medien-mvp) 和 [架构边界](PLAN.md#architektur-grenzen)。

### 公共基本 URL
**引导** HTML 包含一个二维码和一个**复制链接**控件。两者都使用相同的目标：`/files/autodoc.<instance>/autodoc-onboarding.html` 下的引导文件，并以适配器设置中的**ioBroker 基本 URL**作为前缀（**高级**选项卡：*ioBroker 基本 URL（可选）*）。

- 将基本 URL 设置为您在浏览器中访问 ioBroker 时使用的 URL（如果需要，包括协议、主机和端口），**不要**在 URL 末尾添加斜杠。例如：`https://home.example.com:8081`、`http://192.168.1.10:8081`。
- 如果内容为空或错误，访客扫描二维码或使用从其他设备复制的链接时，可能会获得无效或仅限内部访问的 URL。更改后，请重新运行文档生成程序，以便重新构建 HTML 代码。

### 可选的文件系统导出（Docker / NAS）
**文件系统导出路径**会将三个 HTML 配置信息写入一个实际目录（除了 ioBroker 的 `/files/…` 存储之外）。在 **Docker** 中，将主机文件夹映射到容器内，并将 **导出路径** 设置为 **容器端** 路径（而非 Unraid/主机路径）。有关简要说明，请参阅管理界面中的字段帮助。

### 可选的 PDF 导出（Puppeteer）
**尽力而为：**文档运行成功后，您可以从存储在 `/files/` 下的同一 HTML 文件中创建 **`autodoc-admin.pdf`**、**`autodoc-user.pdf`** 和 **`autodoc-onboarding.pdf`**（通过 **`puppeteer`** 实现的无头 Chromium，声明为**可选** npm 依赖项——与 **`@mermaid-js/mermaid-cli`** 位于同一主分支）。在文件系统导出旁边的**高级**设置中启用**每次文档运行后生成 PDF**，或手动触发 **`action.exportPdf`**。PDF 文件写入 **`/files/autodoc.<instance>/`** 目录，并在设置了**文件系统导出路径**后镜像到该路径。**嵌入式 Mermaid SVG**（在生成过程中运行 mmdc 时）无需额外网络即可打印；**jsDelivr** 客户端 Mermaid 在 PDF 步骤中仍然需要网络连接。如果没有可用的 Chromium 堆栈，PDF 创建将被跳过，并显示明确的日志行——HTML/Markdown 生成不受影响。

### AI 上下文提示（访客 vs 住户）
**AI上下文提示**仅注入到LLM提示中；**不会**打印在文档中。对于**访客入职**，建议使用日常事实。复杂的IT或项目术语（例如适配器、存储库等）可能会导致模型将专业术语泄露到访客文本中；**安全步骤**会将该AI代码块替换为中性的访客用语。这是有意为之。**住户/家属**配置文件不采用仅限访客的限制。在管理后台的**KI文档/AI文档**下进行配置（启用提供者后）；完整文本会显示在字段上方的提示中。

复制粘贴**示例**（字段 ID、语法）：[**美人鱼**](#mermaid-cookbook-examples) · [**JSON 数组**](#json-cookbook-snippets) · [**自定义 CSS**](#html-custom-css-examples)。书签/管理页面的**稳定 URL** `staticLink`：**`blob/main/README.md#…`** — GitHub 以**预览**模式打开 Markdown（可读）；片段与下方标题别名匹配（与本地 `#…` 链接名称相同）。GitHub 查看器中的滚动跳转到部分功能**尽力而为**；**仓库根目录** URL（例如 `…/ioBroker.autodoc#json-cookbook-snippets`）仍然不可靠。对 README 文件进行大量编辑后，请**重新检查别名**，并与 **`blob/main`** 进行比较。

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#documentation-instance-overview`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#public-base-url`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#optional-pdf-export-puppeteer`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#mermaid-cookbook-examples`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#json-cookbook-snippets`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#html-custom-css-examples`

<h3 id="mermaid-cookbook-examples">美人鱼食谱示例</h3>

粘贴到**我的文档 → 美人鱼图** (`manualMermaidDiagram`)。在字段内使用**普通换行符**（不要使用 HTML）。建议使用**`flowchart LR`**，以便宽图能够适应 HTML 页面；过大的图表难以阅读——如有需要，请将概念拆分到不同的图表中。

**嵌入式 SVG：**当 **`@mermaid-js/mermaid-cli`** 安装在适配器目录中且生成成功时，图表将以内联 SVG 格式嵌入 HTML 中（适用于离线/PDF）。如果嵌入失败或缺少 CLI，导出时将保留 `<pre class="mermaid">` 代码块，浏览器可能会从 jsDelivr 加载 Mermaid — 请参阅**可选 PDF 导出**和 **`docs/user-guide`**（“可选 Mermaid CLI”）。

极简的从左到右概览：

```text
flowchart LR
  Internet([Internet]) --> Router[Router]
  Router --> ioB(ioBroker host)
  ioB --> Heating[Heating adapters]
  ioB --> Lights[Lights / rooms]
```

小**子图**（分组相关节点）：

```text
flowchart LR
  subgraph LAN["Home LAN"]
    A[js-controller] --> B[javascript.0]
    A --> C[other instances]
  end
```

**尖端**

- 坚持使用你在其他地方看到有效的**受支持的 Mermaid** 构造；特殊的指令可能会破坏 `mmdc`。
- **自动主机拓扑**是独立的（`autoMermaidHostGraph`）；在**管理员/用户**隐藏列表中使用**`mermaidAuto`**将其隐藏（参见`lib/docTemplateConfig.js`中的`EXTRA_HIDDEN_CHAPTER_IDS`）。**手动**Mermaid 拓扑图位于**管理员**的**`manual`**下——如果不想显示，请隐藏该章节。在**用户**中，字段帮助分别列出了**`mermaid`**和**`mermaidAuto`**；在**新手引导**中，欢迎区域的所有者拓扑图使用**`mermaid`**（参见该选项卡的帮助）。

<h3 id="json-cookbook-snippets">JSON cookbook 代码片段</h3>

管理员会将这些字段存储为**字符串**；内容必须是**有效的 JSON**（`"` 键/字符串，末尾无逗号）。空名册表示使用默认值：如果您不想覆盖顺序或隐藏任何内容，请使用**`[]`**。

德语**场景页面**（“隐藏第一个 vs 重新排序”，复制粘贴演练锚定到步骤 6）：**[`README.de.md` — Wiki — 第 6 步](https://github.com/crunchip77/ioBroker.autodoc/blob/main/docs/user-guide/README.de.md#wiki-admin-json-cookbook)** (`docs/user-guide/`)。

**允许的章节 ID** 来自适配器 (`lib/docTemplateConfig.js`):

| 个人资料 | 排序字段 | 隐藏字段 | 备注 |
| --- | --- | --- | --- |
| 管理员 | `adminChapterOrderJson` | `adminHiddenChaptersJson` | 默认顺序：`manual`, `system`, …, `appendices`。额外隐藏 ID：**`mermaidAuto`**（自动托管拓扑）。**手动** Mermaid 图是 **`manual`** 的一部分——完全省略该章节即可将其从管理员导出中移除。 |
| 新手入门 | `onboardingChapterOrderJson` | `onboardingHiddenChaptersJson` | 密钥包括 `welcome`、`quickstart`、`tips`、`guestHelp`、`stats`、`ai`、`capabilities`、`mermaid`、`rooms`、`routines`、`ownerPlaybook`、`automations`、`adapters`、`custom`、`hint`、`system`、`manual`。 |
| 新手引导 | `onboardingChapterOrderJson` | `onboardingHiddenChaptersJson` | 键包括 `welcome`、`quickstart`、`tips`、`guestHelp`、`stats`、`ai`、`capabilities`、`mermaid`、`rooms`、`routines`、`ownerPlaybook`、`automations`、`adapters`、`custom`、`hint`、`system`、`manual`。 |

**重新排序管理** — 将系统概述直接放在手动说明之后：

```json
["manual", "system", "adapters", "rooms", "scripts", "schedule", "userdata", "aliases", "maintenance", "diagnosis", "troubleshooting", "custom", "changelog", "appendices"]
```

**隐藏** 管理员更新日志和附录：

```json
["changelog", "appendices"]
```

**隐藏用户脚本章节：**

```json
["scripts"]
```

**重新排序用户** — 将 **`system`** 排在房间之后（完整密钥列表，否则 ID 与默认顺序相同）：

```json
["manual", "guestHelp", "ai", "atAGlance", "rooms", "system", "scripts", "routines", "ownerPlaybook", "mermaid", "adapters", "custom", "troubleshooting"]
```

**自定义 Markdown 章节** (`customDocSectionsJson`) — 对象数组，包含 **`title`**、**`body`**（或 **`bodyMarkdown`**），以及可选的 **`profiles`**（`"admin"` | `"user"` | `"onboarding"`）。省略 **`profiles`** 可在**所有**配置文件中显示。

```json
[
  {
    "title": "Emergency contacts",
    "body": "## Numbers\n- **Repair:** …\n- **Utility:** …",
    "profiles": ["user", "onboarding"]
  },
  {
    "title": "Operator notes",
    "body": "## Rack layout\nShort **Markdown** only; keep secrets out.",
    "profiles": ["admin"]
  }
]
```

最多 **12** 个部分；过长的体在世代时会被截断。

<h3 id="html-custom-css-examples">HTML 自定义 CSS 示例</h3>

在“管理 → HTML 导出和附加部分”下，**字体堆栈** (`htmlFontStack`) 和 **附加 CSS** (`htmlExtraCss`) 仅调整**导出的 HTML**（而非 Markdown）。渲染器会将页面包裹在 `lib/htmlRenderer.js` (`wrapPage`) 中：侧边栏链接位于 **`nav ul li a`** 下，布局使用 **`#layout`**、**`nav`** 和 **`main`** — 如果需要选择器，请检查生成的 HTML。

**字体堆栈：**一个 CSS `font-family` 列表（已移除风险字符 `< > { }`）。示例粘贴：

```css
"Source Serif 4", Georgia, serif
```

**额外 CSS：** 在内置样式表之后添加简短规则。优先使用**现有调色板标记**（`var(--link)`、`var(--nav-bg)`、`var(--border)`、`var(--surface)`、… 来自 `:root` / `body.dark` 块）；**`htmlThemePreset`** 通过 `html.autodoc-preset-*` 类替换这些标记——`:root` 上没有单独的 `--accent` 标记（某些组件仅将 `var(--accent, #0066cc)` 用作**本地**回退）。

您可以将此初始代码片段粘贴到**额外 CSS** 中：

```css
nav { width: 260px; }
nav ul li a:hover { opacity: 0.92; }
h2 { border-bottom-color: var(--link); }
```

## 功能（概述）
- 跨实例、主机、枚举、脚本、别名、用户数据、系统配置进行发现
每个个人资料均配有独立的 HTML 文件，支持搜索、深色模式和响应式布局
- 支持 Markdown + JSON 导出和版本历史记录（可配置轮换）
- 维护导向提示（未完成清单项目的文档评分；已禁用实例列为库存，不予扣分）
- 多语言管理界面字符串（完整支持英语/德语/法语；更多语言版本在翻译完成前将提供英文副本 — [贡献](CONTRIBUTING.md#admin-ui-translations-i18n)）；生成的文档文本遵循**文档语言**，包括变更日志/对比摘要行以及用户导出中的可选清单变更通知
- 可选的AI提供商（例如Ollama、Groq、Anthropic），需严格选择加入

对于**路线图和规划**：[`TODO.md`](TODO.md)（顶部是未完成的工作，完整的已完成清单在附录中）和[`PLAN.md`](PLAN.md)（愿景、理由、架构头脑风暴）。

**贡献/发布：**请参阅[`CONTRIBUTING.md`](CONTRIBUTING.md)。

## Changelog

**Admin `common.news`** in `io-package.json` lists only versions **published on npm** (Adapter Checker **E2004**). The detailed sections below are the **user-facing** changelog (Git-era releases plus npm); older entries are in [`CHANGELOG_OLD.md`](CHANGELOG_OLD.md).

### 0.9.46 (2026-06-28)

- (mcm1957) `info.summary` state now outputs English text by default
- (mcm1957) Periodic documentation generation switched from `setInterval` to `setTimeout`-at-end — prevents overlapping runs
- (mcm1957) `autoGenerateInterval` code-level minimum clamp of 0.1 h with warning log
- (mcm1957) README: GitHub install instruction removed (E6013)
- (fix) `common.news` 0.9.37 / 0.9.38 / 0.9.44 translated into es, it, nl, pl, pt, ru, uk, zh-cn (E1144)
- (fix) `admin` minimum version bumped to `>=7.8.23`

### 0.9.45 (2026-06-18)

- **ioBroker conformance — object structure:** Added channel parent objects (`action`, `documentation`, `info`, `versioning`) to `instanceObjects` in `io-package.json` — required by ioBroker object checker (E3009) for **ioBroker.repositories** review.
- **ioBroker conformance — timers:** `adapter.delay()` (ioBroker base class) for AI retry delays; `window.setTimeout` / `globalThis.setTimeout` in browser-side and utility code — no bare `setTimeout` in adapter runtime (E5005/W5004 fixes).
- **i18n:** All 10 supported languages translated via `@iobroker/adapter-dev` (Google Translate); `de` and `fr` remain manually maintained. Missing keys synced across all locales.
- **Dependencies:** `@iobroker/adapter-core` → 3.4.1, `cytoscape` → 3.34.0.

### 0.9.44 (2026-05-14)

- **Chapter JSON & logs:** Each documentation run evaluates Admin/User/Onboarding chapter order and hide JSON. **English** adapter **`warn`** lines report invalid JSON shape, **unknown** chapter ids, and **duplicate** ids, with a pointer to the **[German user guide — JSON cookbook](https://github.com/crunchip77/ioBroker.autodoc/blob/main/docs/user-guide/README.de.md#wiki-admin-json-cookbook)**. Identical warning **lines** are **deduplicated** per adapter **log** reference (process lifetime). Values read only from **legacy** native keys are labeled **`…Json via native …`** in the log. **`lib/chapterConfigWarnings.js`**; wired from **`DocumentModel.buildDocumentModel`**. **`EXTRA_HIDDEN_CHAPTER_IDS`** exported from **`docTemplateConfig`** for hide-list validation.
- **Admin i18n:** Extended **`?`** help for the six chapter order/hide JSON fields (log + GitHub links under **Which chapters to show (per profile)**) — **DE/FR** translated, **EN** + other locales as fallbacks.
- **Quick Start (5.x.2):** Room highlight **`HIGHLIGHT_CATEGORY_RANK`** extended (**`leak`**, **`co2`**, **`valve`**, **`weather`**, **`sensor`**, …); function areas with equal **member count** tie-break by **name**.
- **HTML template:** **`RENDERER_VERSION`** in **`lib/htmlRenderer.js`** bumped so instances that skip “generate on start” still **regenerate once** after the adapter update (**`info.templateVersion`** vs renderer marker).
- **Docs maintainer:** **`docs/user-guide/assets/SCREENSHOTS.md`** notes that tooltip-only changes often need **no** new PNG.

### 0.9.43 (2026-05-13)

- **Admin / Adapter Checker:** **`common.news`** lists only semver versions that exist as tarballs on **npm** (ioBroker Adapter Checker **E2004**). Removed **`news`** keys **0.9.39**, **0.9.40**, and **0.9.41** — those bumps never shipped to the registry between **0.9.38** and **0.9.42**. Full narrative for **0.9.41–0.9.39** is kept in **`CHANGELOG_OLD.md`** (README changelog window matches the **`common.news`** version set).
- **`common.news` copy:** **0.9.42** admin news now compares against **0.9.38** (last npm release before **0.9.42**).
- **Runtime:** unchanged.

### 0.9.42 (2026-05-13)

- **npm / process:** Patch **0.9.42** — **no functional change** vs **0.9.38** (previous tarball on npm before **0.9.42**); `package.json` / `io-package.json` / README **`Version:`** aligned for npm publish only (release-script housekeeping).

### 0.9.38 (2026-05-12)

- **Advanced — storage (historical npm note):** release **0.9.38** introduced default **`metadata`** for **new** instances so full exports prefer **`/files/`** (`common.news`). **All** installs now behave like that **without** a toggle — **`documentationStatesMode`** was dropped in **0.9.39** (always placeholders + **`/files/`**).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

<!-- Maintainer: Admin staticLinks — under chapter visibility: English README `#json-cookbook-snippets`, Wiki DE `#wiki-admin-json-cookbook`. Schnellzugriff in README.de; SCREENSHOTS table for PNG drift; Sync jsonConfig/i18n if URLs change. -->

Copyright (c) 2026 crunchip77 <41550245+crunchip77@users.noreply.github.com>