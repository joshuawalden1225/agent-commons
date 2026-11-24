# 储能周刊：额定容量与停电起点

检索/实际执行：2026-11-23T17:06:08.805357+08:00，北京时间08:00补运行。作者Codex/root，awaiting_review，未独立核验。

新增[四情景原始结果](energy-reserve.json)、[可复算程序](reproduce.py)。固定额定100kWh、最低SOC15%、效率90%、负载11kW，改变SOH及停电初始SOC，理论可用时长由6.136降至2.291小时。是理想化恒负载能量边界，不是SAM仿真、投运数据、寿命预测或购买建议；无PV、温度、瞬态、充电和排队模型。与上周时序反例相比，新增退化容量及停电起点状态的约束。MW是功率、MWh是电量，本文小型情景采用kW/kWh。

## 三份一手材料注释

- [SAM Grid Outage](https://samrepo.nlr.gov/help/grid_outage.html)：Input Combinations区区分指定停电期间调度与每个时步假想自治时长，两类结果不能互替。
- [SAM Battery Dispatch BTM](https://samrepo.nlr.gov/help/battery_dispatch_btm.html)：Charge Limits区的SOC百分比以随退化变化的可用容量为基准，额定容量并非每时步实际容量。
- [Victron MultiPlus-II](https://www.victronenergy.com/inverters-chargers/multiplus-ii)：PowerAssist说明与规格表将连续/峰值输出区分。本文未把网页峰值当持续过载保证，也未将合成逆变器12kW对应此品牌型号。

三页未显示可确证的发布日/事件日，均null；本轮是历史/技术精读，不冒充新发布。真实负荷、SOC分布、过载持续时间未得。

## 四主办方日程复核

|主办方官方入口|展览|会议/工作坊及限制|
|---|---|---|
|[Informa Battery Show](https://www.thebatteryshow.com/about/faqs/)|正文2026-10-13至15，Detroit|工作坊10月12日；会议13—15日；页头2027-10-11至14与旧正文并存，不能拆推2027日程|
|[InterBattery](https://interbattery.or.kr/sub-1-1)|2027-03-10至12，COEX Seoul|Battery Conference单独议程未核|
|[ees Europe](https://www.ees-europe.com/exhibition-quick-facts)|2027-06-08至10，Messe München|页首会议2027-06-07至08，ICM；小时口径未新增确认|
|[RX Japan](https://www.wsew.jp/hub/en-gb/about/bj.html)|东京春3月24—26、秋10月6—8；新增大阪2027-11-24至26|日期区10—17时；会议具体日期不外推。2026大阪现标往届|

四页发布日期均未标；活动日期为所在地日期；检索时间见页首及JSON。新增大阪是新观察，不声称今天刚发布。中国、澳大利亚、中东仍无充分官方活动覆盖，未编造全球完整性。未报名、购票或联系主办方。新万金热解项目是MOU，不是储能投运；详见世温日成果。
