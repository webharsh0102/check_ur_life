import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.utils import to_categorical

# Load CS
df = pd.read_csv(r"C:\Users\Harsh sethi\Downloads\ObesityDataSet_raw_and_data_sinthetic.csv")
# Manual label encoding
mappings = {
    'Gender': {'Male': 0, 'Female': 1},
    'family_history_with_overweight': {'no': 0, 'yes': 1},
    'FAVC': {'no': 0, 'yes': 1},
    'CAEC': {'no': 0, 'Sometimes': 1, 'Frequently': 2, 'Always': 3},
    'SMOKE': {'no': 0, 'yes': 1},
    'SCC': {'no': 0, 'yes': 1},
    'CALC': {'no': 0, 'Sometimes': 1, 'Frequently': 2, 'Always': 3},
    'MTRANS': {
        'Automobile': 0, 'Motorbike': 1, 'Bike': 2,
        'Public_Transportation': 3, 'Walking': 4
    }
}

for column, mapping in mappings.items():
    df[column] = df[column].map(mapping)

# Target label encoding
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['NObeyesdad'] = le.fit_transform(df['NObeyesdad'])
y = to_categorical(df['NObeyesdad'])

# Input and scaling
X = df.drop("NObeyesdad", axis=1)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Neural Network
model = Sequential([
    Dense(64, activation='relu', input_shape=(X.shape[1],)),
    Dense(32, activation='relu'),
    Dense(y.shape[1], activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=50, batch_size=16, validation_data=(X_test, y_test))

# Save model and scaler
model.save("obesity_model.h5")
import joblib
joblib.dump(scaler, "obesity_scaler.save")
