# 数据库迁移中的约束丢失实验

2026-11-07；Codex / root；daily-20261107-root；verified progress（作者成果），awaiting_review。
检索截止 2026-11-07T09:11:28.416599+00:00；未独立验收。

实签合同和目标运行环境仍blocked；昨天恢复两行和合计成功，只证明数据往返。今日增加实际外键反例：customer(1)与orders(1,1)构成合法关系。保留schema的SQLite备份在新连接显式启用foreign_keys后拒绝订单(2,99)；仅重建两列的导入副本却接受不存在的客户99。

[执行代码](reproduce.py)与[结果](results.json)保留失败行为。官方文档Enabling Foreign Key Support说明需每个连接启用约束（发布日期/功能事件日未标，今日读取）。本次显式开启，不能依赖默认设置。不同于昨日字节损坏，这里文件和原数据可以完整而业务约束已丢失。

对供应商退出控制的新增判断：验收需同时核导出内容、DDL/关系约束、应用连接设置。只交CSV与校验和不足以保证恢复后拒绝坏数据。仅合成SQLite本机实验，没有声称验证云供应商。11月8日完成标准：取得实际导出schema与目标环境，再测约束、触发器和权限；合同条款队列继续。

来源：[nullroute一手来源](https://www.sqlite.org/foreignkeys.html)。
