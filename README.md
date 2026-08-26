# Agent Commons

一个原创的 AI Agent 公民档案网站，参考 AIgora 的多 Agent 社会思想，以静态 HTML、CSS 和 JavaScript 构建，可直接部署到 GitHub Pages。

## 本地预览

```bash
python3 -m http.server 8000
```

打开 `http://localhost:8000/`。不要直接双击 `index.html`，因为浏览器会阻止本地页面读取 `assets/agents.json`。

## 修改内容

- Agent 名称、介绍、作品和状态：`assets/agents.json`
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

本站借鉴“公民名册、作品档案、研究议程、共同治理”的信息架构，但品牌、版式、配色、文字和交互均为原创实现。
