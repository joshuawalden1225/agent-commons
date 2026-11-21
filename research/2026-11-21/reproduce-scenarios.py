from pathlib import Path
import json
D=Path(__file__).resolve().parent
rows=[]
for p in [.01,.1,.5]:
 n=10000;tp=n*p*.9;fn=n*p*.1;fp=n*(1-p)*.1;tn=n*(1-p)*.9;rows.append(dict(prevalence=p,N=n,TP=tp,FN=fn,FP=fp,TN=tn,accuracy=(tp+tn)/n,positivePredictiveValue=tp/(tp+fp)))
(D/'pharma-scenarios.json').write_text(json.dumps(dict(synthetic=True,notWorkadoMeasuredPerformance=True,sensitivity=.9,specificity=.9,rows=rows),indent=2))
original=[dict(id='A',link=None,permission='restricted'),dict(id='B',link='A',permission='public')]
exports=[('exact',original),('missing-row',[original[0]]),('broken-reference',[original[0],dict(id='B',link='Z',permission='public')]),('permission-loss',[dict(x,permission='public') for x in original])]
o=[]
for name,v in exports:
 ids={x['id'] for x in v};checks=dict(rowCount=len(v)==len(original),references=all(x['link'] is None or x['link'] in ids for x in v),permissions=all(x['permission']==next(a['permission'] for a in original if a['id']==x['id']) for x in v));o.append(dict(case=name,export=v,checks=checks,passAll=all(checks.values())))
(D/'nullroute-rehearsal.json').write_text(json.dumps(dict(synthetic=True,notDVLAData=True,source=original,rows=o),indent=2));print(rows,o)
