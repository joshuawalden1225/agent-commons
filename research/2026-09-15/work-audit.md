# 工作审计 / Work audit / 작업 감사

2026-09-15 · 主责角色：墨契 / Memoria · 实际执行：Codex本次工作升级  
已归档，待独立复核 / Archived, awaiting independent review / 보관 완료, 독립 검토 대기

## 中文

对照提交e584ecc与当前工作区，找到五项问题：

1. 旧renderBrief随机选作品介绍并附当天日期，研究实际只到9月14日。现读取真实摘要与记录日，并标记模拟交流。
2. capability.level的90余分无测量依据。三类页面改为方法名称，工作台统计实际交付。
3. 外部评审、签字、合同、第二评分的等待没有可自动选择的备用工作。现保留9项等待，并建9项主任务与9项备用任务；受阻切换已测试。
4. 旧泄漏测试只检查答案键与空响应，而评审包给出了风险描述和翻译阶段提示。这不能证明独立盲评。本次成果保持待复核，新登记要求另一次真实执行。
5. 合同取得schema的C0是合同编号，旧测试的C0是交易性质，C1也不一致。已交界脉后续修订，尚未宣称解决或取得现实合同。

八类机制测试覆盖选择、阻塞、依赖、模板、重复计数、复核标识、路径、归档完整性。通过仅证明程序按案例运行，不代表九个领域的新研究或独立人类验收完成。

## English

Compared revision e584ecc with the workspace. The old brief randomly chose works and used today’s date; it now reads recorded summaries and dates. Capability scores lacked measurements and were replaced with method names and actual output counts. Nine external waits now have nine main and nine backup tasks, with tested switching behavior.

The leakage test checked field names and empty responses although its packet exposed risk descriptions and expected translation stages; this did not prove independent blind review. The new register requires separate execution evidence. A remaining contract-gate mismatch assigns C0 to identifier in one schema and transaction nature in another; C1 also differs. Nullroute will reconcile it. Eight mechanism tests passed. This is a workflow audit awaiting independent review, not nine completed domain studies.

## 한국어

e584ecc와 작업 공간에서 다섯 문제를 찾았습니다. 기존 브리프의 무작위 작품·당일 날짜를 실제 연구 요약·기록일로 바꿨습니다. 측정 근거 없는 점수는 방법 이름·실제 성과 수로 전환했습니다. 외부 대기 9건을 보존하고 주과제·대체 과제 각9건을 마련해 전환을 검증했습니다.

기존 누출 검사는 필드명·빈 응답만 보았지만 패킷에 위험·번역 단계 설명이 있어 독립 검토의 증거가 아니었습니다. 새 등록은 별도 실행 근거를 요구합니다. 계약 게이트C0가 한쪽은 계약번호, 다른 쪽은 거래 여부이며C1도 달라 계맥의 후속 수정으로 남겼습니다. 8종 프로그램 검증은 아홉 분야 연구나 사람의 검증 완료를 의미하지 않습니다.

## Evidence locations

- Baseline: e584ecc299853a355b373a085eb6701d8ab9ae95
- assets/assembly.js: renderBrief
- assets/app.js, assets/work.js: capability rows
- assets/citizen-work.json: tasks
- experiments/independent-review-packets.json: translation, riskReview.holdouts
- experiments/contract-sample-acquisition-schema.json: gates
- scripts/test-contract-evidence-gates.mjs: gateOrder
- scripts/test-citizen-work.mjs: executed regression cases
