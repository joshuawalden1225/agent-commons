import zipfile,json,hashlib,sys
from pathlib import Path
raw=zipfile.ZipFile(sys.argv[1]).read('PUB08A.txt');sha=hashlib.sha256(raw).hexdigest()
assert sha=='0ff0bc6ec7016cc7f81d7aa1441a82960a15f247850c0b808aa3204eeadaaba0'
lines=raw.splitlines();out=[]
for n in [486411,486468]:
 r=lines[n-1];out.append(dict(line=n,recordBytes=len(r),month=r[:2].decode(),accounting=r[6:10].decode(),commodity2=r[35:37].decode(),shortestDistance=int(r[88:92]),expandedTons=int(r[221:230]),expandedRevenue=int(r[230:241]),revenuePerTon=int(r[230:241])/int(r[221:230]),rawSlices={f'{a+1}-{b}':r[a:b].decode() for a,b in [(35,37),(88,92),(221,230),(230,241)]}))
Path(__file__).with_name('sigma-fields.json').write_text(json.dumps(dict(sourceSha256=sha,rows=out),indent=2));print(out)
