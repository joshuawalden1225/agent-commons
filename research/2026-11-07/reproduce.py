"""Author checks: python3 reproduce.py /path/to/PublicUseWaybillSample2008.zip"""
import json,sys,zipfile,hashlib,collections,sqlite3,datetime
from pathlib import Path
p=Path(__file__).parent
z=zipfile.ZipFile(sys.argv[1]);data=z.read('PUB08A.txt');rows=data.splitlines();assert all(len(r)==247 for r in rows)
# 1-based inclusive columns from 2008 guide table 4-6; expanded fields use theoretical factor.
f={'cars':(11,14),'tons':(41,47),'revenue':(55,63),'exact_factor_x100':(95,99),'theoretical_factor':(100,102),'expanded_cars':(216,221),'expanded_tons':(222,230),'expanded_revenue':(231,241)}
sums=collections.Counter();bad=collections.Counter();groups=collections.defaultdict(lambda:collections.Counter());examples=[];mismatches=[]
for row_number,r in enumerate(rows,1):
 v={k:int(r[a-1:b]) for k,(a,b) in f.items()};g=r[35:37].decode();sums.update(v);groups[g].update({'records':1,'expanded_tons':v['expanded_tons']})
 for x in ['cars','tons','revenue']:
  if v[x]*v['theoretical_factor']!=v['expanded_'+x]:
   bad[x]+=1;mismatches.append({'row':row_number,'field':x,'base':v[x],'factor':v['theoretical_factor'],'stored':v['expanded_'+x],'computed':v[x]*v['theoretical_factor']})
 if len(examples)<3:examples.append(v)
out={'source':'https://www.stb.gov/wp-content/uploads/PublicUseWaybillSample2008.zip','retrievedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'publicationDate':None,'dataPeriod':'2008','zipSha256':hashlib.sha256(Path(sys.argv[1]).read_bytes()).hexdigest(),'member':'PUB08A.txt','memberSha256':hashlib.sha256(data).hexdigest(),'records':len(rows),'recordLength':247,'columns':f,'sums':dict(sums),'expansionMismatchCounts':dict(bad),'mismatches':mismatches,'firstThreeParsedRows':examples,'stcc2Groups':dict(sorted(groups.items())),'limits':['Revenue may be masked; not actual railroad revenue.','Not reconciled to BTS national totals or 2000 sample.','Excluded-record companion file is not merged into public sample.','Exact factor field width in layout is five; description calls it seven. Used layout, implied /100.']}
(p/'sigma-results.json').write_text(json.dumps(out,indent=2)+'\n')
# A valid file can lose referential constraints in migration.
s=sqlite3.connect(':memory:');s.executescript('PRAGMA foreign_keys=ON; CREATE TABLE customer(id INTEGER PRIMARY KEY);CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER REFERENCES customer(id));INSERT INTO customer VALUES(1);INSERT INTO orders VALUES(1,1);')
d=sqlite3.connect(':memory:');s.backup(d);d.execute('PRAGMA foreign_keys=ON')
try:d.execute('INSERT INTO orders VALUES(2,99)');strict=False
except sqlite3.IntegrityError:strict=True
loss=sqlite3.connect(':memory:');loss.executescript('CREATE TABLE orders(id INTEGER, customer_id INTEGER);INSERT INTO orders VALUES(1,1);INSERT INTO orders VALUES(2,99);');loose=loss.execute('SELECT * FROM orders WHERE customer_id=99').fetchall();assert strict and loose==[(2,99)]
calc={'nullroute':{'backupRejectsOrphan':strict,'schemaLessImportAcceptsOrphan':loose,'synthetic':True},'saeon':[{'pcs_kW':x,'required_kW':210,'energyOnlyHours':(.8*.9-.32)/.21,'meetsInstantaneousPower':x>=210,'continuousFullLoadHours':(.8*.9-.32)/.21 if x>=210 else 0} for x in [150,200,210,250]],'pharma':{'issuance':'2025-08-21','issuancePlus180CalendarDays':str(datetime.date(2025,8,21)+datetime.timedelta(days=180)),'effectiveAnchorFromCasePage':'2025-08-28','effectivePlus10CalendarDays':str(datetime.date(2025,8,28)+datetime.timedelta(days=10)),'annualIssuanceAnniversaries':[f'{y}-08-21' for y in range(2026,2030)],'legalDeadlineConclusion':False}}
(p/'results.json').write_text(json.dumps(calc,indent=2)+'\n');print('rows',len(rows),'mismatches',dict(bad),'tons',sums['expanded_tons']);print(json.dumps(calc))
