# heart_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
import joblib





df = pd.read_csv(r"C:\Users\Harsh sethi\Downloads\archive (4)\heart_cleveland_upload.csv")

X = df.drop("condition", axis=1)
y = (df["condition"] > 0).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
# After fitting
joblib.dump(scaler, 'scaler_heart.save')
model = tf.keras.Sequential([
    tf.keras.layers.Dense(32, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, validation_split=0.2, epochs=50, callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5)])
print("Heart Disease accuracy:", model.evaluate(X_test, y_test)[1])
model.save("heart_model.h5")
