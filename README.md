# Dev-C++ 中文站

一个纯静态的 Dev-C++ 主题站点，参考了以下四个站的结构与视觉风格：

- `devc.biancheng.net`：单软件落地页骨架（首屏 → 数据条 → 特性 → 场景 → 教程 → FAQ）
- `codeblocks.biancheng.net`：同一套组件体系的另一套配色与文案节奏
- `tbtol.cn`：多页导航、三个速答模块、页脚信息密度
- `luoxues.cn`：短句文案、克制留白、"核心能力"式分块

## 文件结构

```
sites/devcpp/
├── index.html        首页
├── download.html     下载与安装
├── features.html     功能说明
├── tutorial.html     使用教程
├── faq.html          常见问题
├── robots.txt
├── README.md
└── assets/
    ├── style.css     全站样式（无第三方依赖）
    ├── app.js        导航、FAQ、目录高亮、返回顶部
    └── logo.svg      站点图标
```

没有使用任何框架、CDN、字体文件或外部图片，复制整个目录即可部署。

## 本地预览

```bash
cd sites/devcpp
python3 -m http.server 8899
# 浏览器打开 http://127.0.0.1:8899/
```

## 替换下载地址

下载按钮集中在 `download.html`：

- 5.11 卡片：搜索 `Dev-Cpp%205.11` 那一行的 `href`
- 6.3 卡片：搜索 `Embarcadero_Dev-Cpp_6.3_TDM-GCC_9.2_Setup.exe`

把 `href` 换成自己的网盘直链或站内下载页即可（例如 `https://xiecoding.cn/drive.php?id=xxx`）。
首屏的“下载 Dev-C++”按钮指向 `download.html`，不用改。

## 上线前建议改的地方

1. **站名**：搜索 `Dev-C++ 中文站`，批量替换成自己的站名。
2. **页脚**：`© 2026 ...` 和免责声明按自己的站点改。
3. **统计代码**：如需接入百度统计 / 51LA，把脚本放到各页 `</body>` 前。
4. **域名**：可补 `sitemap.xml`、`canonical` 标签、`og:url`。
5. **下载地址**：见上一节。

## 部署

纯静态，三种常见方式：

- **Nginx / 宝塔**：把整个目录传到网站根目录，确保默认首页是 `index.html`。
- **GitHub Pages**：推到仓库，Settings → Pages 选分支根目录。
- **Vercel / Netlify**：导入仓库，构建命令留空，输出目录填 `sites/devcpp`。

## 内容维护

- 软件信息（版本号、体积、系统要求）集中在 `download.html` 的表格里，版本更新时改这一处，再同步页脚和 `features.html` 的对比表。
- 教程章节的锚点被其它页面引用（`tutorial.html#first-program`、`#cpp11`、`#debug`），改 `id` 时记得全局搜索替换。
- FAQ 页带 `FAQPage` 结构化数据，新增问题时同步更新 `<script type="application/ld+json">` 里的条目。

## 发布到 GitHub Pages

`*.github.io` 的前缀就是 GitHub 用户名（或组织名），不能自己随便取。两种用法：

| 用法 | 仓库名 | 访问地址 |
| --- | --- | --- |
| 账号主页 | 必须叫 `<用户名>.github.io` | `https://<用户名>.github.io/` |
| 项目页 | 任意，例如 `devcpp` | `https://<用户名>.github.io/devcpp/` |

发布步骤：

1. 新建 public 仓库，把本站**目录里的内容**（不是外层 `devcpp` 文件夹）上传到仓库根目录。
2. 仓库 Settings → Pages → Source 选 `Deploy from a branch`，分支 `main`、目录 `/ (root)`，保存。
3. 等 1–2 分钟，按上表地址访问。项目页记得带末尾路径。

本站全部使用相对路径，放在子目录（项目页）也能正常工作，不需要改代码。
`.nojekyll` 已放在根目录，避免 GitHub 用 Jekyll 处理静态文件。

### 绑定自己的域名

GitHub Pages 支持自定义域名：Settings → Pages → Custom domain 填 `devcpp.xiecoding.cn`，
再到域名 DNS 加一条 CNAME 记录指向 `<用户名>.github.io`，勾选 Enforce HTTPS。
国内访问和百度收录都比 `github.io` 稳定。

## 搜索引擎收录（Bing / Google）

已内置的基础项：

- `sitemap.xml`：5 个页面的地址、更新时间和优先级
- `robots.txt`：允许全部抓取，并声明 sitemap 位置
- 每页 `<link rel="canonical">` 与 `og:url`，统一指向 `https://devcpp-cn.github.io/...`
- 首页 `SoftwareApplication` 结构化数据，FAQ 页 `FAQPage` 结构化数据
- IndexNow 密钥文件 `<key>.txt`，放在站点根目录

### 提交给 Bing

1. 打开 <https://www.bing.com/webmasters>，添加站点 `https://devcpp-cn.github.io/`
2. 验证方式选“HTML meta 标签”，把 `msvalidate.01` 那段粘到 `index.html` 的 `</head>` 前（文件里留了注释位置）
3. 验证通过后提交 sitemap：`https://devcpp-cn.github.io/sitemap.xml`
4. 用“URL 提交”把 5 个页面各提交一次

### IndexNow 即时推送

密钥文件已放在站点根目录。上传生效后，在本机运行：

```bash
python3 ../indexnow_ping.py
```

会把这 5 个页面推给 Bing 等支持 IndexNow 的搜索引擎，通常 24–48 小时内抓取。

### 换域名时

如果之后绑定 `devcpp.xiecoding.cn`，需要同步替换以下位置的 `devcpp-cn.github.io`：

- 5 个 HTML 的 `canonical`、`og:url`
- `sitemap.xml` 的 `<loc>`
- `robots.txt` 的 Sitemap 行
- `../indexnow_ping.py` 里的 `HOST`
