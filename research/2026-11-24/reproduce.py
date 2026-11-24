from pathlib import Path
import json,sys,zipfile,collections,hashlib
D=Path(__file__).resolve().parent;raw=zipfile.ZipFile(sys.argv[1]).read('PUB08A.txt');rs=[]
for i,r in enumerate(raw.splitlines(),1):
 if r[:2]==b'12' and r[6:10] in [b'0109',b'1208'] and int(r[88:92])>0:rs.append((i,r[35:37].decode(),'cross' if r[6:10]==b'0109' else 'same',int(r[88:92]),int(r[221:230]),int(r[230:241])))
sets=[];groups=[]
for cuts in [[500,1000],[250,750,1500],[1000]]:
 g=collections.defaultdict(lambda:{'cross':[],'same':[]})
 for x in rs:g[(x[1],sum(x[3]>=a for a in cuts))][x[2]].append(x)
 valid=[v for v in g.values() if len(v['cross'])>=2 and len(v['same'])>=2 and sum(x[4] for x in v['cross'])>0 and sum(x[4] for x in v['same'])>0];sets.append({x[0] for v in valid for x in v['cross']});groups.append((cuts,valid))
common=set.intersection(*sets);target=[x for x in rs if x[0] in common];tons=sum(x[4] for x in target);ratio=sum(x[5] for x in target)/tons;rows=[]
for cuts,vs in groups:
 std=sum(sum(x[5] for x in v['same'])/sum(x[4] for x in v['same'])*sum(x[4] for x in v['cross'] if x[0] in common)/tons for v in vs);rows.append(dict(cuts=cuts,standardized=std,gap=ratio-std))
(D/'sigma-fixed.json').write_text(json.dumps(dict(sha256=hashlib.sha256(raw).hexdigest(),crossIds=sorted(common),crossRows=len(common),tons=tons,crossRatio=ratio,rows=rows,limit='Fixed target cross-year cohort; comparison same-year bins still differ; not causal.'),indent=2));print(len(common),tons,ratio,rows)
rows=[]
for p in [.01,.1,.5]:
 for label,se,sp in [('A',.9,.9),('B',.7,.99)]:
  tp=round(10000*p*se);fp=round(10000*(1-p)*(1-sp));fn=round(10000*p*(1-se));appeal=.2*fn;rows.append(dict(prevalence=p,model=label,FN=fn,expectedFNappeals=appeal,flagged=tp+fp,expectedReviewHours=(tp+fp+appeal)*5/60,unappealedFN=.8*fn))
(D/'pharma-appeals.json').write_text(json.dumps(dict(synthetic=True,appealRateAssumption=.2,reviewMinutesAssumption=5,rows=rows),indent=2))
a={'A':{'file':'a','permission':'restricted'},'B':{'file':'b','permission':'public'}};b={'A':{'file':'b','permission':'public'},'B':{'file':'a','permission':'restricted'}}
(D/'nullroute-joint.json').write_text(json.dumps(dict(synthetic=True,source=a,export=b,idsMatch=set(a)==set(b),filesMatch=sorted(x['file'] for x in a.values())==sorted(x['file'] for x in b.values()),permissionCountsMatch=sorted(x['permission'] for x in a.values())==sorted(x['permission'] for x in b.values()),objectMappingsMatch=a==b),indent=2))
