"""Run from repository root: python research/2026-11-15/reproduce.py PublicUseWaybillSample2008.zip"""
from pathlib import Path
import sys,sqlite3,tempfile,json,zipfile,collections,datetime,re
D=Path(__file__).parent;D.mkdir(exist_ok=True)
res=[]
for parent in [False,True]:
 with tempfile.TemporaryDirectory() as t:
  p=Path(t)/'a.db';w=sqlite3.connect(p);w.executescript('PRAGMA foreign_keys=OFF;CREATE TABLE p(id PRIMARY KEY);CREATE TABLE c(id PRIMARY KEY,pid REFERENCES p(id));INSERT INTO c VALUES(1,99);')
  if parent:w.execute('INSERT INTO p VALUES(99)')
  w.commit();w.close();r=sqlite3.connect(p.as_uri()+'?mode=ro',uri=True);r.execute('PRAGMA foreign_keys=ON');res.append({'parentPresent':parent,'integrity':r.execute('PRAGMA integrity_check').fetchall(),'fk':r.execute('PRAGMA foreign_key_check').fetchall(),'rows':r.execute('SELECT * FROM c').fetchall()});r.close()
assert len(res[0]['fk'])==1 and not res[1]['fk'];(D/'nullroute-results.json').write_text(json.dumps(res,indent=2)+'\n')
rows=[]
for i,r in enumerate(zipfile.ZipFile(sys.argv[1]).read('PUB08A.txt').splitlines(),1):
 if r[6:10]==b'0109':rows.append({'row':i,'waybillDate':r[:6].decode(),'accountingPeriod':'0109','reportingLength':r[129:130].decode()})
dates=[datetime.datetime.strptime(x['waybillDate'],'%m%d%y').date() for x in rows];out={'rows':rows,'count':len(rows),'dateCounts':dict(sorted(collections.Counter(str(x) for x in dates).items())),'minimum':str(min(dates)),'maximum':str(max(dates)),'invalidDates':0,'afterAccountingMonth':sum(x>=datetime.date(2009,2,1) for x in dates)};(D/'sigma-results.json').write_text(json.dumps(out,indent=2)+'\n');print({k:v for k,v in out.items() if k!='rows'})
# Expand audit from clickable Markdown to bare attachment names.
findings=[]
for p in Path('research/2026-11-14').glob('*.md'):
 text=p.read_text();links=set(re.findall(r'\]\(([^)]+)\)',text))
 for token in sorted(set(re.findall(r'(?<![A-Za-z0-9_/])([A-Za-z0-9_-]+\.(?:json|html|py|csv))',text))):
  if (p.parent/token).exists():findings.append({'entry':str(p),'attachment':token,'linked':token in links,'exists':True})
(D/'attachment-audit.json').write_text(json.dumps(findings,indent=2)+'\n');print(findings)
