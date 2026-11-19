from pathlib import Path
import zipfile,json,hashlib,collections
D=Path(__file__).resolve().parent;D.mkdir(parents=True,exist_ok=True)
import sys
p=Path(sys.argv[1]);raw=zipfile.ZipFile(p).read('PUB08A.txt'); g=collections.defaultdict(lambda:{'cross':[],'same':[]})
for i,r in enumerate(raw.splitlines(),1):
 if r[:2]!=b'12':continue
 k='cross' if r[6:10]==b'0109' else 'same' if r[6:10]==b'1208' else None
 if k:g[r[35:37].decode()][k].append((i,int(r[221:230]),int(r[230:241])))
rows=[]
for code,a in sorted(g.items()):
 o={'stcc2':code}
 for k,v in a.items():o[k]={'n':len(v),'tons':sum(x[1] for x in v),'revenue':sum(x[2] for x in v),'rowNumbers':[x[0] for x in v]};o[k]['ratio']=o[k]['revenue']/o[k]['tons'] if o[k]['tons'] else None
 o['commonSupport']=all(o[k]['n']>0 and o[k]['tons']>0 for k in a);o['difference']=o['cross']['ratio']-o['same']['ratio'] if o['commonSupport'] else None;rows.append(o)
common=[x for x in rows if x['commonSupport']];crossT=sum(x['cross']['tons'] for x in common);std=sum(x['same']['ratio']*x['cross']['tons']/crossT for x in common)
o={'memberSha256':hashlib.sha256(raw).hexdigest(),'source':'https://www.stb.gov/wp-content/uploads/PublicUseWaybillSample2008.zip','eventYear':2008,'stccLocator':'1-based columns 36-37 (first two of STCC 36-40)','rows':rows,'commonGroupCount':len(common),'allGroupCount':len(rows),'positiveDifferences':sum(x['difference']>0 for x in common),'crossTonWeightedSameRatio':std,'crossCommonRatio':sum(x['cross']['revenue'] for x in common)/crossT};(D/'sigma-groups.json').write_text(json.dumps(o,indent=2)+'\n')
print({k:v for k,v in o.items() if k!='rows'});print([(x['stcc2'],x['cross']['n'],x['same']['n'],x['difference']) for x in rows])
