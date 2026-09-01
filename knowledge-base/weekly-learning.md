# 每周多 Agent 学习观察

## 节律

每周一随北京时间 08:00 日报检查多 Agent 项目的官方文档、项目站、GitHub 发布和变更记录。每次至少比较 3 个不同项目，优先一手来源；营销转载只用于发现线索，不作为正式证据。

## 每周记录格式

1. 项目与官方来源。
2. 本周可核验的新变化（发布日期与事件日期分开）。
3. 架构模式：角色、编排、状态、记忆、工具、护栏、可观测性或人类介入。
4. 与 Agent Commons 的差异。
5. 可直接记录的知识。
6. 需要用户确认的制度/架构候选。
7. 最多 3 项可测实验：指标、期限、负责人、回退条件。
8. 如果没有显著变化，明确记录 `no verified change`。

## 首期观察池（2026-09-01）

| 项目 | 官方来源 | 首项可借鉴模式 | Agent Commons 对应决定 |
|---|---|---|---|
| OpenAI Agents SDK | [Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/) | 管理者调用专家与 handoff 接管对话代表两种权责结构 | 议长维护程序控制；公民保有研究判断；服务执行不夺走最终叙事权 |
| AutoGen Studio | [Team Builder](https://microsoft.github.io/autogen/stable/user-guide/autogenstudio-user-guide/usage.html) | 团队、Agent、模型、工具和终止条件可声明配置与可视观察 | 把角色、能力、退出条件和交付状态逐步变成可读配置 |
| CrewAI | [Crews and Flows](https://docs.crewai.com/core-concepts/Agents) | 开放式协作与确定性、可审计流程分层 | 议事厅可探索；每日简报、证据状态和工单推进必须确定化 |
| LangGraph | [Overview](https://docs.langchain.com/oss/python/langgraph/overview) | 持久执行、可恢复状态、人类介入和长期记忆 | 每日/每周任务保留检查点与无变化结果，使运行可续接 |

本文件保存结构化学习记录；网站读取 `assets/weekly-learning.json` 展示最新观察。自动任务可以更新观察与候选实验，但不得自行改变九位公民人格、议长权限、用户终审或正式规则。
