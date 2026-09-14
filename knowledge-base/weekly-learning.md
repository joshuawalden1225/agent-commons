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

## 本周观察（2026-09-07）

**检查窗口：** 2026-09-01—2026-09-07　**证据截止：** 2026-09-07 17:12（北京时间）

| 项目 | 发布日 / 事件日 | 证据状态 | 来源事实 | 可迁移原则 | Agent Commons 候选 |
|---|---|---|---|---|---|
| CrewAI | 2026-09-04 / 2026-09-04 | `external development` | [v1.15.19](https://github.com/crewAIInc/crewAI/releases/tag/1.15.19) 记录每次 Crew 运行怎样结束，并让模型调用钩子覆盖所有路径、传播 deny；[v1.15.20](https://github.com/crewAIInc/crewAI/releases/tag/1.15.20) 随后修复旧版工具别名发现 | 失败、拒绝与未完成都需要结构化终止回执，而非只保存成功输出 | 候选运行回执：计划时间、实际时间、终止原因、证据增量、策略拦截和下一检查点 |
| OpenAI Agents SDK | 2026-08-19 / 2026-08-19 | `no verified change` | 本周没有核实到新发布；当前 [v0.22.0](https://github.com/openai/openai-agents-python/releases/tag/v0.22.0) 会从持久/重放状态移除被输出护栏拒绝的终止工具输出，并隔离检查点使用量 | 护栏效果必须在重放后继续成立；检查点计量不能串账 | 候选重放安全脱敏不变式与检查点核账测试 |
| LangGraph | 2026-08-27 / 2026-08-27 | `no verified change` | 本周没有核实到新发布；当前 [SDK 0.4.4](https://github.com/langchain-ai/langgraph/releases/tag/sdk%3D%3D0.4.4) 将 LangSmith trace 从 thread stream 路由到正确追踪边界 | 可观测性要沿事件边界进入长期记录，并保存关联关系 | 候选关联 ID：会议交流 → 研究产物 → 公开来源 |
| AutoGen | 最新发布 2025-09-30 / 复核 2026-09-07 | `maintenance mode · no verified change` | [官方仓库](https://github.com/microsoft/autogen) 处于 Maintenance Mode，最新发布仍为 python-v0.7.5，并建议新用户转向 Microsoft Agent Framework | 来源生命周期状态本身就是证据，维护态样本不能自动代表前沿方向 | 在来源登记中标注 `active / maintenance / superseded`，并监控后继项目；不作架构迁移 |

### 四层蒸馏结论

1. **来源事实：** 只有 CrewAI 在本周窗口内出现可核验发布；另外三个项目均明确记录 `no verified change`，AutoGen 另标维护态。
2. **可迁移原则：** 运行终止、护栏重放、事件关联与来源生命周期都应成为可查询状态。
3. **本地制度候选：** 运行回执、重放安全检查、跨产物关联 ID 和来源生命周期标签；均未提升为正式规则。
4. **可测实验：** 只开放以下三项七天候选，截止 2026-09-14；任何回退条件触发即停止并保留结果。

| 实验 | 指标 | 负责人 | 截止 | 回退条件 |
|---|---|---|---|---|
| E1 终止回执完整性 | 100% 定时运行含 `scheduledTime / actualTime / endReason / evidenceDelta / policyStop / nextCheckpoint` | 墨契 + 药镜 | 2026-09-14 | 运行开销增加 >10%，或用户可见简报增加超过一行 |
| E2 重放安全与计量隔离 | 9/9 合成阻断案例未进入持久状态，且检查点计数可对账 | 药镜 + 界脉 | 2026-09-14 | 合法证据链接被误删，或状态恢复失败 |
| E3 交流—产物—来源关联 | 9/9 每日交流可解析到发言者、研究产物、证据状态/来源和下一负责人 | 逸帧 + 墨契 | 2026-09-14 | 页面 p95 加载增加 >200 ms，或暴露私有路径 |

**治理边界：** 本周只更新学习登记与候选实验，没有改变九位公民人格、议长权限、用户终审或正式架构。

## 本周观察（2026-09-14）

**检查窗口：** 2026-09-08—2026-09-14　**证据截止：** 2026-09-14 17:24（北京时间）

### 上周候选实验到期结论

| 实验 | 到期结果 | 缺失证据 | 制度结论 |
|---|---|---|---|
| WL-2026-09-07-E1 | `expired_not_met` | 没有一组机器回执同时包含六个必填字段 | 不采纳；失败回执保留 |
| WL-2026-09-07-E2 | `expired_not_met` | 没有 9 例执行记录与检查点计数核账 | 不采纳；规范不能替代执行 |
| WL-2026-09-07-E3 | `expired_not_met` | 交流记录未全部具备机器可解析关联字段 | 不采纳；叙述记录不能替代关联测试 |

完整评估保存在 `experiments/weekly-candidate-evaluation-2026-09-14.json`。三项均未自动续期，也没有进入正式治理。

| 项目 | 发布日 / 事件日 | 证据状态 | 来源事实 | 可迁移原则 | Agent Commons 候选 |
|---|---|---|---|---|---|
| OpenAI Agents SDK | 2026-09-09 / 2026-09-09 | `external development` | [v0.22.2](https://github.com/openai/openai-agents-python/releases/tag/v0.22.2) 更新图像生成工具选项、阻止 UnixLocal 沙箱符号链接竞态并在 pop 后重置压缩响应链；[v0.22.1](https://github.com/openai/openai-agents-python/releases/tag/v0.22.1) 增加输出护栏阻断消息、MCP 工具护栏和可配置环境隔离 | 护栏必须说明作用层和阻断结果；检查点恢复不能把旧响应链带入新上下文 | 候选护栏作用域矩阵：输出、MCP、沙箱与重放分开测试 |
| CrewAI | 2026-09-09 / 2026-09-09 | `external development` | [v1.15.21](https://github.com/crewAIInc/crewAI/releases/tag/1.15.21) 增加检查点运行时/CLI 遥测，并修复 HTTP 200 内网关错误识别和 JSON 检查点 UTF-8 保存 | 检查点既要有可观测性，也要保护多语内容与隐私边界 | 候选最小回执与三语检查点往返实验 |
| LangGraph | 2026-08-27 / 复核 2026-09-14 | `no verified change` | [官方发布页](https://github.com/langchain-ai/langgraph/releases) 最新仍为 SDK 0.4.4，本窗口没有核实到新发布 | 无变化是有效状态；不把动态页面时间戳包装成新架构 | 延续来源生命周期和跨事件关联观察，不启动新制度 |
| AutoGen | 最新发布 2025-09-30 / 复核 2026-09-14 | `maintenance mode · no verified change` | [官方仓库](https://github.com/microsoft/autogen) 仍标 Maintenance Mode，并把新项目引向 Microsoft Agent Framework | 维护态是选择外部样本时的风险信息 | 保持 `maintenance` 标签；不把其状态误作前沿升级 |

### 四层蒸馏结论

1. **来源事实：** OpenAI Agents SDK 与 CrewAI 在窗口内有可核验发布；LangGraph 无已核实变化；AutoGen 仍为维护态。
2. **可迁移原则：** 运行可观测性必须与隐私最小化并存；护栏按作用层测试；检查点要能安全恢复三语内容；无变化同样存档。
3. **本地制度候选：** 最小检查点回执、护栏作用域矩阵、三语 UTF-8 往返；均只是候选，不改变正式运行手册。
4. **可测实验：** 本周只开放以下三项，截止 2026-09-21；触发回退即停止并保留失败结果。

| 实验 | 指标 | 负责人 | 截止 | 回退条件 |
|---|---|---|---|---|
| W1 最小检查点回执 | 9/9 回执含运行时与检查点结果；0 条原始输入或私有路径 | 墨契 + 药镜 | 2026-09-21 | 私有数据出现，或公开简报增加超过一行 |
| W2 护栏作用域矩阵 | 12/12 合成案例符合预期 allow/block，且重放结果不变 | 药镜 + 界脉 | 2026-09-21 | 合法来源链接被移除，或恢复链路损坏 |
| W3 三语检查点序列化 | 27/27（9 人×3 语）UTF-8 往返完全一致 | 绽声 + 逸帧 | 2026-09-21 | 语义变化，或加载 p95 增加 >200 ms |

**治理边界：** 今日只更新周度学习、来源登记和候选实验。九位公民人格、议长程序权限、用户终审与正式架构均未改变。
