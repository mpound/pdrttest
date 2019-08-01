#!/usr/bin/env python
# This is a minimum failing example for NDDataArray raising an AttributeError
# if the instance is used as the operand of multiply() or 
# divide() and is then used as the operator.
#
# - Marc Pound Tue Jul 16 15:43:51 EDT 2019
#   mpound@umd.edu
#   github.com/mpound

import traceback
from astropy.nddata import NDDataArray, StdDevUncertainty
from copy import deepcopy
n1 = NDDataArray(data=3.,uncertainty=StdDevUncertainty(4.))
n2 = NDDataArray(data=4.,uncertainty=StdDevUncertainty(3.))
n3 = NDDataArray(data=5.,uncertainty=StdDevUncertainty(2.))
n4 = deepcopy(n2)

#ok
print("n1.multiply(n2)...OK")
n1.multiply(n2)

#ok
print("n3.multiply(n1)...OK")
n3.multiply(n1)

# will raise AttributeError

try:
    print("Reuse operand as operator : n2.divide(n1)...")
    n2.divide(n1)
except AttributeError as ex:
    print("## Caught AttributeError")
    print(''.join(traceback.format_exception(etype=type(ex), value=ex, tb=ex.__traceback__)))

# 
print("Use deepcopy of n2 instead...OK")
n4.divide(n1)
