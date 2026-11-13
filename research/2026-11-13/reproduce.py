"""Usage: python reproduce.py cadastral.pdf PublicUseWaybillSample2008.zip (requires pypdf)."""
from pathlib import Path
import json,re,collections,hashlib,sqlite3,tempfile,zipfile,sys
from pypdf import PdfReader
D=Path(__file__).parent;D.mkdir(exist_ok=True)
# full attachment extraction; ordinal repeats by area, do not deduplicate on ordinal alone
p=Path(sys.argv[1]);r=PdfReader(p);rows=[];unmatched=[]
for page,pg in enumerate(r.pages,1):
 for line in pg.extract_text().splitlines():
  if re.match(r'^\d+\s+지적',line):
   m=re.match(r'^(\d+)\s+(지적\S+)\s+(\S+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+(\S+)\s+(.*?)\s+(\d{8})\s+(\S+)\s*(.*)$',line)
   if m:
    n,kind,name,x,y,origin,location,date,material,remark=m.groups();rows.append(dict(page=page,ordinal=int(n),kind=kind,name=name,x=x,y=y,origin=origin,location=location.strip(),observed=date,material=material,remark=remark))
   else:unmatched.append(dict(page=page,line=line))
key=lambda t:(t['kind'],t['name'],t['x'],t['y'])
counts=collections.Counter(key(x) for x in rows)
out=dict(sourceUrl='https://www.saemangeum.go.kr/common/fileDown.do?key=37470&type=brd',sha256=hashlib.sha256(p.read_bytes()).hexdigest(),pages=len(r.pages),parsedRows=len(rows),unmatched=unmatched,kindCounts=dict(collections.Counter(x['kind'] for x in rows)),yearCounts=dict(sorted(collections.Counter(x['observed'][:4] for x in rows).items())),duplicateCompositeKeys=[list(k) for k,v in counts.items() if v>1],duplicateOrdinals=len(rows)-len(set(x['ordinal'] for x in rows)),missingLocation=sum(not x['location'] for x in rows),rows=rows)
(D/'saeon-points.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print({k:v for k,v in out.items() if k!='rows'})
z=zipfile.ZipFile(sys.argv[2]);groups=collections.defaultdict(lambda:dict(rows=0,net=0,absolute=0));examples=[]
for n,row in enumerate(z.read('PUB08A.txt').splitlines(),1):
 period=row[6:10].decode();delta=int(row[230:241])-int(row[54:63])*int(row[99:102]);g=groups[period];g['rows']+=1;g['net']+=delta;g['absolute']+=abs(delta)
 if delta:examples.append(dict(row=n,accountingPeriod=period,delta=delta,stcc5=row[35:40].decode()))
out=dict(records=sum(g['rows'] for g in groups.values()),groups=dict(sorted(groups.items())),exceptions=examples,columns='Accounting period MMYY columns 7-10; revenue 55-63, factor100-102, expanded231-241',zipSHA256=hashlib.sha256(Path(sys.argv[2]).read_bytes()).hexdigest());(D/'sigma-results.json').write_text(json.dumps(out,indent=2)+'\n');print(out)
with tempfile.TemporaryDirectory() as tmp:
 a=sqlite3.connect(tmp+'/control.db');a.executescript('CREATE TABLE parent(id PRIMARY KEY); CREATE TABLE child(id PRIMARY KEY,p REFERENCES parent(id));');a.execute('PRAGMA foreign_keys=ON');b=sqlite3.connect(tmp+'/control.db');b.execute('PRAGMA foreign_keys=OFF');res=[]
 for label,c,id in [('A',a,1),('B',b,2)]:
  try:c.execute('INSERT INTO child VALUES(?,99)',[id]);c.commit();accepted=True
  except sqlite3.IntegrityError:c.rollback();accepted=False
  res.append(dict(connection=label,enabled=c.execute('PRAGMA foreign_keys').fetchone()[0],accepted=accepted))
 out=dict(synthetic=True,sqliteVersion=sqlite3.sqlite_version,connections=res,visibleFromA=a.execute('SELECT * FROM child').fetchall(),violationsFromA=a.execute('PRAGMA foreign_key_check').fetchall());assert not res[0]['accepted'] and res[1]['accepted'];(D/'nullroute-results.json').write_text(json.dumps(out,indent=2)+'\n');print(out)
