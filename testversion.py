import tensorflow
from tensorflow import keras
import pandas
import sklearn
import scipy
import numpy
import matplotlib
from tensorflow.python.client import device_lib
#import pydotplus
#import pydot
import h5py
import platform 

print(platform.architecture())
print('tensorflow ' + tensorflow.__version__)
print('keras ' + keras.__version__)
print('pandas ' + pandas.__version__)
print('sklearn ' + sklearn.__version__)
print('scipy ' + scipy.__version__)
print('numpy ' + numpy.__version__)
print('matplotlib ' + matplotlib.__version__)
print('h5py ' + h5py.__version__)
print(device_lib.list_local_devices())