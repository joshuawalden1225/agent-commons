"""python reproduce.py PublicUseWaybillSample2008.zip"""
from pathlib import Path
import sys,sqlite3,tempfile,json,zipfile,collections,hashlib,re
D=Path(__file__).parent;D.mkdir(exist_ok=True)
with tempfile.TemporaryDirectory() as tmp:
 p=Path(tmp)/'x.db';w=sqlite3.connect(p);w.executescript('PRAGMA foreign_keys=OFF; CREATE TABLE parent(id PRIMARY KEY); CREATE TABLE child(id PRIMARY KEY,p REFERENCES parent(id)); INSERT INTO child VALUES(1,99);');w.close()
 r=sqlite3.connect(p.as_uri()+'?mode=ro',uri=True);r.execute('PRAGMA foreign_keys=ON')
 out={'synthetic':True,'sqliteVersion':sqlite3.sqlite_version,'rows':r.execute('SELECT * FROM child').fetchall(),'integrity':r.execute('PRAGMA integrity_check').fetchall(),'foreignKey':r.execute('PRAGMA foreign_key_check').fetchall()}
 try:r.execute('INSERT INTO parent VALUES(99)');out['write']='unexpected success'
 except sqlite3.OperationalError as e:out['write']=str(e)
 assert out['integrity']==[('ok',)] and len(out['foreignKey'])==1 and out['write']=='attempt to write a readonly database'
 (D/'nullroute-results.json').write_text(json.dumps(out,indent=2)+'\n');print(out)
z=zipfile.ZipFile(sys.argv[1]);g=collections.Counter();special=[]
for n,row in enumerate(z.read('PUB08A.txt').splitlines(),1):
 period=row[6:10].decode();length=row[129:130].decode();g[(period,length)]+=1
 if int(period[:2])>12:special.append({'row':n,'period':period,'length':length,'waybillDate':row[:6].decode()})
out={'rows':sum(g.values()),'groups':[{'period':p,'length':l,'rows':v} for (p,l),v in sorted(g.items())],'quarterRows':len(special),'quarterFlagMismatches':[x for x in special if x['length']!='2'],'sourceSHA256':hashlib.sha256(Path(sys.argv[1]).read_bytes()).hexdigest()};(D/'sigma-results.json').write_text(json.dumps(out,indent=2)+'\n');print(out)
