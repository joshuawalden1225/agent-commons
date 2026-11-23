from pathlib import Path
import json,hashlib,copy
D=Path(__file__).resolve().parent
base=[dict(id='A',attachment='a'),dict(id='B',attachment='b')];payload={'a':'alpha','b':'beta'}
exports=[('exact',base,payload),('duplicate-id',[base[0],dict(id='A',attachment='b')],payload),('missing-attachment',base,{'a':'alpha'}),('changed-bytes',base,dict(payload,b='changed'))]
rows=[]
for name,records,files in exports:
 checks=dict(rowCount=len(records)==2,uniqueIds=len({x['id'] for x in records})==len(records),identitySet={x['id'] for x in records}=={'A','B'},attachmentPresent=all(x['attachment'] in files for x in records),attachmentDigest=all(k in files and hashlib.sha256(v.encode()).hexdigest()==hashlib.sha256(files[k].encode()).hexdigest() for k,v in payload.items()))
 rows.append(dict(case=name,checks=checks,passAll=all(checks.values())))
(D/'nullroute-cases.json').write_text(json.dumps(dict(synthetic=True,notDVLAData=True,rows=rows),indent=2))
rows=[]
for p in [.01,.1,.5]:
 for fpCost in [1,10]:
  for label,sens,spec in [('A',.9,.9),('B',.7,.99)]:
   fn=round(10000*p*(1-sens));fp=round(10000*(1-p)*(1-spec));rows.append(dict(prevalence=p,model=label,sensitivity=sens,specificity=spec,FP=fp,FN=fn,falsePositiveCost=fpCost,falseNegativeCost=1,totalCost=fp*fpCost+fn))
(D/'pharma-costs.json').write_text(json.dumps(dict(synthetic=True,notWorkadoMeasuredPerformance=True,N=10000,rows=rows),indent=2))
