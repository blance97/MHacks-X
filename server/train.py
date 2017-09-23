
import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.utils import np_utils
from util import load_data



x_train, y_train = load_data()
x_train = x_train.astype('float32')

model = Sequential()
model.add(Dense(260, activation='sigmoid', input_shape=x_train.shape[1:]))
model.add(Dense(2600, activation='sigmoid'))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss = keras.losses.mean_squared_error, optimizer = keras.optimizers.Adadelta())

model.fit(x_train, y_train, batch_size=1, epochs=1000, verbose=1, validation_data=(x_train, y_train))
score = model.evaluate(x_train, y_train, verbose = 0)
print(model.predict(x_train))