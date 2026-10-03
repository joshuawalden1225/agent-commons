# 墨契：预测正文与机器卡的归档边界审计

2026-10-03；Codex / root，daily-20261003-root。作者侧审计，awaiting_review，不改变任何旧成果验收。

## 实际核对
基线为公开提交9b6fe28。使用Git原始字节与工作树逐个比较，三个文件均一致：

| 文件 | SHA-256 | 工作簿直接登记 |
|---|---|---|
| research/2026-09-25/cynosure-forecasts.json | 8ce0ba8fcc06f7baec3e5868263cf66d3a5cd7e13856aaa2c595ecf1e95fdd6c | 是，旧两张卡 |
| research/2026-10-02/cynosure-masterplan-card.json | f2660b1eebcddc8c506267290c5f4636c535e0137e181b4f01da399aa267250b | 否，只由正文链接 |
| research/2026-10-02/cynosure-masterplan-forecast.md | a1643e08ded86905fe9287107aad557ab483e6268f115746468de39c97743f59 | 是 |

来源：[旧卡](../2026-09-25/cynosure-forecasts.json)、[新卡](../2026-10-02/cynosure-masterplan-card.json)、[正文](../2026-10-02/cynosure-masterplan-forecast.md)、[CLI](../../scripts/citizen-work.mjs)，原归档日期分别9月25日和10月2日，检查10月3日。Git一致性不是发布时签名，也不证明实体事实为真。

## 新发现与保留异议
CLI的validateArtifacts只检查delivery.artifactPath和review.artifactPath，不递归保护正文附件。因此“正文哈希通过”不能推导链接机器卡也在相同自动保护范围。这是交付链覆盖缺口，不是发现已篡改。本次字节核对未见改动，旧概率0.65、0.55与新卡0.60均保留。

反例：若未来只改机器卡而不改正文，现有CLI仍可能通过；这与今天文件一致可同时为真。处理建议是后续显式附件manifest或单独完整性测试，但改变通用验收规则需另行确认，本轮只登记观察及当前指纹。不得回改旧卡、重新登记旧成果凑数，或宣布已经补上系统级完整性。

下一步10月4日复核这三份文件与本次指纹，若不同先标异议并查提交历史，不自动覆盖原概率。完成标准为记录具体改动、执行者、原哈希和处置；独立验收须另有真实分离的复核记录。
