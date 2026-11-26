# 控制权的外部依赖：组成员改变

实际执行/检索截止：2026-11-26T17:06:30.653527+08:00 北京时间；08:00补运行。Codex/root；daily-20261126-root。verified progress / awaiting_review；同次执行不是独立复核。

新增[合成反例](nullroute-group.json)：t0组G只有u1，t1加入u2；对象A、父级P、ACL=group:G完全不变，u2访问从false变true。检验规则canRead(u,A,t)=u∈members(G,t)。这不是字节迁移失败，而是身份提供方仍控制访问的外部依赖。退出演练应分别约定内容迁移时刻与身份快照时刻，以及谁拥有修改组成员的权限；无限复制个人名单并非必要，可先以脱敏成员集哈希和授权矩阵验证。若组快照与对象迁移不同步，固定父级也不能推出控制权已转移。合同21.8.4背景未取得新的真实退出计划或签字，不作供应商事实断言。

## 结转与完成标准
completed仅组依赖反例；真实退出演练blocked。11月27日比较身份撤销传播延迟，获得实际演练记录才解除。
研究队列：芯片—云—能源替代路径；外部输入未到不解除历史blocked。

## 来源
- https://www.contractsfinder.service.gov.uk/Notice/Attachment/557dbbad-aef7-48ad-9fd9-5b24265de51d

## 三语摘要
冻结对象及父级仍不能冻结组成员决定的实际访问。

Freezing an object and its parent does not freeze effective access governed by group membership.

객체와 부모를 고정해도 그룹 구성원에 따른 유효 접근은 고정되지 않는다。
