# 储能备电与移峰：不能重复承诺的能量窗口

世温研究方向；实际执行 Codex / root；executionId: daily-20261030-root；2026-10-30 北京时间17:03后补运行。状态：awaiting_review，未经独立审核。

## 三语摘要

中文：建立含放电效率、最低SOC与备电预留的能量约束。假设1 MWh系统、初始SOC90%、最低10%、效率90%、备电0.2 MW两小时，剩余移峰电量仅0.32 MWh；降低移峰需求可消除冲突，不能断言多服务必然不兼容。

English: A synthetic 1 MWh battery starting at 90% SOC, with a 10% floor and 90% discharge efficiency, can deliver only 0.32 MWh for peak shifting while preserving 0.2 MW of backup for two hours. A smaller shifting obligation is compatible; multi-service operation is not inherently contradictory.

한국어: 가상 1 MWh 배터리의 초기 SOC 90%, 하한 10%, 방전 효율 90%에서 0.2 MW를 2시간 백업용으로 남기면 피크 이전에 쓸 수 있는 전력량은 0.32 MWh다. 이전 요구량을 줄이면 양립할 수 있으므로 다중 서비스가 반드시 충돌하는 것은 아니다.

## 已读取来源与定位

检索时间：2026-10-30 北京时间17:01至17:03。以下均为技术资料重新精读，不是今天新发布的技术进展。

- [SAM Battery Dispatch BTM](https://samrepo.nlr.gov/help/battery_dispatch_btm.html)，发布日期未标，事件日期不适用。定位 Charge Limits and Priority / Minimum state of charge：SOC上下限对应当时可用容量，随衰减变化；Peak Shaving：调度受到容量与SOC约束。未将软件默认值解释为设备安全要求。
- [Berkeley Lab: Bill Savings vs. Backup Power](https://energyanalysis.lbl.gov/publications/bill-savings-vs-backup-power)，发布时间2024-10（未标日），研究时期见2024报告；本次只读机构摘要。定位 Abstract：备电预留提高时，可用于日常电费管理的容量减少。住宅研究的经济结论不能直接外推到韩国工业AIDC。
- 前次本地成果：[2026-10-05服务边界研究](../2026-10-05/saeon-storage-functions.md)。本次增量为带单位的约束、数值反例及可复算程序，未重计既有服务分类。

## 模型：作者构造，不是项目实测或SAM运行结果

E为当期可用直流能量容量（MWh）；s为初始能量比例，s_min为技术底线；eta为DC到AC单向放电效率。备电AC功率P_b（MW）持续t_b（h），移峰AC电量E_s（MWh）。假设期间不补充充电、忽略辅助负载与自放电，备电发生在移峰之后且可使用预留SOC至技术底线；这里SOC按线性能量比例近似。

可行条件：E_s + P_b*t_b <= eta*E*(s-s_min)。

正常调度下限：s_reserve = s_min + P_b*t_b/(eta*E)。

另须检查功率：备电与移峰若不同时发生，PCS功率至少覆盖两者较大值；若同时发生，应核验总功率，不能仅靠能量不等式。切换时间、孤岛运行与黑启动不在此模型内。

## 数值与反例

共同假设：E=1 MWh，s=0.9，s_min=0.1，eta=0.9，PCS=0.5 MW，备电0.2 MW持续2小时，备电AC电量0.4 MWh。

总可释放AC能量0.72 MWh；备电预留SOC下限54.4444%；移峰余量0.32 MWh。

|情景|移峰承诺|备电后要求合计|结果|
|---|---|---|---|
|冲突例|0.3 MW × 2 h = 0.6 MWh|1.0 MWh|缺0.28 MWh；移峰后SOC23.3333%，余下备电仅0.12 MWh|
|反例：兼容|0.15 MW × 2 h = 0.3 MWh|0.7 MWh|余0.02 MWh；移峰后SOC56.6667%，足以保留备电|
|衰减敏感性|同一0.3 MWh移峰，E降为0.8 MWh|0.7 MWh|总可用AC降为0.576 MWh，缺0.124 MWh；原兼容例失效|

可证伪结论：在所列假设下，原0.6 MWh移峰承诺与0.4 MWh备电不能同时保证；但降低移峰至0.3 MWh即可满足能量约束，因此“同一储能系统多服务必然冲突”不成立。真实项目若有可靠补电、不同时间窗或可中断负载，必须重建时间序列再判定。

## 复算与限制

运行 `python3 research/2026-10-30/saeon-soc.py`。程序输出三种情景及断言，使用分数计算以避免二进制舍入改变可行性判断。它是作者自检，不是独立验收，也不证明任何新万金项目的实际容量或合同违约。

Limitation: Synthetic energy accounting only; no site dispatch, outage switching or independent review. 한계: 가상 에너지 수지이며 현장 급전·정전 전환·독립 검수 근거가 아니다.

下一步负责人世温：取得具名项目当期可用容量、SOC定义、备电释放策略、辅助耗电与逐时调度，再检验不等式及功率约束。下次检查2026-10-31；日期到达不代表外部资料已收到。
