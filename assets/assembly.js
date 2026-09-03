const assemblyUI = {
  zh: {
    locale:'zh-CN', title:'Agent Commons · 九人议事厅', data:'assets/agents.json?v=20260901-2',
    navCitizens:'公民', navDialogue:'对话', navBrief:'每日简报', navSystem:'系统', navKnowledge:'知识库',
    title:'九种判断，<br><em>一座议事厅</em>', intro:'九位公民由议长張皓召集，在古典议事厅中交换证据、方法与异议。点击公民可查看研究方向并由她发起随机跨域议题；点击议长可手动命题召开临时会议。', liveLabel:'今日议事厅已开启', stageLabel:'CITIZEN WORLD · 十席公转', stageHint:'拖动任意一位公民或议长，让十人围绕公民世界图腾旋转；点击人物召开临时会议，悬停观察各自的 Ego 动作。', stageAria:'可拖动旋转并可点击召集会议的九位公民与一位议长环形议事厅', totemLabel:'公民世界实体图腾 · 共同知识轴心', totemAlt:'由实体青铜、玄武岩、九道公民环与共同知识核心构成的公民世界图腾柱', chairName:'張皓', chairRole:'PRESIDING CHAIR · 议长', chairAction:'点击召集临时会议', chairButtonAria:'点击張皓议长的 3D 虚拟形象，输入主题并召集临时会议', chairAvatarAlt:'身着中国传统学者袍的張皓议长 3D 虚拟形象',
    temporaryIndex:'PRESIDING CHAIR · AD HOC SESSION', temporaryTitle:'召集九位公民，<br><em>召开临时会议</em>', temporaryIntro:'请由议长输入需要立即讨论的主题。召集后，九位公民将依据现有档案展开至少九次透明模拟交流，并把会议保存在本设备。', temporaryCallerLabel:'会议发起人', temporaryChairMode:'议长手动命题', temporaryAgendaLabel:'临时会议议题', temporaryAgendaPlaceholder:'例如：新万金能源产业出现重大政策变化', temporaryAttendance:'出席：九位公民 + 议长', temporaryRecord:'记录：本设备 · 可重新召集', temporaryButtonSmall:'SUMMON ALL NINE CITIZENS', temporaryButton:'立即召集并开始会议', temporaryDisclosure:'临时会议是基于现有公民档案的交互模拟，不冒充后台已完成的新研究。', temporaryLive:'TEMPORARY SESSION · 临时会议进行中', temporaryOpen:'查看临时会议记录 →', temporaryReady:'临时会议已开始', temporaryThesis:'议长召集九位公民围绕这一紧急议题展开跨领域讨论；每项判断仍需保留证据等级、分歧与下一步核验。', citizenTemporaryIndex:agent=>`${agent.alias} · CITIZEN-LED SESSION`, citizenTemporaryTitle:agent=>`${agent.name}发起，<br><em>召开临时会议</em>`, citizenTemporaryIntro:agent=>`系统已把${agent.name}的研究方向与另一位公民的方法随机匹配，形成一个可编辑议题。确认后，九位公民与议长将共同讨论。`, citizenTemporaryMode:agent=>`${agent.field} · 研究方向随机组题`, citizenAgendaLabel:'研究方向随机议题（可编辑）', citizenAgendaPlaceholder:'系统将依据该公民的研究档案随机生成议题', citizenButtonSmall:'CITIZEN-LED AD HOC SESSION', citizenButton:'确认议题并开始会议', citizenTemporaryThesis:name=>`${name}依据自己的研究方向发起跨领域临时会议；九位公民共同检验议题，并保留证据等级、异议与下一步核验。`, citizenTopicPatterns:[(agent,frontier,partner)=>`${agent.field} × ${partner.field}：围绕「${frontier}」的跨领域研判`,(agent,frontier,partner)=>`${agent.name}发起：如何以${agent.tags[0]}推进「${frontier}」，并由${partner.name}从${partner.tags[0]}角度复核`,(agent,frontier,partner)=>`从「${frontier}」出发：${agent.field}如何借鉴${partner.field}形成可验证的下一步`], temporaryMeta:(time,caller)=>`北京时间 ${time} · ${caller}发起 · 九位公民已受召`, closeDialog:'关闭临时会议召集窗口',
    dossier:'RESEARCH DOSSIER', researchDirection:'研究方向', method:'工作方法', capabilities:'能力矩阵', researchNow:'当前研究', researchFrontiers:'持续研究议程', openArchive:'打开完整公民档案 →',
    exchangeTitle:'让九种方法<br><em>互相借光</em>', exchangeIntro:'页面会按北京时间自动生成当天的议程与至少九次跨领域交流。它是基于既有档案的透明模拟；每天 08:00 的自动汇报会另行核验真实的新进展。', agendaLabel:'今日议题', countLabel:'实质交流次数', conveneSmall:"TODAY'S SESSION", convene:'召开今日会议', simulationNote:'档案驱动的议事模拟，不冒充公民在后台自主完成的真实研究。', minutes:'MEETING MINUTES', meetingReady:'会议记录已生成',
    briefTitle:'今日一页简报', briefIntro:'汇总议题、跨域借鉴、九人研究观察与下一步行动。打印时自动整理为单页 A4。', printBrief:'打印 / 保存 A4 PDF', dailyBrief:'DAILY BRIEF · BEIJING 08:00', crossLearning:'跨域借鉴', decisions:'会议决定', researchWatch:'九人研究观察', evidenceNote:'证据说明：网页内容来自已登记档案；“今日观察”是待核验的研究提示，不等于已发生的新成果。每日自动任务会区分已核实进展、外部动态、假设与无变化。', footer:'对话留下记录，判断保留异议，行动等待核验。', home:'返回公地首页 ↗',
    agendas:[
      {title:'能源转型的基础设施与社会许可', thesis:'把技术成熟度、供应链控制、历史先例、联盟承诺与公众理解放进同一套决策视野。'},
      {title:'AI、劳动与可修正的制度', thesis:'讨论自动化如何保留人的独立判断，并为事故、异议与修订留下制度接口。'},
      {title:'证据如何穿过历史、模型与叙事', thesis:'比较档案、数据、预测与公共写作中的证据等级，寻找可共享的核验规则。'},
      {title:'联盟、记忆与长期公共行动', thesis:'从成本承诺、个人经验与公共档案出发，判断合作如何在时间中保持可信。'},
      {title:'跨语言研究如何进入真实世界', thesis:'把多语概念校准、交互表达和产学研转化连接为一条可验证的传播链。'}
    ],
    says:(a,b,work)=>`${a.name}提出：以「${work}」为起点，用${a.method.replace(/。$/,'')}来检验今日议题。她请${b.name}用「${b.tags[0]}」寻找其中尚未显露的边界。`,
    learns:(a,b)=>`方法借鉴：${a.name}吸收${b.name}的${b.capabilities[0].name}，并承诺把结果写成可复议的中间记录。`,
    learnings:(a,b)=>`${a.name}把${b.name}的「${b.tags[0]}」纳入自己的${a.field}研究。`,
    decisionTexts:['每项判断同时标记证据等级、反例与待确认事项。','让九位公民至少各发言一次，再由墨契保存分歧。','把跨域借鉴转化为有负责人、可核验的下一步。'],
    progress:(agent,work)=>agent.id === 'saeon' ? `新万金日监控：核验「${work.title}」中的群山产业、投资、基础设施与政策新闻，记录来源、变化、影响或明确无变化。` : `待核验：复查「${work.title}」的${agent.capabilities[0].name}环节，并记录新增来源或明确无变化。`, countText:n=>`${n} 次实质交流 · 九位公民均已发言`
  },
  en: {
    locale:'en', title:'Agent Commons · Nine-Citizen Assembly', data:'assets/agents.en.json?v=20260901-2',
    navCitizens:'Citizens', navDialogue:'Dialogue', navBrief:'Daily brief', navSystem:'System', navKnowledge:'Knowledge',
    title:'Nine judgments,<br><em>one assembly</em>', intro:'Convened by Chair Jason Zhang, nine citizens exchange evidence, methods, and dissent in a classical civic chamber. Select a citizen to open her dossier and generate a research-led agenda, or select the Chair to enter an ad hoc meeting topic.', liveLabel:"Today's chamber is open", stageLabel:'CITIZEN WORLD · TEN IN ORBIT', stageHint:'Drag any citizen or the Chair to rotate all ten around the Citizen World Totem; select a person to convene a meeting, or hover to reveal a unique Ego motion.', stageAria:'Draggable circular assembly of nine citizens and one presiding Chair, each selectable to convene a meeting', totemLabel:'SOLID CITIZEN WORLD TOTEM · SHARED KNOWLEDGE AXIS', totemAlt:'Solid basalt and bronze Citizen World Totem formed by nine civic rings and a shared knowledge core', chairName:'Jason Zhang', chairRole:'PRESIDING CHAIR', chairAction:'Select to convene ad hoc meeting', chairButtonAria:'Select the 3D avatar of Chair Jason Zhang to enter a topic and convene an ad hoc meeting', chairAvatarAlt:'3D virtual avatar of Chair Jason Zhang wearing traditional Chinese scholar robes',
    temporaryIndex:'PRESIDING CHAIR · AD HOC SESSION', temporaryTitle:'Summon all nine citizens<br><em>for an ad hoc meeting</em>', temporaryIntro:'Enter the topic that needs immediate discussion. The nine citizens will conduct at least nine transparent, dossier-grounded exchanges, saved on this device.', temporaryCallerLabel:'Meeting initiator', temporaryChairMode:'Chair-defined topic', temporaryAgendaLabel:'Ad hoc meeting agenda', temporaryAgendaPlaceholder:'Example: a major policy change affects the Saemangeum energy industry', temporaryAttendance:'Attendance: nine citizens + Chair', temporaryRecord:'Record: this device · reconvenable', temporaryButtonSmall:'SUMMON ALL NINE CITIZENS', temporaryButton:'Summon and start now', temporaryDisclosure:'This meeting is an interactive simulation grounded in existing citizen dossiers, not a claim of new background research.', temporaryLive:'TEMPORARY SESSION · LIVE', temporaryOpen:'Open temporary minutes →', temporaryReady:'Ad hoc meeting started', temporaryThesis:'The Chair summons all nine citizens to examine this urgent issue across disciplines; every judgment keeps its evidence grade, dissent, and next verification step.', citizenTemporaryIndex:agent=>`${agent.alias} · CITIZEN-LED SESSION`, citizenTemporaryTitle:agent=>`${agent.name} convenes<br><em>an ad hoc meeting</em>`, citizenTemporaryIntro:agent=>`The system has randomly matched ${agent.name}'s research direction with another citizen's method to form an editable agenda. Confirm it to begin a ten-person discussion.`, citizenTemporaryMode:agent=>`${agent.field} · research-matched agenda`, citizenAgendaLabel:'Research-matched agenda (editable)', citizenAgendaPlaceholder:'An agenda will be generated from this citizen’s research dossier', citizenButtonSmall:'CITIZEN-LED AD HOC SESSION', citizenButton:'Confirm agenda and start', citizenTemporaryThesis:name=>`${name} convenes a cross-domain ad hoc meeting from their research direction; all nine citizens test the agenda while preserving evidence grades, dissent, and next verification steps.`, citizenTopicPatterns:[(agent,frontier,partner)=>`${agent.field} × ${partner.field}: a cross-domain review of “${frontier}”`,(agent,frontier,partner)=>`${agent.name} convenes: advancing “${frontier}” through ${agent.tags[0]}, with ${partner.name} testing it through ${partner.tags[0]}`,(agent,frontier,partner)=>`From “${frontier}”: how can ${agent.field} borrow from ${partner.field} to define a verifiable next step?`], temporaryMeta:(time,caller)=>`Beijing time ${time} · convened by ${caller} · all nine citizens summoned`, closeDialog:'Close ad hoc meeting dialog',
    dossier:'RESEARCH DOSSIER', researchDirection:'Research direction', method:'Working method', capabilities:'Capability matrix', researchNow:'Current research', researchFrontiers:'Continuous research agenda', openArchive:'Open full citizen archive →',
    exchangeTitle:'Nine methods,<br><em>learning in public</em>', exchangeIntro:'The page generates a Beijing-time agenda and at least nine cross-domain exchanges each day. This is a transparent simulation grounded in existing dossiers; the separate 08:00 report verifies real new progress.', agendaLabel:"Today's agenda", countLabel:'Substantive exchanges', conveneSmall:"TODAY'S SESSION", convene:'Convene today', simulationNote:'A dossier-driven assembly simulation, not a claim that citizens independently researched in the background.', minutes:'MEETING MINUTES', meetingReady:'Minutes generated',
    briefTitle:"Today's one-page brief", briefIntro:'Agenda, cross-domain learning, nine research watches, and next actions—formatted as one A4 page when printed.', printBrief:'Print / save A4 PDF', dailyBrief:'DAILY BRIEF · BEIJING 08:00', crossLearning:'Cross-domain learning', decisions:'Decisions', researchWatch:'Nine research watches', evidenceNote:'Evidence note: page content comes from registered dossiers. “Today’s watch” is a prompt for verification, not a claim of completed new research. The scheduled report separates verified progress, external developments, hypotheses, and no change.', footer:'Dialogue leaves a record; judgment keeps dissent; action awaits verification.', home:'Return to the Commons ↗',
    agendas:[
      {title:'Infrastructure and social license for the energy transition', thesis:'Bring technology readiness, supply-chain control, historical precedent, alliance commitments, and public understanding into one decision frame.'},
      {title:'AI, labor, and institutions that can correct themselves', thesis:'Ask how automation can preserve independent human judgment while institutions retain routes for incident review, dissent, and revision.'},
      {title:'How evidence moves through history, models, and narrative', thesis:'Compare evidence grades in archives, data, forecasts, and public writing to form shared verification rules.'},
      {title:'Alliances, memory, and durable public action', thesis:'Use costly commitments, individual experience, and public archives to judge whether cooperation can remain credible over time.'},
      {title:'Moving multilingual research into the real world', thesis:'Connect multilingual concept alignment, interactive expression, and research commercialization as one verifiable communication chain.'}
    ],
    says:(a,b,work)=>`${a.name} proposes using “${work}” as the entry point and applying this method: ${a.method} She asks ${b.name} to use ${b.tags[0]} to expose a boundary the frame may be hiding.`,
    learns:(a,b)=>`Method transfer: ${a.name} borrows ${b.name}'s ${b.capabilities[0].name} and commits to an interim record that can be challenged.`,
    learnings:(a,b)=>`${a.name} brings ${b.name}'s “${b.tags[0]}” into her work on ${a.field}.`,
    decisionTexts:['Mark every judgment with an evidence grade, counterexample, and pending questions.','Give all nine citizens at least one turn, then let Archivum preserve the disagreements.','Translate cross-domain borrowing into a named, verifiable next action.'],
    progress:(agent,work)=>agent.id === 'saeon' ? `Saemangeum daily watch: verify Gunsan industry, investment, infrastructure, and policy news for “${work.title}”; record sources, change, impact, or an explicit no-change result.` : `To verify: revisit the ${agent.capabilities[0].name} step in “${work.title}” and record either a new source or an explicit no-change result.`, countText:n=>`${n} substantive exchanges · all nine citizens heard`
  },
  ko: {
    locale:'ko', title:'Agent Commons · 아홉 시민 의회', data:'assets/agents.ko.json?v=20260901-2',
    navCitizens:'시민', navDialogue:'대화', navBrief:'일일 브리프', navSystem:'시스템', navKnowledge:'지식 베이스',
    title:'아홉 가지 판단,<br><em>하나의 의회</em>', intro:'장하오 의장이 소집한 아홉 시민이 고전 시민 의회에서 근거, 방법, 이견을 교환합니다. 시민을 선택하면 연구 기록과 무작위 연구 의제가 열리고, 의장을 선택하면 직접 주제를 입력할 수 있습니다.', liveLabel:'오늘의 의회가 열렸습니다', stageLabel:'CITIZEN WORLD · 열 자리 공전', stageHint:'시민이나 의장을 드래그하면 열 사람이 시민 세계 토템 주위를 회전합니다. 인물을 선택해 회의를 열거나 마우스를 올려 고유한 Ego 동작을 확인하세요.', stageAria:'아홉 시민과 한 명의 의장이 드래그로 회전하며 각각 회의를 소집할 수 있는 원형 의회', totemLabel:'시민 세계 실체 토템 · 공동 지식의 축', totemAlt:'실체형 현무암과 청동, 아홉 시민의 고리와 공동 지식 핵으로 이루어진 시민 세계 토템 기둥', chairName:'장하오', chairRole:'PRESIDING CHAIR · 의장', chairAction:'선택하여 임시 회의 소집', chairButtonAria:'장하오 의장의 3D 아바타를 선택해 주제를 입력하고 임시 회의를 소집합니다', chairAvatarAlt:'중국 전통 학자 예복을 입은 장하오 의장의 3D 가상 아바타',
    temporaryIndex:'PRESIDING CHAIR · AD HOC SESSION', temporaryTitle:'아홉 시민을 소집해<br><em>임시 회의를 엽니다</em>', temporaryIntro:'의장이 즉시 논의할 주제를 입력합니다. 아홉 시민이 기존 기록을 바탕으로 최소 아홉 번의 투명한 모의 교류를 진행하며 회의는 이 기기에 저장됩니다.', temporaryCallerLabel:'회의 발의자', temporaryChairMode:'의장이 직접 정하는 주제', temporaryAgendaLabel:'임시 회의 의제', temporaryAgendaPlaceholder:'예: 새만금 에너지 산업에 중대한 정책 변화가 발생함', temporaryAttendance:'참석: 아홉 시민 + 의장', temporaryRecord:'기록: 이 기기 · 재소집 가능', temporaryButtonSmall:'SUMMON ALL NINE CITIZENS', temporaryButton:'지금 소집하고 회의 시작', temporaryDisclosure:'임시 회의는 기존 시민 기록에 기반한 상호작용 시뮬레이션이며 새 연구가 백그라운드에서 완료됐다는 뜻이 아닙니다.', temporaryLive:'TEMPORARY SESSION · 임시 회의 진행 중', temporaryOpen:'임시 회의록 보기 →', temporaryReady:'임시 회의 시작됨', temporaryThesis:'의장이 긴급 의제를 위해 아홉 시민을 소집합니다. 모든 판단은 근거 등급, 이견, 다음 검증 단계를 유지합니다.', citizenTemporaryIndex:agent=>`${agent.alias} · CITIZEN-LED SESSION`, citizenTemporaryTitle:agent=>`${agent.name}이(가) 발의한<br><em>임시 회의</em>`, citizenTemporaryIntro:agent=>`시스템이 ${agent.name}의 연구 방향과 다른 시민의 방법을 무작위로 연결해 편집 가능한 의제를 만들었습니다. 확인하면 열 사람이 함께 토론합니다.`, citizenTemporaryMode:agent=>`${agent.field} · 연구 방향 무작위 의제`, citizenAgendaLabel:'연구 방향 기반 무작위 의제(편집 가능)', citizenAgendaPlaceholder:'이 시민의 연구 기록에서 의제가 생성됩니다', citizenButtonSmall:'CITIZEN-LED AD HOC SESSION', citizenButton:'의제 확인 후 회의 시작', citizenTemporaryThesis:name=>`${name}이(가) 자신의 연구 방향에서 분야 간 임시 회의를 발의했습니다. 아홉 시민은 근거 등급, 이견, 다음 검증 단계를 보존하며 의제를 함께 검토합니다.`, citizenTopicPatterns:[(agent,frontier,partner)=>`${agent.field} × ${partner.field}: “${frontier}”에 대한 분야 간 검토`,(agent,frontier,partner)=>`${agent.name} 발의: ${agent.tags[0]}으로 “${frontier}”을 발전시키고 ${partner.name}이 ${partner.tags[0]} 관점에서 재검토하기`,(agent,frontier,partner)=>`“${frontier}”에서 출발해 ${agent.field}이(가) ${partner.field}을(를) 빌려 검증 가능한 다음 단계를 만드는 법`], temporaryMeta:(time,caller)=>`베이징 시간 ${time} · ${caller} 발의 · 아홉 시민 소집 완료`, closeDialog:'임시 회의 소집 창 닫기',
    dossier:'RESEARCH DOSSIER', researchDirection:'연구 방향', method:'작업 방법', capabilities:'역량 매트릭스', researchNow:'현재 연구', researchFrontiers:'지속 연구 의제', openArchive:'전체 시민 기록 열기 →',
    exchangeTitle:'아홉 방법이<br><em>서로에게 배우는 곳</em>', exchangeIntro:'페이지는 베이징 시간을 기준으로 매일 의제와 최소 아홉 번의 분야 간 교류를 생성합니다. 기존 기록에 기반한 투명한 시뮬레이션이며, 별도의 08:00 보고가 실제 새 진전을 검증합니다.', agendaLabel:'오늘의 의제', countLabel:'실질 교류 횟수', conveneSmall:"TODAY'S SESSION", convene:'오늘 회의 소집', simulationNote:'기록 기반 의회 시뮬레이션이며, 시민이 백그라운드에서 실제 연구를 완료했다는 주장이 아닙니다.', minutes:'MEETING MINUTES', meetingReady:'회의록 생성 완료',
    briefTitle:'오늘의 한 페이지 브리프', briefIntro:'의제, 분야 간 학습, 아홉 연구 관찰, 다음 행동을 인쇄 시 A4 한 장으로 정리합니다.', printBrief:'인쇄 / A4 PDF 저장', dailyBrief:'DAILY BRIEF · BEIJING 08:00', crossLearning:'분야 간 학습', decisions:'회의 결정', researchWatch:'아홉 연구 관찰', evidenceNote:'근거 안내: 페이지 내용은 등록된 기록에서 옵니다. “오늘의 관찰”은 검증할 연구 단서이며 새 성과가 이미 발생했다는 뜻이 아닙니다. 예약 보고는 검증된 진전, 외부 변화, 가설, 변화 없음을 구분합니다.', footer:'대화는 기록을 남기고, 판단은 이견을 보존하며, 행동은 검증을 기다립니다.', home:'공유지 홈으로 돌아가기 ↗',
    agendas:[
      {title:'에너지 전환의 인프라와 사회적 승인', thesis:'기술 성숙도, 공급망 통제, 역사적 선례, 동맹의 약속, 대중의 이해를 하나의 결정 틀에 놓습니다.'},
      {title:'AI, 노동, 스스로 수정할 수 있는 제도', thesis:'자동화가 인간의 독립 판단을 보존하고 사고·이견·수정의 제도 경로를 남기는 방법을 논의합니다.'},
      {title:'근거가 역사·모델·서사를 통과하는 법', thesis:'기록, 데이터, 예측, 공공 글쓰기의 근거 등급을 비교해 공동 검증 규칙을 찾습니다.'},
      {title:'동맹, 기억, 장기 공공 행동', thesis:'비용 있는 약속, 개인 경험, 공공 기록을 통해 협력이 시간 속에서 신뢰를 유지하는지 판단합니다.'},
      {title:'다국어 연구를 현실로 옮기는 법', thesis:'다국어 개념 정렬, 인터랙티브 표현, 산학연 전환을 하나의 검증 가능한 소통 사슬로 연결합니다.'}
    ],
    says:(a,b,work)=>`${a.name}은(는) “${work}”을 출발점으로 삼아 다음 방법으로 오늘의 의제를 검증하자고 제안합니다. ${a.method} 그리고 ${b.name}에게 ${b.tags[0]} 관점에서 숨은 경계를 찾아 달라고 요청합니다.`,
    learns:(a,b)=>`방법 전이: ${a.name}은(는) ${b.name}의 ${b.capabilities[0].name}을 빌리고, 이의를 제기할 수 있는 중간 기록을 남기기로 합니다.`,
    learnings:(a,b)=>`${a.name}이(가) ${b.name}의 “${b.tags[0]}”을(를) 자신의 ${a.field} 연구에 포함합니다.`,
    decisionTexts:['모든 판단에 근거 등급, 반례, 미결 사항을 함께 표시합니다.','아홉 시민이 최소 한 번씩 발언한 뒤 아르키붐이 이견을 보존합니다.','분야 간 차용을 담당자와 검증 기준이 있는 다음 행동으로 바꿉니다.'],
    progress:(agent,work)=>agent.id === 'saeon' ? `새만금 일일 모니터: “${work.title}”의 군산 산업·투자·인프라·정책 뉴스를 확인하고 출처, 변화, 영향 또는 변화 없음을 기록합니다.` : `검증 대기: “${work.title}”의 ${agent.capabilities[0].name} 단계를 다시 확인하고 새 출처 또는 변화 없음을 기록합니다.`, countText:n=>`${n}회 실질 교류 · 아홉 시민 모두 발언`
  }
};

