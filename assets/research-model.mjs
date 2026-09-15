export const languages = ['zh', 'en', 'ko'];
export const states = ['ready', 'active', 'awaiting_review', 'done', 'blocked'];
export const localize = (value, language = 'zh') => value?.[language] ?? value?.zh ?? '';

export function validateWork(board) {
  const errors = [];
  if (board.version !== 2) errors.push('Unsupported work version');
  if (board.citizens?.length !== 9) errors.push('Expected nine citizens');
  const ids = new Set(board.citizens?.map(c => c.id));
  if (ids.size !== 9) errors.push('Citizen IDs must be unique');
  const tasks = new Map();
  for (const task of board.tasks || []) {
    if (tasks.has(task.id)) errors.push(`Duplicate task: ${task.id}`);
    tasks.set(task.id, task);
    if (!ids.has(task.ownerId) || !ids.has(task.reviewerId) || task.ownerId === task.reviewerId) errors.push(`Invalid responsibility: ${task.id}`);
    if (!states.includes(task.state)) errors.push(`Invalid state: ${task.id}`);
    for (const key of ['title', 'question', 'deliverable', 'nextAction']) {
      if (languages.some(lang => !task[key]?.[lang]?.trim())) errors.push(`Missing translation: ${task.id}.${key}`);
    }
    if (!task.acceptance?.length || task.acceptance.some(a => languages.some(l => !a[l]))) errors.push(`Missing acceptance: ${task.id}`);
    if (task.state === 'blocked' && (!task.blockedReason || !task.resumeAt)) errors.push(`Missing blocker/checkpoint: ${task.id}`);
  }
  for (const citizen of board.citizens || []) {
    if (tasks.get(citizen.primaryTaskId)?.ownerId !== citizen.id || tasks.get(citizen.backupTaskId)?.ownerId !== citizen.id) errors.push(`Missing owned work: ${citizen.id}`);
    if (board.tasks.filter(t => t.ownerId === citizen.id && t.state === 'active').length > 1) errors.push(`Too many active tasks: ${citizen.id}`);
  }
  for (const task of tasks.values()) {
    if (task.dependsOn.some(id => !tasks.has(id))) errors.push(`Unknown dependency: ${task.id}`);
    if (task.state === 'done' && !board.deliveries.some(d => d.taskId === task.id && d.review?.decision === 'accept')) errors.push(`Unreviewed completion: ${task.id}`);
  }
  const visiting = new Set(), visited = new Set();
  function visit(id) {
    if (visiting.has(id)) { errors.push(`Dependency cycle: ${id}`); return; }
    if (visited.has(id)) return;
    visiting.add(id);
    (tasks.get(id)?.dependsOn || []).forEach(visit);
    visiting.delete(id); visited.add(id);
  }
  tasks.forEach((_, id) => visit(id));
  return errors;
}

export function planWork(board, date) {
  const tasks = new Map(board.tasks.map(t => [t.id, t]));
  return [...board.citizens].sort((a,b) => a.order.localeCompare(b.order)).map(citizen => {
    const owned = board.tasks.filter(t => t.ownerId === citizen.id);
    const eligible = owned.filter(t => ['ready','active'].includes(t.state) && t.dependsOn.every(id => tasks.get(id)?.state === 'done'));
    eligible.sort((a,b) => Number(b.state === 'active') - Number(a.state === 'active') || a.priority - b.priority);
    return {citizenId:citizen.id, taskId:eligible[0]?.id || null,
      reason:eligible[0]?.lane === 'backup' ? 'primary_unavailable_use_backup' : eligible.length ? 'next_actionable_task' : 'needs_input_or_new_task',
      recheck:owned.filter(t => t.state === 'blocked' && t.resumeAt <= date).map(t => t.id)};
  });
}

export function workCounts(board) {
  return {citizens:board.citizens.length, actionable:board.tasks.filter(t => ['ready','active'].includes(t.state) && t.dependsOn.every(id => board.tasks.find(d => d.id === id)?.state === 'done')).length,
    blocked:board.tasks.filter(t => t.state === 'blocked').length, delivered:board.deliveries.length,
    reviewed:board.deliveries.filter(d => d.review?.decision === 'accept').length};
}
