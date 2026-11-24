from pathlib import Path
import json,zipfile,hashlib,collections
import sys
D=Path(__file__).resolve().parent;raw=zipfile.ZipFile(sys.argv[1]).read('PUB08A.txt');records=[]
for i,r in enumerate(raw.splitlines(),1):
 if r[:2]==b'12' and r[6:10] in [b'0109',b'1208']:records.append((i,r[35:37].decode(),'cross' if r[6:10]==b'0109' else 'same',int(r[88:92]),int(r[221:230]),int(r[230:241])))
rows=[]
for cuts in [[500,1000],[250,750,1500],[1000]]:
 g=collections.defaultdict(lambda:{'cross':[],'same':[]})
 for x in records:
  if x[3]>0:g[(x[1],sum(x[3]>=a for a in cuts))][x[2]].append(x)
 for ms in [1,2]:
  c=[v for v in g.values() if len(v['cross'])>=2 and len(v['same'])>=ms and sum(x[4] for x in v['cross'])>0 and sum(x[4] for x in v['same'])>0];t=sum(x[4] for v in c for x in v['cross']);cr=sum(x[5] for v in c for x in v['cross'])/t;std=sum(sum(x[5] for x in v['same'])/sum(x[4] for x in v['same'])*sum(x[4] for x in v['cross'])/t for v in c);rows.append(dict(cuts=cuts,minCross=2,minSame=ms,cells=len(c),crossRows=sum(len(v['cross']) for v in c),tons=t,gap=cr-std))
(D/'sigma-correction.json').write_text(json.dumps(dict(correction='Nov22 table said each group; implementation filtered cross group only. Original preserved.',sha256=hashlib.sha256(raw).hexdigest(),rows=rows),indent=2));print(rows)
rows=[]
for soh in [1,.8]:
 for initial in [.9,.5]:
  e=100*soh*(initial-.15)*.9;rows.append(dict(nominalKWh=100,SOH=soh,initialSOC=initial,minSOC=.15,efficiency=.9,criticalKW=10,auxiliaryKW=1,inverterLimitKW=12,availableACKWh=e,hours=e/11))
(D/'energy-reserve.json').write_text(json.dumps(dict(synthetic=True,notSAMRun=True,rows=rows),indent=2))
original={'A':'a','B':'b'};files={'a':'alpha','b':'beta'};swapped={'A':'b','B':'a'}
(D/'nullroute-ownership.json').write_text(json.dumps(dict(synthetic=True,source=original,swapped=swapped,bytesUnchanged=True,allAttachmentsPresent=True,uniqueIds=True,ownershipMatches=original==swapped,lesson='An intact byte set does not prove correct object attachment relationships.'),indent=2))
rows=[]
for p in [.01,.1,.5]:
 for label,se,sp in [('A',.9,.9),('B',.7,.99)]:
  tp=round(10000*p*se);fp=round(10000*(1-p)*(1-sp));rows.append(dict(prevalence=p,model=label,TP=tp,FP=fp,flagged=tp+fp,reviewMinutesPerCase=5,totalReviewHours=(tp+fp)*5/60))
(D/'pharma-review-load.json').write_text(json.dumps(dict(synthetic=True,notRealReviewPerformance=True,rows=rows),indent=2))
