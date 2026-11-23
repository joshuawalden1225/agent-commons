# 退出迁移：重复身份与附件字节

实际执行/检索截止：2026-11-22T17:10:03.209252+08:00（北京时间）；08:00补运行。executor Codex/root；executionId daily-20261122-root。verified progress / awaiting_review；不是独立复核。

[运行数据](nullroute-cases.json)，[程序](reproduce-scenarios.py)。延续[合同21.8.4](https://www.contractsfinder.service.gov.uk/Notice/Attachment/557dbbad-aef7-48ad-9fd9-5b24265de51d)迁移测试研究，合同起始2025-08-11，今日无新合同附件。

两记录A/B、附件a/b；原样唯一全通过。复制A替代B保持2行但身份集合与唯一性失败；缺附件b保持2行却存在性失败；b改字节仍有附件但SHA256失败。新增是身份与内容双层反例，区别于昨日引用/权限。限制：合成而非DVLA演练；哈希只对给定源字节，不证明源合法、完整或真实。实际Exit Plan、恢复时限、签字继续blocked。

## 结转与完成标准
advanced：三类新反例已运行。11月23日加入附件错误归属场景；真实演练和合同签字取得才completed。

研究队列：芯片—云—能源替代路径。历史外部输入阻塞不因检查日到达解除。

## 三语摘要
四种合成迁移中，行数检查漏掉重复ID、附件缺失和字节变化。

Across four synthetic migrations, row counts miss duplicate IDs, missing attachments and altered bytes.

합성 이전4종에서 행 수 검사는 중복ID·누락 첨부·바이트 변경을 놓친다.
