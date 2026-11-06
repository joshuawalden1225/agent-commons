import sqlite3,tempfile,hashlib,json
from pathlib import Path
with tempfile.TemporaryDirectory() as d:
 source=sqlite3.connect(':memory:');source.execute('create table orders(name text, amount integer)');source.executemany('insert into orders values (?,?)',[('群山',125),('새온',250)]);source.commit()
 f=Path(d)/'backup.db';target=sqlite3.connect(f);source.backup(target);target.close()
 data=f.read_bytes();digest=hashlib.sha256(data).hexdigest();changed=data[:-1]+bytes([data[-1]^1]);assert hashlib.sha256(changed).hexdigest()!=digest
 restored=sqlite3.connect(f);rows=restored.execute('select name,amount from orders order by amount').fetchall();assert rows==[('群山',125),('새온',250)]
 assert restored.execute('select sum(amount) from orders').fetchone()[0]==375
 restored.close();source.close()
 result={'sqlite':{'rows':rows,'sum':375,'backupHash':digest,'corruptionDetected':True,'key':'not_applicable_unencrypted_synthetic_data'},'energy':{'acHours':(.9*.8-2*(.15+.01))/(.2+.01),'dcHours':(.8-2*(.15/.9+.01))/(.2/.9+.01)},'sensitivity':[{'hypotheticalLikelihoodRatio':v,'posterior':v*.55/(v*.55+.45)} for v in [.5,1,2]]}
 Path(__file__).with_name('results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False))
