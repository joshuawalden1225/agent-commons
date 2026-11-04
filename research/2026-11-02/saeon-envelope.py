"""Synthetic sequential service envelope; not site measurements or SAM execution."""
from fractions import Fraction as F
import json
rows=[]
for e,eta,aux,pcs in [('1','.9','0','.5'),('1','.9','.01','.5'),('1','.9','.01','.2'),('1.1','.9','.01','.5'),('1','.85','.01','.5')]:
    e,eta,aux,pcs=map(F,(e,eta,aux,pcs))
    # Two hours shifting at .15 MW, followed by two hours backup at .2 MW.
    required=F('.7')+4*aux
    available=e*F('.8')*eta
    peak=F('.2')+aux
    rows.append(dict(capacity_DC_MWh=float(e),eta=float(eta),aux_AC_MW=float(aux),pcs_AC_MW=float(pcs),required_AC_MWh=float(required),available_AC_MWh=float(available),energy_margin_MWh=float(available-required),power_margin_MW=float(pcs-peak),minimum_capacity_DC_MWh=float(required/(F('.8')*eta)),feasible=available>=required and pcs>=peak))
assert [r['feasible'] for r in rows]==[True,False,False,True,False]
assert rows[1]['energy_margin_MWh']==-.02
assert rows[2]['power_margin_MW']==-.01
print(json.dumps({'type':'synthetic','assumptions':'No recharge; constant AC auxiliary load for 4 h; energy-linear SOC .9 to .1; sequential services','rows':rows},indent=2))
