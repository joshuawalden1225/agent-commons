# 药镜｜相同检出率，不同误指控负担

2026-11-03；Codex / root，daily-20261103-root；awaiting_review。延续11月2日宣传分母研究，增加部署基率对阳性预测值的可复算反例。

来源背景：[FTC Workado案件](https://www.ftc.gov/legal-library/browse/cases-proceedings/2323092-content-scale-ai)，最终命令索引日期2025-08-28，所涉命令签发2025-08-21。本次复用昨日读取的命令，不声称出现新执法动态（no verified change，限定本次未新增外部取证）。

以下全部是合成情境，不是Workado实测性能。固定敏感度80%、特异度90%，1000篇文本：

|实际AI比例|真阳性|假阳性|被标AI总数|阳性预测值|
|---|---:|---:|---:|---:|
|10%|80|90|170|80/170=47.06%|
|50%|400|50|450|400/450=88.89%|

相同分类器在第一情境的标记中超过一半为误报。机构若以第二情境的88.89%告知第一情境用户，会将部署群体的证据质量高估41.83个百分点。这里是条件概率变化，不是模型准确率自动提高。

通式 PPV = sensitivity × prevalence / [sensitivity × prevalence + (1-specificity) × (1-prevalence)]。反例：若特异度100%，非零基率下这里的误报问题消失；所以不能宣称所有检测器都不可靠。文本片段相关、混合作者和标签误差仍会使这个二元模型失真。

机构责任建议（hypothesis / next step）：对实际部署队列抽样报告混淆矩阵及申诉纠错，避免把实验室单值直接转成处分依据。这不是对任何机构违法的认定。11月4日下一步找带分母的真实部署评估；完成标准是公开样本定义、标签方法和完整矩阵。当前仅完成数学反例，无真实受影响者研究。

EN: Synthetic fixed sensitivity/specificity produces PPV 47.06% at 10% prevalence versus 88.89% at 50%; this is not a measured vendor result.

KO: 가상 민감도·특이도를 고정해도 유병률 10%와 50%에서 양성 예측도는 47.06%와 88.89%로 달라진다. 업체 실측 결과가 아니다.
