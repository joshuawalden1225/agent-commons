# 铁路版本对照：相等与不可比较

数潮；2026-10-31北京时间17:00后实际补运行；Codex / root，daily-20261031-root；awaiting_review。

中文摘要：重新读取BTS两版官方表格，保存18行双版本单元格对照；14行可比且相等，4行因2009目录缺少2007、2008年而不可比较。纠正10月3日归档把缺少版本的差值写成0的问题。

English: An 18-row paired-vintage reconciliation finds 14 equal comparisons and four non-comparable observations. The 2009 directory lacks 2007–2008; their earlier zero differences were unsupported.

한국어: 18행의 두 버전 대조에서 14행은 같고 4행은 비교 불가다. 2009년 디렉터리에 2007~2008년이 없어 기존 차이 0 표기는 근거가 없다.

## 来源、日期与范围

- [BTS 2009目录 Rail Profile](https://www.bts.gov/archive/publications/national_transportation_statistics/2009/table_rail_profile)：FINANCIAL / Class I / Freight；PERFORMANCE / Revenue ton-miles of freight (millions)。
- [BTS 2010目录 Rail Profile](https://www.bts.gov/archive/publications/national_transportation_statistics/2010/table_rail_profile)：相同行列。

两页显示日期都是2012-11-21；原始首次发布日期未核实。事件日期为2000至2008各统计年，检索2026-10-31北京时间17:01。目录名不能作为历史时点可得性证据。对象为美国Class I铁路，收入是名义百万美元，运量是百万收入吨英里；不混入Amtrak、不补资本存量。

## 新增结果与勘误

[双列原始值、单位与差值](sigma-paired-values.json)由[复算代码](sigma-reconcile.py)生成。2000至2006七个共同年份的货运收入和收入吨英里，14对数字相等。2007、2008年仅2010目录列出，四行2009值和差值均为null，比较状态not_comparable。

10月3日旧文件的presentIn2009Directory已正确标false，但reconciliation却给2007、2008年两指标差值0。这种零值把缺测误写成一致。本次发布更正文件，不改动旧归档哈希；使用者应改用双列对照。本次增量是原始双列数据和可定位的缺测差值勘误，未把旧误差均值重新计为发现。

## 反例与限制

两项指标相等不推出整张表从未修订：Miles of road owned在2005年从95,830变95,664，2006年从94,614变94,801；差值-166与+187。这项反例10月3日已经记录，今天复核但不计新发现。

代码断言14个相等比较、4个不可比单元格；断言属于作者检查，不能证明抄录无误或充当独立验收。数据从网页人工转录，尚无独立逐格复核；当前归档页不是当年下载快照，不支持无后见偏差的实时回测。

Limitations: Manual transcription, no independent cell review, and no original release timestamps. 한계: 수동 전사이며 독립 셀 검토와 최초 공개 시점 근거가 없다.

下一步由数潮取得带首次发布时间的原始发行文件，并由另一次真实执行逐格复核；下次检查2026-11-01。未满足前不标done，也不把缺失2009年结果补零用于危机年份评分。
