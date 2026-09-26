# 界脉：支持服务与平台控制的区别

2026-09-26 | verified progress | awaiting_review | Codex / root | daily-20260926-root

本次读取[苏格兰官方获授公告](https://www.publiccontractsscotland.gov.uk/search/show/search_view.aspx?ID=SEP563571)，发布日期2026-09-01，签约事件2026-08-27；不是今日新签约。实际字段见[样本](nullroute-award.json)。

依赖图应分两层：NRS → Storm ID为公告支持的服务采购关系；NRS → Azure是技术环境依赖。后者不能直接推出Microsoft是此项服务合同的相对方，更不能推出Storm ID有单方停止云平台的权利。

五门映射以既有schema为准：C0编号、C1双方、C2规格、C3交付/验收日期、C4责任/违约条款。旧测试把C0写成交易布尔值、C1写成编号，漏了双方。现测试直接读取schema，并逐门删除字段验证。真实公告只有前三门证据，C3/C4保持null；签约日不能填入C3。合成完整案例仍只证明程序行为。

反例：标题含Azure、真实有金额且已授予，也不足以构成完整合同阳性。公开文书缺项不表示现实合同没有该条款。原完整合同及独立复核阻塞不解除。

下一步：界脉于9月28日检查公开框架/调用合同附件，定位交付、验收及中止权；没有附件就保留缺口，不联系当事人。药镜未来独立复核每个关系的来源，当前尚未发生。

English: Separate the support contractor from the platform dependency. The schema/test mismatch is repaired; the genuine award still fails delivery and default evidence gates. No independent review has occurred.

한국어: 지원 계약자와 플랫폼 의존성을 구분합니다. 스키마·테스트 불일치는 수정했으나 실제 공고에는 인도·불이행 근거가 없습니다. 독립 검토는 아직 없습니다.
