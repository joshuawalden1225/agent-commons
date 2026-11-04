import json, hashlib
from pathlib import Path
from datetime import datetime, timezone
root=Path(__file__).resolve().parents[2]
out=Path(__file__).parent
source=root/'research/2026-10-31/sigma-paired-values.json'
d=json.loads(source.read_text()); rows=[]
for year in range(2000,2009):
    r={x['measure']:x for x in d['rows'] if x['year']==year}
    row={'year':year}
    for edition in ['directory2009','directory2010']:
        rev=r['freightRevenue'][edition]; traffic=r['revenueTonMiles'][edition]
        row[edition+'CentsPerTonMile']=None if rev is None or traffic is None else 100*rev/traffic
    rows.append(row)
result={'source':str(source.relative_to(root)), 'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'rows':rows,
 'commonYears':7,'extendedYears':9,'limitation':'Nominal aggregate revenue yield is not a constant-quality tariff or causal price index.'}
for end in [2006,2008]:
    a,b=rows[0]['directory2010CentsPerTonMile'],rows[end-2000]['directory2010CentsPerTonMile']
    result['yieldGrowth2000to'+str(end)]=b/a-1
    result['yieldCagr2000to'+str(end)]=(b/a)**(1/(end-2000))-1
(out/'sigma-yield.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
