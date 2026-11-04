import json,math
from pathlib import Path
p=Path(__file__).parent
d=json.loads(Path('research/2026-10-31/sigma-paired-values.json').read_text())
v={(r['year'],r['measure']):r['directory2010'] for r in d['rows']}
r0,r1=v[2000,'freightRevenue'],v[2008,'freightRevenue'];q0,q1=v[2000,'revenueTonMiles'],v[2008,'revenueTonMiles']
y0,y1=r0/q0,r1/q1
result={'saeon':[{'auxMW':a,'backupHoursAfterShift':(.8*.9-(.15+a)*2)/(.2+a)} for a in [0,.005,.01,.02]],
 'sigma':{'revenueChangeMillionUSD':r1-r0,'volumeContributionMillionUSD':(q1-q0)*(y0+y1)/2,'yieldContributionMillionUSD':(y1-y0)*(q0+q1)/2,'method':'two-factor symmetric/Shapley decomposition, nominal revenue, not causal price attribution'},
 'pharma':[{'prevalence':p,'sensitivity':.8,'targetPPV':.9,'requiredSpecificity':1-(.8*p*(1-.9))/(.9*(1-p))} for p in [.01,.1,.5]],
 'cynosure':{'p':[.6,.65],'outcomes':[1,1],'meanBrier':((.6-1)**2+(.65-1)**2)/2,'constantHalfMeanBrier':.25,'descriptiveSkillVsHalf':1-(((.6-1)**2+(.65-1)**2)/2)/.25,'leaveOneOutMeans':[.1225,.16]}}
assert abs(result['sigma']['volumeContributionMillionUSD']+result['sigma']['yieldContributionMillionUSD']-(r1-r0))<1e-8
(p/'calculations.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
