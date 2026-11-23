from pathlib import Path
import json,zipfile,hashlib,sys,collections
D=Path(__file__).resolve().parent;raw=zipfile.ZipFile(sys.argv[1]).read('PUB08A.txt');records=[]
for i,r in enumerate(raw.splitlines(),1):
 if r[:2]==b'12' and r[6:10] in [b'0109',b'1208']:records.append((i,r[35:37].decode(),'cross' if r[6:10]==b'0109' else 'same',int(r[88:92]),int(r[221:230]),int(r[230:241])))
rows=[]
for cuts in [[500,1000],[250,750,1500],[1000]]:
 g=collections.defaultdict(lambda:{'cross':[],'same':[]})
 for x in records:
  if x[3]>0:g[(x[1],sum(x[3]>=a for a in cuts))][x[2]].append(x)
 for minimum in [1,2]:
  c=[v for v in g.values() if len(v['cross'])>=minimum and v['same'] and sum(x[4] for x in v['cross'])>0 and sum(x[4] for x in v['same'])>0];t=sum(x[4] for v in c for x in v['cross']);cr=sum(x[5] for v in c for x in v['cross'])/t;std=sum(sum(x[5] for x in v['same'])/sum(x[4] for x in v['same'])*sum(x[4] for x in v['cross'])/t for v in c);rows.append(dict(cutsMiles=cuts,minCrossRows=minimum,cells=len(c),crossRows=sum(len(v['cross']) for v in c),crossTons=t,retainedTonShare=t/1265884,crossRatio=cr,standardizedSameRatio=std,difference=cr-std))
out=dict(exploratory=True,sourceMemberSha256=hashlib.sha256(raw).hexdigest(),zeroDistance={k:sum(x[3]==0 and x[2]==k for x in records) for k in ['cross','same']},rows=rows);(D/'sigma-bins.json').write_text(json.dumps(out,indent=2)+'\n');print(out)
