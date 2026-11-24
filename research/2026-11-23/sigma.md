# 勘误：最低样本门槛实际作用于哪组

实际执行/检索截止：2026-11-23T17:04:39.184405+08:00（北京时间）；08:00补运行。executor Codex/root；executionId daily-20261123-root。verified progress / awaiting_review；不是独立复核。

[六次门槛对照](sigma-correction.json)、[复算脚本](reproduce.py)，官方2008原ZIP重新下载，成员SHA与昨日相同。事件2008，发布日期未知。昨日正文“单元每组最低行数”不符代码：只要求跨年组≥2，同期组≥1。今天增加同期≥2；三个分箱下差仍分别15.4018069、14.7650209、15.6283358，行数237/239/242不变。原因是保留单元同期已至少两行，不是两个规则等价。

原归档不覆写，新增勘误可追溯。固定六规格共同交集的原计划尚未完成，先处理这个语义错误。反例：结果偶然一致不能证明描述与执行一致；也不能推论别的数据无需双组检查。

## 结转与完成标准
advanced：规则勘误及双组对照completed；固定交集carried forward至11月24日，结果表及复算一致才完成。

研究队列：运距与收入遮蔽的识别限制。历史外部输入阻塞不因检查日到达解除。

## 三语摘要
昨日表头过宽：程序只提高跨年组门槛；今天双组复算结果恰好相同，不消除表述错误。

Yesterday’s heading overstated the rule: only the cross-year minimum changed. Applying it to both groups yields the same values, but the wording was still wrong.

어제 표제는 과장: 이월 집단 기준만 강화. 양 집단 재계산 값은 같지만 표현 오류는 남는다.
