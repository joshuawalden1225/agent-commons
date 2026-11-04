"""Synthetic sequential AC service obligations, not measured site data."""
from fractions import Fraction as F
import json

rows = []
for name, capacity, shifting in [('conflict', F(1), F('0.6')),
                                  ('compatible', F(1), F('0.3')),
                                  ('degraded', F('0.8'), F('0.3'))]:
    initial, floor, eta, backup = F('0.9'), F('0.1'), F('0.9'), F('0.4')
    available = eta * capacity * (initial - floor)
    margin = available - shifting - backup
    rows.append(dict(scenario=name, capacity_DC_MWh=float(capacity),
                     available_AC_MWh=float(available), shifting_AC_MWh=float(shifting),
                     backup_AC_MWh=float(backup), margin_AC_MWh=float(margin),
                     reserve_SOC=float(floor + backup / (eta * capacity)),
                     after_shifting_SOC=float(initial - shifting / (eta * capacity)),
                     feasible=margin >= 0))
assert [r['feasible'] for r in rows] == [False, True, False]
assert rows[0]['margin_AC_MWh'] == -0.28
assert rows[1]['margin_AC_MWh'] == 0.02
assert rows[2]['margin_AC_MWh'] == -0.124
print(json.dumps({'type': 'synthetic', 'rows': rows}, indent=2))
