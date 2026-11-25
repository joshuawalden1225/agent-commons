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

weights=[]
for cuts,vs in groups:
 ws=[]
 for v in vs:
  targettons=sum(x[4] for x in v['cross'] if x[0] in common)
  same=sum(x[4] for x in v['same'])
  ws.extend((x[0],targettons/tons*x[4]/same) for x in v['same'] if targettons)
 assert abs(sum(w for _,w in ws)-1)<1e-10
 weights.append(dict(cuts=cuts,referenceRows=len(ws),maxWeight=max(w for _,w in ws),top10Share=sum(sorted((w for _,w in ws),reverse=True)[:10]),effectiveRows=1/sum(w*w for _,w in ws)))
(D/'sigma-weights.json').write_text(json.dumps(dict(sourceSha256=hashlib.sha256(raw).hexdigest(),fixedTargetRows=len(common),fixedTargetTons=tons,rows=weights,limit='Weighted reference concentration; descriptive effective count, not survey design ESS.'),indent=2))
print(weights)
