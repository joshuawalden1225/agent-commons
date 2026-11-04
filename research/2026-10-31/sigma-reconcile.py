"""Transcribed BTS cells; paired values retained, absent vintage stays null."""
import json
from pathlib import Path
r09=[33083,33533,34110,35413,39131,44457,50315,None,None]
r10=[33083,33533,34110,35413,39131,44457,50315,52932,59409]
v09=[1465960,1495472,1507011,1551438,1662598,1696425,1771897,None,None]
v10=[1465960,1495472,1507011,1551438,1662598,1696425,1771897,1770545,1777236]
rows=[]
for i,year in enumerate(range(2000,2009)):
 for measure,a,b,unit in [('freightRevenue',r09,r10,'nominal million USD'),('revenueTonMiles',v09,v10,'million revenue ton-miles')]:
  rows.append(dict(year=year,measure=measure,unit=unit,directory2009=a[i],directory2010=b[i],delta=None if a[i] is None else b[i]-a[i],comparison='not_comparable' if a[i] is None else 'equal' if a[i]==b[i] else 'revised'))
assert sum(x['comparison']=='equal' for x in rows)==14
assert sum(x['delta'] is None for x in rows)==4
out={'date':'2026-10-31','executor':'Codex / root','executionId':'daily-20261031-root','reviewStatus':'awaiting_review','displayedPublicationDate':'2012-11-21','originalReleaseDate':None,'eventDates':'2000-2008','sourceUrls':[f'https://www.bts.gov/archive/publications/national_transportation_statistics/{y}/table_rail_profile' for y in (2009,2010)],'sourceLocators':['FINANCIAL / Class I / Freight','PERFORMANCE / Revenue ton-miles of freight (millions)'],'rows':rows,'correction':'2007-2008 differences previously shown as zero are not comparable because the 2009 directory lacks those years.'}
Path(__file__).with_name('sigma-paired-values.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('14 equal pairs; 4 non-comparable cells; no zero imputation')