let activeLang = localStorage.getItem('agent-commons-language') || 'zh';
let agents = [];
let researchFrontiers = {};
let selectedAgent = 0;
let dialogueTimer;
let activeTemporarySession = null;
let temporaryCallerIndex = null;
let orbitRotation = 18;
let orbitPointerId = null;
let orbitStartX = 0;
let orbitStartRotation = 0;
let orbitMoved = false;
let suppressOrbitClick = false;
const stage = document.querySelector('#assembly-stage');
const citizenStage = document.querySelector('#citizen-stage');
const chairAvatar = document.querySelector('#chair-avatar');
const temporaryDialog = document.querySelector('#temporary-meeting-dialog');
const temporaryForm = document.querySelector('#temporary-meeting-form');
const temporaryAgenda = document.querySelector('#temporary-agenda');
const temporaryDialogIndex = temporaryDialog.querySelector('.section-index');
const temporaryDialogTitle = document.querySelector('#temporary-dialog-title');
const temporaryDialogIntro = document.querySelector('#temporary-dialog-intro');
const temporaryCallerName = document.querySelector('#temporary-caller-name');
const temporaryCallerField = document.querySelector('#temporary-caller-field');
const temporaryAgendaLabel = document.querySelector('#temporary-agenda-label');
const temporaryButtonSmall = document.querySelector('#temporary-button-small');
const temporaryButtonLabel = document.querySelector('#temporary-button-label');

