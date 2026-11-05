import math,json
from pathlib import Path
x={"capacity":[{"fraction":s,"hours":(.72*s-.32)/.21} for s in [1,.9,.8]],"composition":{"yield0":1.8,"yield1":4.2,"growth":4.2/1.8-1},"falsePositiveBound100":1-.05**.01,"requiredZeroErrorN":math.ceil(math.log(.05)/math.log(1-.8*.01*.1/(.9*.99)))}
assert x["requiredZeroErrorN"]==3335
assert abs(x["composition"]["growth"]-4/3)<1e-12
assert abs(x["capacity"][0]["hours"]-40/21)<1e-12
assert x==json.loads(Path(__file__).with_name("calculations.json").read_text())
print("Three synthetic calculations reproduced")
