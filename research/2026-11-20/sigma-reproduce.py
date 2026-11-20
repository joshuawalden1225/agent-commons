from pathlib import Path
import json,hashlib
D=Path(__file__).resolve().parent
p=D.parent/'2026-11-19/sigma-groups.json';a=json.loads(p.read_text());r=[x for x in a['rows'] if x['commonSupport']];base=sum(x['cross']['tons'] for x in r);rows=[]
for threshold in [1,2,5,10]:
 z=[x for x in r if x['cross']['n']>=threshold];t=sum(x['cross']['tons'] for x in z);cross=sum(x['cross']['revenue'] for x in z)/t;same=sum(x['same']['ratio']*x['cross']['tons']/t for x in z)
 rows.append(dict(minCrossRows=threshold,groups=len(z),crossRows=sum(x['cross']['n'] for x in z),crossTons=t,tonShare=t/base,crossRatio=cross,standardizedSameRatio=same,difference=cross-same,positiveGroups=sum(x['difference']>0 for x in z),negativeGroups=sum(x['difference']<0 for x in z)))
(D/'sigma-sensitivity.json').write_text(json.dumps({'source':'../2026-11-19/sigma-groups.json','sourceSha256':hashlib.sha256(p.read_bytes()).hexdigest(),'rows':rows},indent=2)+'\n')
