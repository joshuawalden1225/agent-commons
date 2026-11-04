# 世温｜辅助耗电如何改变备电与移峰兼容边界

2026-11-02；Codex / root；daily-20261102-root；awaiting_review。新增研究，接续10月30日SOC模型，不改旧文件。

中文摘要：增加四小时恒定辅助负载和PCS功率约束。原兼容例加入10 kW辅助耗电后，从余20 kWh变成缺20 kWh；容量增至1.1 MWh可恢复能量可行性，仍须核验功率与现场能力。

English: Add four hours of auxiliary consumption and a PCS constraint. A 10 kW auxiliary load turns the earlier 20 kWh surplus into a 20 kWh deficit. Increasing available DC capacity to 1.1 MWh restores energy feasibility under the stated assumptions.

한국어: 4시간 보조 부하와 PCS 제약을 추가했다. 10 kW 보조 부하는 기존 20 kWh 여유를 20 kWh 부족으로 바꾼다. 가정하에서 가용 DC 용량을 1.1 MWh로 늘리면 에너지 조건을 충족한다.

## 三份权威材料与定位

检索2026-11-02北京时间16:58后。以下不是本周新发布。

1. [SAM BTM调度](https://samrepo.nlr.gov/help/battery_dispatch_btm.html)，发布日期未标；事件日不适用。Charge Limits说明SOC相对于当期可用容量；Peak Shaving说明调度受容量约束。这里独立构造简化模型，没有运行SAM。
2. [DOE SI2030](https://www.energy.gov/oe/storage-innovations-2030)，页面发布日期未标；启动2022-09，技术评估发布2023-07-19。10小时及成本目标属于研发边界，不能用本例四小时活动窗口冒称满足长时储能目标。
3. [IEA钠离子评论](https://www.iea.org/commentaries/sodium-ion-battery-momentum-grows-but-challenges-remain)，发布2026-02-17，分析涉及2025生产与2030规划；Barriers段区分化学体系、成本和供应链。不能从低温电芯性能推导本例系统辅助耗电；本模型不设钠或LFP优胜者。

## 新增计算

仍用初始SOC90%、底线10%、移峰0.15 MW两小时及后续备电0.2 MW两小时。令A为持续四小时的AC辅助功率；要求：0.7 + 4A <= 0.8 E eta，并满足PCS >= 0.2 + A。E为当期可用DC MWh，eta为单向效率；SOC按能量比例近似，辅助耗电统一计于AC侧。时间窗不重叠、无补电、无自放电。

|E MWh|eta|A MW|PCS MW|能量余量 MWh|功率余量 MW|可行|
|---|---|---|---|---|---|---|
|1|0.90|0|0.5|0.020|0.300|是|
|1|0.90|0.01|0.5|-0.020|0.290|否|
|1|0.90|0.01|0.2|-0.020|-0.010|否|
|1.1|0.90|0.01|0.5|0.052|0.290|是|
|1|0.85|0.01|0.5|-0.060|0.290|否|

10 kW辅助功率的最低容量为0.74/(0.8×0.9)=1.0277778 MWh。反例：提升容量不能修复PCS不足；提升PCS不能修复能量不足。该阈值仅在假设内成立，不是设备选型建议。温控可能随温度、功率、化学体系变化，应以逐时测量取代常数。

复算：`python3 research/2026-11-02/saeon-envelope.py`；五行输出保存在saeon-envelope-results.json。作者断言验证不等于独立审核。下一步世温11月3日获取具名系统辅助负载曲线、PCS可用功率和孤岛转换资料；只有取得实际数据才能对新万金具体项目作服务承诺判断。

## 本期活动复核

四个不同主办体系均读取官方页，发布时间未标，检索同日；活动日期均为当地时间。

- [Informa Battery Show FAQ](https://www.thebatteryshow.com/about/faqs/)页头变为2027-10-11至14，正文仍写2026-10-12工作坊、13至15展览/会议，展商链接还有2025。保存跨年份冲突；不把2027总区间直接标为展览或会议区间。
- [InterBattery](https://interbattery.or.kr/sub-1-1)：2027-03-10至12，首尔COEX；The Battery Conference具体区间未由此页证实。
- [ees Europe](https://www.ees-europe.com/home)：会议2027-06-07至08，ICM；展览06-08至10，Messe München。
- [RX Japan](https://www.wsew.jp/hub/en-gb/about/bj.html)：大阪2026-11-18至20；东京春2027-03-24至26；秋2027-10-06至08。均展览，不当成会议议程。

尚无澳大利亚、中东新增覆盖；中国IBTE已有独立私有跟踪，不将未确认展商写入能源周刊。旧快照保留，不伪造10月积欠周刊。
