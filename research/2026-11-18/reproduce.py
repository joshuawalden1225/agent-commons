from pathlib import Path
import zipfile,json,hashlib,statistics,datetime,collections
D=Path(__file__).parent;D.mkdir(parents=True,exist_ok=True)
import sys
p=Path(sys.argv[1]);data=zipfile.ZipFile(p).read('PUB08A.txt');groups={'crossyear':[],'sameyear':[]}
for i,r in enumerate(data.splitlines(),1):
 if r[:2]!=b'12':continue
 key='crossyear' if r[6:10]==b'0109' else 'sameyear' if r[6:10]==b'1208' else None
 if key:groups[key].append({'row':i,'tons':int(r[40:47]),'revenue':int(r[54:63]),'expanded_tons':int(r[221:230]),'expanded_revenue':int(r[230:241])})
o={'zipSha256':hashlib.sha256(p.read_bytes()).hexdigest(),'memberSha256':hashlib.sha256(data).hexdigest(),'source':'https://www.stb.gov/wp-content/uploads/PublicUseWaybillSample2008.zip','sampleYear':2008,'comparison':'December waybills only; January 2009 vs December 2008 accounting period; excludes all other periods','groups':{}}
for k,a in groups.items():
 sums={f:sum(x[f] for x in a) for f in ['tons','revenue','expanded_tons','expanded_revenue']};o['groups'][k]={'n':len(a),'sum':sums,'medianSampleTons':statistics.median(x['tons'] for x in a),'medianSampleRevenue':statistics.median(x['revenue'] for x in a),'ratioOfExpandedSums':sums['expanded_revenue']/sums['expanded_tons'],'unweightedRatioOfSums':sums['revenue']/sums['tons'],'zeroTons':sum(x['tons']==0 for x in a),'rowNumbers':[x['row'] for x in a]}
(D/'sigma-results.json').write_text(json.dumps(o,indent=2)+'\n');print({k:{f:v for f,v in x.items() if f!='rowNumbers'} for k,x in o['groups'].items()})
# Synthetic energy counterexample: same total energy, different arrival order.
a=[]
for name,pv in [('early',[3,3,0,0]),('late',[0,0,3,3])]:
 energy=2.;rows=[]
 for i,p in enumerate(pv):
  demand=2.;dis=min(max(demand-p,0),energy,2);charge=min(max(p-demand,0),4-energy,2);unmet=max(demand-p-dis,0);energy+=charge-dis;rows.append({'hour':i,'pv_kW':p,'load_kW':demand,'discharge_kWh':dis,'charge_kWh':charge,'unmet_kWh':unmet,'endEnergy_kWh':energy})
 a.append({'name':name,'rows':rows,'totalUnmet_kWh':sum(x['unmet_kWh'] for x in rows)})
assert a[0]['totalUnmet_kWh']==0 and a[1]['totalUnmet_kWh']==2
(D/'saeon-dispatch.json').write_text(json.dumps({'synthetic':True,'initial_kWh':2,'capacity_kWh':4,'pcs_kW':2,'efficiency':1,'timeStep_hours':1,'cases':a},indent=2)+'\n')
