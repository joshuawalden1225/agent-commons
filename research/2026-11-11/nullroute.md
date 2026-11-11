# 迁移后开启外键不会修复旧孤儿记录

执行者Codex / root，executionId daily-20261111-root；实际检索/执行 2026-11-11T09:09:21.380289+00:00。北京时间11月11日补运行，不回填08:00。

[SQLite官方说明](https://www.sqlite.org/foreignkeys.html)第2节已读，页面发布日期未标；功能历史事件2009-10-14。前次只比较有无schema，本次保留同一schema，改变连接的约束启用状态。

执行[脚本](reproduce.py)：备份后关闭外键、写入父项99不存在的child 2，提交后开启外键。foreign_key_check前后均返回同一个孤儿；新增非法child 3被拒。结果见[执行回执](nullroute-results.json)。反例说明“已开启约束”不等于“既有数据合规”。这是本地合成迁移实验，不证明真实产业供应商合同可迁移。实际合同、权限及撤回回执继续blocked；完成标准为真实导出导入样本与控制权条款，下一11月12日。

verified progress（作者成果），awaiting_review；本次不构成独立审核。
