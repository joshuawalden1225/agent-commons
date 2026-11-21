from pathlib import Path
import zipfile,json,hashlib,collections,sys
D=Path(__file__).resolve().parent if 'research' in str(Path(__file__).resolve()) else Path('/tmp/commons-release21/research/2026-11-21');p=Path(sys.argv[1]);z=zipfile.ZipFile(p);raw=z.read('PUB08A.txt');g=collections.defaultdict(lambda:{'cross':[],'same':[]});excluded=[]
for i,r in enumerate(raw.splitlines(),1):
 if r[:2]!=b'12':continue
 k='cross' if r[6:10]==b'0109' else 'same' if r[6:10]==b'1208' else None
 if not k:continue
 miles=int(r[88:92]);band='0' if miles==0 else '1-499' if miles<500 else '500-999' if miles<1000 else '1000+'
 g[(r[35:37].decode(),band)][k].append((i,int(r[221:230]),int(r[230:241]),miles))
rows=[]
for (code,band),a in sorted(g.items()):
 o=dict(stcc2=code,mileBand=band)
 for k,v in a.items():o[k]=dict(n=len(v),tons=sum(x[1] for x in v),revenue=sum(x[2] for x in v),rowNumbers=[x[0] for x in v]);o[k]['ratio']=o[k]['revenue']/o[k]['tons'] if o[k]['tons'] else None
 o['commonSupport']=all(o[k]['tons']>0 for k in a) and band!='0';rows.append(o)
common=[r for r in rows if r['commonSupport']];t=sum(r['cross']['tons'] for r in common);c=sum(r['cross']['revenue'] for r in common)/t;s=sum(r['same']['ratio']*r['cross']['tons']/t for r in common)
out=dict(source='https://www.stb.gov/wp-content/uploads/PublicUseWaybillSample2008.zip',memberSha256=hashlib.sha256(raw).hexdigest(),field='columns 89–92, shortest rail distance rounded to nearest ten miles; not actual route',exploratory=True,rows=rows,commonCells=len(common),crossRows=sum(r['cross']['n'] for r in common),crossTons=t,crossRatio=c,standardizedSameRatio=s,difference=c-s)
(D/'sigma-distance.json').write_text(json.dumps(out,indent=2)+'\n');print({k:v for k,v in out.items() if k!='rows'})
