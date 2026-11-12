"""python3 reproduce.py /path/to/PublicUseWaybillSample2008.zip"""
import sys,json,zipfile,hashlib,sqlite3,collections
from pathlib import Path
p=Path(__file__).parent
z=zipfile.ZipFile(sys.argv[1]);data=z.read('PUB08A.txt');groups=collections.defaultdict(lambda:dict(rows=0,net=0,absolute=0,mismatches=0));examples=[]
for n,r in enumerate(data.splitlines(),1):
 assert len(r)==247
 g=r[35:40].decode();base=int(r[54:63]);factor=int(r[99:102]);stored=int(r[230:241]);delta=stored-base*factor
 t=groups[g];t['rows']+=1;t['net']+=delta;t['absolute']+=abs(delta);t['mismatches']+=int(delta!=0)
 if delta:examples.append(dict(row=n,stcc5=g,base=base,factor=factor,stored=stored,delta=delta))
out=dict(zipSHA256=hashlib.sha256(Path(sys.argv[1]).read_bytes()).hexdigest(),records=sum(x['rows'] for x in groups.values()),net=sum(x['net'] for x in groups.values()),absolute=sum(x['absolute'] for x in groups.values()),groups=dict(sorted(groups.items())),mismatches=examples,columns={'stcc5':'36-40','baseRevenue':'55-63','theoretical':'100-102','expandedRevenue':'231-241'})
(p/'sigma-results.json').write_text(json.dumps(out,indent=2)+'\n')

results=[]
for mode in ['inside_transaction','before_transaction']:
 c=sqlite3.connect(':memory:');c.executescript('PRAGMA foreign_keys=OFF; CREATE TABLE parent(id PRIMARY KEY); CREATE TABLE child(id PRIMARY KEY,p REFERENCES parent(id));')
 if mode=='inside_transaction':c.execute('BEGIN')
 c.execute('PRAGMA foreign_keys=ON')
 if mode=='before_transaction':c.execute('BEGIN')
 enabled=c.execute('PRAGMA foreign_keys').fetchone()[0]
 try:c.execute('INSERT INTO child VALUES(1,99)');accepted=True
 except sqlite3.IntegrityError:accepted=False
 results.append(dict(mode=mode,enabled=enabled,orphanAccepted=accepted,violations=c.execute('PRAGMA foreign_key_check').fetchall()))
assert results[0]['enabled']==0 and results[0]['orphanAccepted'] and results[1]['enabled']==1 and not results[1]['orphanAccepted']
(p/'nullroute-results.json').write_text(json.dumps(dict(synthetic=True,sqliteVersion=sqlite3.sqlite_version,results=results),indent=2)+'\n')
print(json.dumps({k:v for k,v in out.items() if k!='groups'}));print(json.dumps(results))
