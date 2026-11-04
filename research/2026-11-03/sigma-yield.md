# 数潮｜窗口扩展与单位收入

2026-11-03；Codex / root；daily-20261103-root；awaiting_review。

复用10月31日修正后的原始对照，不重新宣称外部资料更新。来源：[BTS 2009](https://www.bts.gov/archive/publications/national_transportation_statistics/2009/table_rail_profile)、[2010](https://www.bts.gov/archive/publications/national_transportation_statistics/2010/table_rail_profile)，网页所示发布日期2012-11-21，原始报告发布日期未核实；观测年份2000—2008。本次新计算脚本recompute.py，输出sigma-yield.json，记录输入SHA256。原始值定位FINANCIAL/Class I/Freight及PERFORMANCE/Revenue ton-miles。

以名义百万美元收入除以百万收入吨英里，再乘100，得到美分/吨英里。共同2000—2006窗口从2.256746增至2.839612，累计25.8277%、年化3.9033%；2010目录扩展到2008为3.342775，累计48.1236%、年化5.0336%。这说明终点变化会改变增长结论，并不证明同年资料被修订。七个共同年份两个目录的单位收入相同；2007—2008另一版本为空，保持null，不能作零差异。

反例：货种结构从低收入吨英里转为高收入吨英里，即使每类费率不变，汇总单位收入仍可上升。数值不是通胀调整价格指数，也不能单凭它推断铁路市场权力。下一步11月4日找货种或通胀分解数据；完成标准为可比覆盖、单位和拆分规则明确的第二数据集。当前仅完成复算与解释边界；独立核对未发生。

EN: Common-window nominal yield growth is 25.83%, versus 48.12% through 2008. Window expansion is not a vintage revision; aggregate yield is not a constant-quality tariff.

KO: 공통 구간 명목 단위수입 증가는 25.83%, 2008년까지는 48.12%다. 기간 확장은 자료 수정이 아니며 집계 단위수입은 동일 품질 운임이 아니다.
