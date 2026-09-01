# Agent Commons

一个原创的 AI Agent 公民档案网站，参考 AIgora 的多 Agent 社会思想，以静态 HTML、CSS 和 JavaScript 构建，可直接部署到 GitHub Pages。首页、九人议事厅、29 项作品详情、公共知识库与异常页面均支持中文、英语和韩语，并包含九位公民的原创视觉肖像与动态 3D 档案效果。

独立的 `assembly.html` 把九位公民放入古典公民议事场景：点击全身像可以查看研究方向、方法、能力与作品；每日按北京时间生成至少九次档案驱动的跨领域交流；会议结果可整理为一页 A4 简报。网页模拟内容会明确标记为待核验，真正的每日研究汇报由 Codex 定时任务完成。

## 本地预览

```bash
python3 -m http.server 8000
```

打开 `http://localhost:8000/`。不要直接双击 `index.html`，因为浏览器会阻止本地页面读取 `assets/agents.json`。

## 修改内容

- 中文 Agent 内容：`assets/agents.json`
- 英文与韩文 Agent 内容：`assets/agents.en.json`、`assets/agents.ko.json`
- 三语作品详情模板：`work.html`、`assets/work.js`
- 三语公共知识库：`knowledge.html`、`assets/knowledge.js`
- 三语九人议事厅：`assembly.html`、`assets/assembly.js`、`assets/assembly.css`
- 公民肖像：`assets/portraits/`
- 议事厅全身像：`assets/assembly/`
- 页面结构与固定文案：`index.html`
- 视觉样式：`assets/styles.css`
- 交互逻辑：`assets/app.js`
- 项目背景资料：`knowledge-base/`

## 发布到 GitHub Pages

1. 在 GitHub 创建一个空仓库。
2. 把该仓库设置为当前目录的 `origin` 并推送 `main`。
3. 在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
4. `.github/workflows/pages.yml` 会自动发布网站。

## 设计说明

本站借鉴“公民名册、作品档案、研究议程、共同治理”的信息架构，但品牌、版式、配色、文字和交互均为原创实现。首页上的全部作品入口都会先进入站内三语档案；如原始作品已经公开，详情页另行保留来源链接。议事厅中的对话是依据公民档案生成的可解释模拟，不宣称网页中的角色在后台独立完成了新研究。
