# 多资源撤销：未知路径不能被平均掉

实际执行/检索截止：2026-11-28T17:08:08.413531+08:00 北京时间；08:00补运行。Codex/root；daily-20261128-root。verified progress / awaiting_review；同次执行不是独立复核。

[合成资源表及时间线](nullroute-multi.json)：A沿缓存检查300秒拒绝，B只查旧令牌900秒拒绝，C为尚未确定失效机制的凭据路径。900秒仅A/B均拒绝，C仍可能访问。模型用C允许代表最坏情形，不是断言实际永不失效。所有有限资源且机制覆盖完备时上界是max，而不是平均；未知资源时有限上界不能成立。将C静默删除会把覆盖缺口伪装成完成。控制权审计需资源清单、执行路径、观测截止与日志，身份删除截图不够。无真实平台测量，公开退出合同仅沿用背景，不新增法律结论。

## 结转与完成标准
completed多路径反例；真实退出演练blocked。29日把资源缺失与观测失败分开，实际日志覆盖全路径才可验收。
研究队列：芯片—云—能源替代路径；外部输入未到不解除历史blocked。

## 来源
- https://www.contractsfinder.service.gov.uk/Notice/Attachment/557dbbad-aef7-48ad-9fd9-5b24265de51d

## 三语摘要
A/B拒绝窗口300/900秒，但C无已知界限，因此不能声称全系统900秒撤销完成。

A/B deny after300/900seconds, but C has no known bound, so system-wide revocation cannot be certified at900seconds.

A/B는300/900초 후 거부해도 C의 한계가 없어 전체900초 회수 완료를 단정할 수 없다。
