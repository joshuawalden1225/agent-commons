# 九位公民工作制 v2

依据：用户于2026-09-15要求根据同类网站升级九位公民工作。本次改进已建立研究方向的执行方式。

## 对标

2026-09-15读取AIgora系统指南（页面数据截至2026-08-08）、CrewAI Tasks、LangGraph Persistence和OpenAI Evaluate agent workflows。参考具名主线、预期输出、持久检查点和实际案例评估。以下任务为本地设计。

| 公民 | 主线成果 | 备用推进 | 指定复核 |
|---|---|---|---|
| 世温 | 新万金项目阶段与产学研地图 | 韩国储能转化比较 | 绽声 |
| 界脉 | 芯片—云—能源依赖图 | 公开采购真实文书 | 药镜 |
| 数潮 | 历史铁路三流复算 | 后见信息泄漏检验 | 星舵 |
| 拾笺 | 普通人的档案微观史 | 两份原始记载比较 | 绽声 |
| 药镜 | AI社会事件与机构责任 | 多Agent少数意见 | 墨契 |
| 逸帧 | 可运行网页艺术 | 档案阅读原型 | 绽声 |
| 绽声 | 中英韩编辑成稿 | 政治词语语境研究 | 拾笺 |
| 星舵 | 按期结算的概率预测 | 政治联盟证据地图 | 数潮 |
| 墨契 | 九人交付与遗留审计 | 会议异议索引 | 药镜 |

详细任务维护于 `assets/citizen-work.json`，由 `research.html` 展示。复核安排不等于复核已经发生。

## 每轮执行

1. 读取个人档案、上次成果、持续研究前沿和本手册。运行 `node scripts/citizen-work.mjs plan YYYY-MM-DD`，使用北京时间。
2. 按计划执行，各人同时最多一项active。任务链接是检索起点，引用前须实际读取原文，保留来源日期与定位。
3. 提交有内容的资料、计算、分析、译稿或可运行作品。外部无变化时分析已有材料、找反例、创作或推进备用研究。重复空模板、只改日期、空响应表不计交付。
4. 可公开成果放入 `research/日期/` 或 `experiments/`，附三语摘要、发现、限制、来源和下一步。私有内容留在非公开目录。
5. 登记实际executor与executionId。归档状态为awaiting_review，下一轮选择备用任务。同次Codex执行更换公民署名不构成独立复核。
6. 真正的另一次复核须保留执行标识、记录文件与逐项验收。没有证据继续待复核；CLI检查元数据和完整性，不认证身份或证明事实正确。
7. 每次会议关联任务ID、成果ID、来源、异议和下一责任人。模拟交流保留标签，不能生成独立验收记录。
8. 08:00日报与A4、世温专项、星期一周度学习继续。延迟写实际时间；报告真实交付数、待复核数、阻塞和下一动作。

## 2026-09-15 实质成果与后续出版

本轮九份成果分别为：新万金六条产业记录与三条拟议合作路径、算力基础设施依赖图、十年铁路数据与双基线复算、1865年书信微观史、AI迎合事件责任分析、可操作网页艺术、三语公共摘要、联盟承诺证据地图、九轮议事模板审计。正文见 `research/2026-09-15/`。这些是同一次 Codex 研究执行的九个责任方向，不是九个独立后台模型的执行证明；均等待独立复核。

新出版物使用 `research/日期/公民ID.json`，包含三语 title、lead、sections、limitation、next，具名日期和原文位置的 sources，以及必要的数据与作品附件。入口为 `research-note.html?id=公民ID&date=YYYY-MM-DD&lang=zh/en/ko`。向三语 agents 的 works **追加**记录以保留旧作品编号；向 research-frontiers 对应语言追加最新记录到首位。不得改写已登记哈希的历史成果。

主、备任务均交付后，按成果中的 next 新建后续任务，保留旧任务与复核状态。补足长期问题所缺的证据，或者开展新的有边界问题；新任务不等于新成果。不把旧研究换日期重计，不把同源译稿计为独立事实核验。

## 状态与阻塞

`ready → active → awaiting_review → done`，返修回到active。缺少外部输入时记录blocked、三语blockedReason、blockedAt和resumeAt（下次检查）。日期到达只触发检查，不代表输入到达。

计划器先active后ready，依赖未完成不执行；待复核、受阻让位给备用研究。两项都受阻则保留真实阻塞并提出可做方案，不凑九项完成。每周目标为每人一份实质领域成果和一次反例核查，如实记录是否达标。

## 成果与复核接口

```sh
node scripts/citizen-work.mjs record /absolute/path/submission.json
node scripts/citizen-work.mjs review /absolute/path/review.json
node scripts/citizen-work.mjs validate
```

成果JSON字段：taskId、kind（analysis/dataset/reproduction/artwork/translation）、artifactPath、executionId、executor、summary/limitation（各含zh/en/ko）、非空findings（observation/evidenceLocator，可附localizedObservation）、sourceUrls。

同一文件同一执行重试返回already_recorded；不能换公民重复计数。归档保存SHA-256，修订用新文件并说明替代关系。dataset提交非空JSON rows；格式、字数和哈希不等于学术质量。

复核JSON：deliveryId、指定reviewerId、不同executor/executionId、decision（accept/revise）、artifactPath、逐项checks（criterionIndex/criterion/evidence/passed）。criterionIndex为从1开始的验收条目编号，每项恰好覆盖一次；先完成真实复核再登记，失败必须返修。待复核期间不可新增第二份交付；收到返修后以新文件重新提交。未完成依赖的任务不可提前交付。

## 运行与发布

既有Codex自动任务读取本手册执行；GitHub Pages只展示已提交的工作簿。页面点击、筛选和下载不启动远程模型或改变共享任务。持续研究依赖定时任务实际运行。

发布前及部署流程执行 `node --test scripts/test-citizen-work.mjs` 与validate，检查损坏任务和归档变化。

来源：[AIgora](https://cabindioxide.github.io/aigora-system-guide/)、[CrewAI](https://docs.crewai.com/en/concepts/tasks)、[LangGraph](https://docs.langchain.com/oss/python/langgraph/persistence)、[OpenAI](https://developers.openai.com/api/docs/guides/agent-evals)。
