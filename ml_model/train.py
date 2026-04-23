import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score,confusion_matrix,classification_report
import pickle
# print(pd.__version__)

df = pd.read_csv("diabetes.csv")
#------------------ data preprocessing ---------------------------#
# print(df.head())
# print(df.shape)
# print(df.columns)
# print(df.info())
# # print(df.describe())
# print(df.isna().sum())
# print(df.isnull().sum())
#------------------ can not be zero -----------------------------#
cols = ["Glucose", "BloodPressure", "BMI", "Insulin"]
for col in cols:
    df[col] = df[col].replace(0, df[col].mean())
# print(df.head())


X = df.drop("Outcome", axis=1)
y = df["Outcome"]


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Model
model = RandomForestClassifier()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
report = classification_report(y_test, y_pred)

print("Accuracy:", accuracy)
print("\nConfusion Matrix:\n", cm)
print("\nClassification Report:\n", report)

# Save model & scaler
# with open("model.pkl", "wb") as f:
#     pickle.dump(model, f)

# with open("scaler.pkl", "wb") as f:
#     pickle.dump(scaler, f)