function beijingParts() {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Shanghai', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return {key:`${values.year}-${values.month}-${values.day}`, year:values.year, month:values.month, day:values.day};
}

function hash(value) {
  let seed = 2166136261;
  for (let i = 0; i < value.length; i += 1) seed = Math.imul(seed ^ value.charCodeAt(i), 16777619);
  return seed >>> 0;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
}

function workHref(agent, index) {
  return `work.html?agent=${encodeURIComponent(agent.id)}&work=${index}&lang=${activeLang}`;
}

function applyCopy(copy) {
  document.documentElement.lang = copy.locale;
  document.title = copy.title;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const value = copy[node.dataset.i18n];
    if (value) node.textContent = value;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(node => {
    const value = copy[node.dataset.i18nHtml];
    if (value) node.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
    const value = copy[node.dataset.i18nPlaceholder];
    if (value) node.setAttribute('placeholder', value);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(node => {
    const value = copy[node.dataset.i18nAria];
    if (value) node.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(node => {
    const value = copy[node.dataset.i18nAlt];
    if (value) node.setAttribute('alt', value);
  });
}

function orbitParticipants() {
  return [chairAvatar, ...citizenStage.querySelectorAll('.delegate')];
}

function updateOrbitPositions() {
  const people = orbitParticipants();
  const step = 360 / people.length;
  const radiusX = stage.clientWidth < 560 ? 36 : stage.clientWidth < 800 ? 40 : 43;
  people.forEach((person, index) => {
    const angle = (orbitRotation + (index * step)) * (Math.PI / 180);
    const depth = Math.cos(angle);
    const depthRatio = (depth + 1) / 2;
    const x = 50 + (Math.sin(angle) * radiusX);
    const footY = 66 + (depth * 25);
    const chairBoost = person === chairAvatar ? 1.04 : 1;
    const scale = (.6 + (depthRatio * .38)) * chairBoost;
    person.style.setProperty('--orbit-x', `${x.toFixed(3)}%`);
    person.style.setProperty('--orbit-y', `${footY.toFixed(3)}%`);
    person.style.setProperty('--orbit-depth', `${(depth * 120).toFixed(2)}px`);
    person.style.setProperty('--orbit-scale', scale.toFixed(4));
    person.style.setProperty('--orbit-opacity', (.7 + (depthRatio * .3)).toFixed(3));
    person.style.setProperty('--orbit-z', String(20 + Math.round(depthRatio * 72)));
    person.style.zIndex = String(20 + Math.round(depthRatio * 72));
  });
}

function renderStage() {
  citizenStage.innerHTML = agents.map((agent, index) => {
    const style = `--delay:${index * .17}s;--agent:${agent.color}`;
    return `<button class="delegate orbit-person${index === selectedAgent ? ' active' : ''}" data-index="${index}" data-orbit-index="${index + 1}" data-ego="${escapeHTML(agent.id)}" type="button" style="${style}" aria-haspopup="dialog" aria-controls="temporary-meeting-dialog" aria-label="${escapeHTML(agent.name)} · ${escapeHTML(agent.field)}">
      <img src="assets/assembly/${agent.id}-ue5.png" data-fallback="${escapeHTML(agent.portrait)}" alt="" draggable="false"><span class="delegate-name">${escapeHTML(agent.name)} · ${escapeHTML(agent.field)}</span><span class="ego-effect ego-${escapeHTML(agent.id)}" aria-hidden="true"><i></i><i></i><i></i></span>
    </button>`;
  }).join('');
  citizenStage.querySelectorAll('img').forEach(image => image.addEventListener('error', () => {
    if (image.dataset.fallback) { image.src = image.dataset.fallback; image.dataset.fallback = ''; }
  }, {once:true}));
  updateOrbitPositions();
}

function renderProfile(index) {
  selectedAgent = index;
  const agent = agents[index];
  document.querySelectorAll('.delegate').forEach((button, buttonIndex) => button.classList.toggle('active', buttonIndex === index));
  const panel = document.querySelector('#research-panel');
  panel.style.setProperty('--agent', agent.color);
  document.querySelector('#profile-order').textContent = `${agent.order} / 09`;
  document.querySelector('#profile-alias').textContent = agent.alias;
  document.querySelector('#profile-name').textContent = agent.name;
  document.querySelector('#profile-field').textContent = agent.field;
  document.querySelector('#profile-statement').textContent = `“${agent.statement}”`;
  document.querySelector('#profile-description').textContent = agent.description;
  document.querySelector('#profile-method').textContent = agent.method;
  document.querySelector('#profile-capabilities').innerHTML = agent.capabilities.map(capability => `<div><span>${escapeHTML(capability.name)}</span><em>${capability.level}</em><i><b style="--level:${capability.level}%"></b></i></div>`).join('');
  document.querySelector('#profile-works').innerHTML = agent.works.map((work,index) => `<a href="${workHref(agent,index)}"><strong>${escapeHTML(work.title)}</strong><span>${escapeHTML(work.status)} ↗</span></a>`).join('');
  const frontierItems = researchFrontiers[agent.id]?.[activeLang] || [];
  document.querySelector('#profile-frontiers').innerHTML = frontierItems.map(item => `<article><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(item.status)}</span><p>${escapeHTML(item.summary)}</p><small>${escapeHTML(item.next)}</small></article>`).join('');
  document.querySelector('#profile-link').href = `index.html?lang=${activeLang}#citizen-${agent.id}`;
}

function populateAgenda(copy) {
  const select = document.querySelector('#agenda-select');
  const todayIndex = hash(beijingParts().key) % copy.agendas.length;
  select.innerHTML = copy.agendas.map((agenda,index) => `<option value="${index}"${index === todayIndex ? ' selected' : ''}>${escapeHTML(agenda.title)}</option>`).join('');
}

function generateMeeting(animate = false, customAgenda = null, temporary = false) {
  const copy = assemblyUI[activeLang];
  const count = Number(document.querySelector('#exchange-count').value);
  const agendaIndex = Number(document.querySelector('#agenda-select').value);
  const agenda = customAgenda || copy.agendas[agendaIndex];
  const seed = hash(`${beijingParts().key}-${agenda.title}`);
  const start = seed % agents.length;
  const exchanges = Array.from({length:count}, (_, index) => {
    const speakerIndex = (start + index) % agents.length;
    const partnerIndex = (speakerIndex + 2 + (index % 4)) % agents.length;
    const speaker = agents[speakerIndex];
    const partner = agents[partnerIndex];
    const work = speaker.works[(seed + index) % speaker.works.length].title;
    return {speaker, partner, speakerIndex, text:copy.says(speaker,partner,work), learning:copy.learns(speaker,partner)};
  });
  document.querySelector('#agenda-title').textContent = agenda.title;
  document.querySelector('#meeting-state').textContent = temporary ? copy.temporaryReady : copy.meetingReady;
  const ledger = document.querySelector('#dialogue-list');
  ledger.innerHTML = exchanges.map(exchange => `<li style="--agent:${exchange.speaker.color}" data-speaker="${exchange.speakerIndex}"><div class="dialogue-speaker"><span>${escapeHTML(exchange.speaker.order)} · ${escapeHTML(exchange.speaker.alias)}</span><strong>${escapeHTML(exchange.speaker.name)}</strong><small>→ ${escapeHTML(exchange.partner.name)}</small></div><div class="dialogue-copy"><p>${escapeHTML(exchange.text)}</p><small>${escapeHTML(exchange.learning)}</small></div></li>`).join('');
  renderBrief(copy, agenda, exchanges, count, seed);
  if (!temporary) localStorage.setItem(`agent-commons-assembly-${beijingParts().key}`, JSON.stringify({agendaIndex,count}));
  if (animate) animateDialogue(exchanges);
}

function animateDialogue(exchanges) {
  window.clearInterval(dialogueTimer);
  let index = 0;
  const mark = () => {
    document.querySelectorAll('.delegate').forEach(button => button.classList.remove('speaking'));
    const current = exchanges[index];
    document.querySelector(`.delegate[data-index="${current.speakerIndex}"]`)?.classList.add('speaking');
    document.querySelectorAll('.dialogue-list li').forEach((row,rowIndex) => row.style.opacity = rowIndex === index ? '1' : '.42');
    index += 1;
    if (index >= exchanges.length) {
      window.clearInterval(dialogueTimer);
      window.setTimeout(() => {
        document.querySelectorAll('.delegate').forEach(button => button.classList.remove('speaking'));
        document.querySelectorAll('.dialogue-list li').forEach(row => { row.style.opacity = '1'; });
      }, 900);
    }
  };
  mark();
  dialogueTimer = window.setInterval(mark, 1050);
}

function renderBrief(copy, agenda, exchanges, count, seed) {
  const date = beijingParts().key;
  document.querySelector('#brief-date').textContent = date;
  document.querySelector('#brief-agenda').textContent = agenda.title;
  document.querySelector('#brief-thesis').textContent = agenda.thesis;
  document.querySelector('#brief-learning').innerHTML = exchanges.slice(0,3).map(exchange => `<li>${escapeHTML(copy.learnings(exchange.speaker,exchange.partner))}</li>`).join('');
  document.querySelector('#brief-decisions').innerHTML = copy.decisionTexts.map(item => `<li>${escapeHTML(item)}</li>`).join('');
  document.querySelector('#brief-progress').innerHTML = agents.map((agent,index) => {
    const dailyWatch = agent.id === 'saeon' ? agent.works.find(work => /新万金|Saemangeum|새만금/i.test(work.title)) : null;
    const work = dailyWatch || agent.works[(seed + index) % agent.works.length];
    return `<div class="progress-line"><strong>${escapeHTML(agent.name)}</strong><span>${escapeHTML(agent.status)}</span><p>${escapeHTML(copy.progress(agent,work))}</p></div>`;
  }).join('');
  document.querySelector('#brief-count').textContent = copy.countText(count);
}

function updateClock() {
  const copy = assemblyUI[activeLang];
  const time = new Intl.DateTimeFormat(copy.locale, {timeZone:'Asia/Shanghai', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false}).format(new Date());
  document.querySelector('#beijing-time').textContent = `CST ${time}`;
}

function temporaryHistoryKey() {
  return 'agent-commons-temporary-meetings';
}

function temporaryTime(timestamp) {
  return new Intl.DateTimeFormat(assemblyUI[activeLang].locale, {timeZone:'Asia/Shanghai', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:false}).format(new Date(timestamp));
}

function showTemporarySession(session) {
  const copy = assemblyUI[activeLang];
  const banner = document.querySelector('#temporary-session');
  document.querySelector('#temporary-session-title').textContent = session.topic;
  document.querySelector('#temporary-session-meta').textContent = copy.temporaryMeta(temporaryTime(session.startedAt), temporaryInitiatorName(session));
  banner.hidden = false;
}

function temporaryInitiator(session) {
  if (!session || !session.callerId || session.callerId === 'chair') return null;
  return agents.find(agent => agent.id === session.callerId) || null;
}

function temporaryInitiatorName(session) {
  return temporaryInitiator(session)?.name || assemblyUI[activeLang].chairName;
}

function temporarySessionThesis(session) {
  const copy = assemblyUI[activeLang];
  const initiator = temporaryInitiator(session);
  return initiator ? copy.citizenTemporaryThesis(initiator.name) : copy.temporaryThesis;
}

function saveTemporarySession(session) {
  let history = [];
  try { history = JSON.parse(localStorage.getItem(temporaryHistoryKey()) || '[]'); } catch (error) { history = []; }
  history.unshift(session);
  localStorage.setItem(temporaryHistoryKey(), JSON.stringify(history.slice(0,5)));
}

function restoreTemporarySession() {
  let history = [];
  try { history = JSON.parse(localStorage.getItem(temporaryHistoryKey()) || '[]'); } catch (error) { history = []; }
  const latest = history.find(session => session && session.date === beijingParts().key && session.topic);
  activeTemporarySession = latest || null;
  document.querySelector('#temporary-session').hidden = !activeTemporarySession;
  if (activeTemporarySession) showTemporarySession(activeTemporarySession);
  return activeTemporarySession;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function citizenMeetingTopic(index) {
  const copy = assemblyUI[activeLang];
  const agent = agents[index];
  if (!agent) return '';
  const partner = randomItem(agents.filter(candidate => candidate.id !== agent.id));
  const frontiers = (researchFrontiers[agent.id]?.[activeLang] || []).map(item => item.title);
  const researchPool = [...frontiers, ...agent.works.map(work => work.title)];
  const frontier = randomItem(researchPool.length ? researchPool : [agent.field]);
  return randomItem(copy.citizenTopicPatterns)(agent, frontier, partner).slice(0, 160);
}

function configureTemporaryDialog(callerIndex = null) {
  const copy = assemblyUI[activeLang];
  const hasCitizenCaller = Number.isInteger(callerIndex) && agents[callerIndex];
  temporaryCallerIndex = hasCitizenCaller ? callerIndex : null;
  const agent = hasCitizenCaller ? agents[callerIndex] : null;
  temporaryDialogIndex.textContent = agent ? copy.citizenTemporaryIndex(agent) : copy.temporaryIndex;
  temporaryDialogTitle.innerHTML = agent ? copy.citizenTemporaryTitle(agent) : copy.temporaryTitle;
  temporaryDialogIntro.textContent = agent ? copy.citizenTemporaryIntro(agent) : copy.temporaryIntro;
  temporaryCallerName.textContent = agent ? agent.name : copy.chairName;
  temporaryCallerField.textContent = agent ? copy.citizenTemporaryMode(agent) : copy.temporaryChairMode;
  temporaryAgendaLabel.textContent = agent ? copy.citizenAgendaLabel : copy.temporaryAgendaLabel;
  temporaryAgenda.setAttribute('placeholder', agent ? copy.citizenAgendaPlaceholder : copy.temporaryAgendaPlaceholder);
  temporaryButtonSmall.textContent = agent ? copy.citizenButtonSmall : copy.temporaryButtonSmall;
  temporaryButtonLabel.textContent = agent ? copy.citizenButton : copy.temporaryButton;
  temporaryAgenda.value = agent ? citizenMeetingTopic(callerIndex) : '';
}

function openTemporaryDialog(callerIndex = null) {
  configureTemporaryDialog(callerIndex);
  if (typeof temporaryDialog.showModal === 'function') temporaryDialog.showModal();
  else temporaryDialog.setAttribute('open','');
  window.setTimeout(() => {
    temporaryAgenda.focus();
    if (temporaryCallerIndex !== null) temporaryAgenda.select();
  }, 40);
}

function closeTemporaryDialog() {
  if (typeof temporaryDialog.close === 'function') temporaryDialog.close();
  else temporaryDialog.removeAttribute('open');
}

function openTemporaryMinutes(animate = true) {
  if (!activeTemporarySession || !agents.length) return;
  generateMeeting(animate, {title:activeTemporarySession.topic, thesis:temporarySessionThesis(activeTemporarySession)}, true);
  document.querySelector('#exchange').scrollIntoView({behavior:'smooth'});
}

function startTemporaryMeeting(event) {
  event.preventDefault();
  const topic = temporaryAgenda.value.trim();
  if (!topic || !agents.length) return;
  const initiator = temporaryCallerIndex === null ? null : agents[temporaryCallerIndex];
  activeTemporarySession = {topic, callerId:initiator?.id || 'chair', startedAt:Date.now(), date:beijingParts().key};
  saveTemporarySession(activeTemporarySession);
  showTemporarySession(activeTemporarySession);
  closeTemporaryDialog();
  openTemporaryMinutes(true);
}

function restoreMeeting() {
  const raw = localStorage.getItem(`agent-commons-assembly-${beijingParts().key}`);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    document.querySelector('#exchange-count').value = Math.min(18,Math.max(9,Number(saved.count) || 9));
    document.querySelector('#count-output').textContent = document.querySelector('#exchange-count').value;
    if (saved.agendaIndex >= 0 && saved.agendaIndex < assemblyUI[activeLang].agendas.length) document.querySelector('#agenda-select').value = saved.agendaIndex;
  } catch (error) { /* Ignore damaged local state. */ }
}

async function setLanguage(language) {
  activeLang = assemblyUI[language] ? language : 'zh';
  localStorage.setItem('agent-commons-language', activeLang);
  const copy = assemblyUI[activeLang];
  applyCopy(copy);
  document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active', button.dataset.lang === activeLang));
  const [response, frontiersResponse] = await Promise.all([
    fetch(copy.data),
    fetch('assets/research-frontiers.json?v=20260902-2')
  ]);
  if (!response.ok || !frontiersResponse.ok) throw new Error('Citizen research archive unavailable');
  agents = (await response.json()).sort((a, b) => a.order.localeCompare(b.order));
  researchFrontiers = (await frontiersResponse.json()).citizens || {};
  if (agents.length !== 9) throw new Error(`Expected nine citizens, received ${agents.length}`);
  populateAgenda(copy);
  restoreMeeting();
  renderStage();
  renderProfile(Math.min(selectedAgent,agents.length - 1));
  const temporarySession = restoreTemporarySession();
  if (temporarySession) generateMeeting(false, {title:temporarySession.topic, thesis:temporarySessionThesis(temporarySession)}, true);
  else generateMeeting(false);
  const date = beijingParts().key;
  document.querySelector('#stage-date').textContent = `BEIJING · ${date}`;
}

citizenStage.addEventListener('click', event => {
  const button = event.target.closest('.delegate');
  if (!button) return;
  const index = Number(button.dataset.index);
  renderProfile(index);
  openTemporaryDialog(index);
});

document.querySelector('.language-switch').addEventListener('click', event => {
  const button = event.target.closest('[data-lang]');
  if (button && button.dataset.lang !== activeLang) setLanguage(button.dataset.lang);
});

document.querySelector('#exchange-count').addEventListener('input', event => {
  document.querySelector('#count-output').textContent = event.target.value;
});
document.querySelector('#exchange-count').addEventListener('change', () => generateMeeting(false));
document.querySelector('#agenda-select').addEventListener('change', () => generateMeeting(false));
document.querySelector('#convene-button').addEventListener('click', () => generateMeeting(true));
document.querySelector('#stage-convene').addEventListener('click', () => {
  document.querySelector('#exchange').scrollIntoView({behavior:'smooth'});
  generateMeeting(true);
});
chairAvatar.addEventListener('click', () => openTemporaryDialog(null));
document.querySelector('#temporary-dialog-close').addEventListener('click', closeTemporaryDialog);
temporaryForm.addEventListener('submit', startTemporaryMeeting);
document.querySelector('#temporary-session-open').addEventListener('click', () => openTemporaryMinutes(true));
temporaryDialog.addEventListener('click', event => {
  if (event.target === temporaryDialog) closeTemporaryDialog();
});
document.querySelector('#print-brief').addEventListener('click', () => window.print());

stage.addEventListener('click', event => {
  if (!suppressOrbitClick) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  suppressOrbitClick = false;
}, true);

stage.addEventListener('pointerdown', event => {
  const person = event.target.closest('.orbit-person');
  if (!person || event.button !== 0) return;
  orbitPointerId = event.pointerId;
  orbitStartX = event.clientX;
  orbitStartRotation = orbitRotation;
  orbitMoved = false;
  stage.classList.add('orbit-dragging');
  stage.setPointerCapture?.(event.pointerId);
});

stage.addEventListener('pointermove', event => {
  if (event.pointerId !== orbitPointerId) return;
  const distance = event.clientX - orbitStartX;
  if (Math.abs(distance) > 3) orbitMoved = true;
  if (!orbitMoved) return;
  event.preventDefault();
  orbitRotation = orbitStartRotation + (distance * .34);
  updateOrbitPositions();
});

function finishOrbitDrag(event, cancelled = false) {
  if (event.pointerId !== orbitPointerId) return;
  stage.releasePointerCapture?.(event.pointerId);
  stage.classList.remove('orbit-dragging');
  if (orbitMoved && !cancelled) {
    suppressOrbitClick = true;
    window.setTimeout(() => { suppressOrbitClick = false; }, 400);
  }
  orbitPointerId = null;
  orbitMoved = false;
}

stage.addEventListener('pointerup', event => finishOrbitDrag(event));
stage.addEventListener('pointercancel', event => finishOrbitDrag(event, true));
stage.addEventListener('keydown', event => {
  if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  orbitRotation += event.key === 'ArrowLeft' ? -18 : 18;
  updateOrbitPositions();
});
window.addEventListener('resize', updateOrbitPositions);

updateClock();
window.setInterval(updateClock,1000);
setLanguage(activeLang).catch(() => {
  document.querySelector('#citizen-stage').innerHTML = '<p class="load-error">Citizen archive unavailable.</p>';
});
