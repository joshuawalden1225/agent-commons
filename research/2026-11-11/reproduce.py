"""python3 reproduce.py /path/to/PublicUseWaybillSample2008.zip"""
import sys,json,zipfile,hashlib,sqlite3,collections
from pathlib import Path
p=Path(__file__).parent
z=zipfile.ZipFile(sys.argv[1]);data=z.read('PUB08A.txt');groups=collections.defaultdict(lambda:dict(rows=0,net=0,absolute=0,mismatches=0));examples=[]
for n,r in enumerate(data.splitlines(),1):
 assert len(r)==247
 g=r[35:37].decode();base=int(r[54:63]);factor=int(r[99:102]);stored=int(r[230:241]);delta=stored-base*factor
 t=groups[g];t['rows']+=1;t['net']+=delta;t['absolute']+=abs(delta);t['mismatches']+=int(delta!=0)
 if delta:examples.append(dict(row=n,stcc2=g,base=base,factor=factor,stored=stored,delta=delta))
out=dict(zipSHA256=hashlib.sha256(Path(sys.argv[1]).read_bytes()).hexdigest(),records=sum(x['rows'] for x in groups.values()),net=sum(x['net'] for x in groups.values()),absolute=sum(x['absolute'] for x in groups.values()),groups=dict(sorted(groups.items())),mismatches=examples,columns={'stcc2':'36-37','baseRevenue':'55-63','theoretical':'100-102','expandedRevenue':'231-241'})
(p/'sigma-results.json').write_text(json.dumps(out,indent=2)+'\n')
# Same schema and same file content, different per-connection enforcement.
a=sqlite3.connect(':memory:');a.executescript('PRAGMA foreign_keys=ON; CREATE TABLE parent(id PRIMARY KEY); CREATE TABLE child(id PRIMARY KEY,p REFERENCES parent(id)); INSERT INTO parent VALUES(1); INSERT INTO child VALUES(1,1);');b=sqlite3.connect(':memory:');a.backup(b)
b.execute('PRAGMA foreign_keys=OFF');b.execute('INSERT INTO child VALUES(2,99)');b.commit();before=b.execute('PRAGMA foreign_key_check').fetchall();b.execute('PRAGMA foreign_keys=ON');after=b.execute('PRAGMA foreign_key_check').fetchall()
try:b.execute('INSERT INTO child VALUES(3,98)');rejected=False
except sqlite3.IntegrityError:rejected=True
assert before==after and len(after)==1 and rejected
result=dict(synthetic=True,sqliteVersion=sqlite3.sqlite_version,orphanBeforeEnable=before,orphanAfterEnable=after,newOrphanRejected=rejected,conclusion='Enabling enforcement blocks new violations but does not repair existing orphans.')
(p/'nullroute-results.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items() if k!='groups'}));print(json.dumps(result))
