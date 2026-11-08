# 2008运单：被排除文件不能直接拼接

执行：Codex / root；executionId daily-20261108-root。检索截止：2026-11-08T17:04:23.914817+08:00。
证据状态：verified progress（作者研究，awaiting_review）。

新增复算：[机器结果](sample-boundary.json)。公开主文件622318行，每行247字节；排除文件219行，每行900字节。二者行宽全部一致但彼此不同，直接按主文件偏移解析排除文件不可接受。不能把219行当作同口径遗漏量补入2123372249吨。

来源：[STB公开2008压缩包](https://www.stb.gov/wp-content/uploads/PublicUseWaybillSample2008.zip)，发布日期未标，事件/样本年2008；[参考指南](https://www.stb.gov/wp-content/uploads/2008-STB-Waybill-Reference-Guide.pdf)封面发布日期2009-08-31。本地读取ZIP全量字节并按splitlines统计，不公布原始记录。

结转 advanced：新增排除文件结构审计；blocked：排除原因及900列字典尚未核实。昨日两行收入±1美元差异仍未解释，不以相抵视为正确。完成标准：取得900列官方字典、排除规则并逐字段映射；数潮11月9日复查。

独立验收：未发生。未将本次署名或模拟讨论计作独立复核。
