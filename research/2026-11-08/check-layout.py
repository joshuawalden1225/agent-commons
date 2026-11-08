"""Usage: python3 check-layout.py path/to/PublicUseWaybillSample2008.zip"""
import sys,zipfile,hashlib,collections,json
z=zipfile.ZipFile(sys.argv[1]);out={}
for n in ['PUB08A.txt','Records excluded from public sample.txt']:
 b=z.read(n);out[n]={'bytes':len(b),'rows':len(b.splitlines()),'rowWidths':dict(collections.Counter(map(len,b.splitlines()))),'sha256':hashlib.sha256(b).hexdigest()}
print(json.dumps(out,indent=2))
