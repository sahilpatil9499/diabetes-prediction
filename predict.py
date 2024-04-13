import pickle
from keras.models import load_model
import numpy as np
import skfuzzy as fuzz
import skfuzzy.control as ctrl
import pandas as pd

X_test = pickle.load(open("x_test.pkl", "rb"))
log_reg = pickle.load(open("log_reg.pkl", "rb"))
svm = pickle.load(open("svm.pkl", "rb"))
ann = load_model("ann_model.h5")
scaler = pickle.load(open("scaler.pkl", "rb"))


log_result = ctrl.Antecedent(np.arange(0, 2, 1), 'log_Result')
svm_result = ctrl.Antecedent(np.arange(0, 2, 1), 'SVM_Result')
ann_result = ctrl.Antecedent(np.arange(0, 2, 1), 'ANN_Result')
diabetes_prediction = ctrl.Consequent(
    np.arange(0, 2, 1), 'Diabetes_Prediction')

# Define membership functions for Antecedents and Consequent
log_result['Positive'] = fuzz.trimf(log_result.universe, [0, 0, 1])
log_result['Negative'] = fuzz.trimf(log_result.universe, [0, 1, 1])
svm_result['Positive'] = fuzz.trimf(svm_result.universe, [0, 0, 1])
svm_result['Negative'] = fuzz.trimf(svm_result.universe, [0, 1, 1])
ann_result['Positive'] = fuzz.trimf(ann_result.universe, [0, 0, 1])
ann_result['Negative'] = fuzz.trimf(ann_result.universe, [0, 1, 1])
diabetes_prediction['Positive'] = fuzz.trimf(
    diabetes_prediction.universe, [0, 0, 1])
diabetes_prediction['Negative'] = fuzz.trimf(
    diabetes_prediction.universe, [0, 1, 1])

# Define rules for fuzzy inference
rule1 = ctrl.Rule(log_result['Positive'] & svm_result['Positive']
                  & ann_result['Positive'], diabetes_prediction['Positive'])
rule2 = ctrl.Rule(log_result['Positive'] & svm_result['Positive']
                  & ann_result['Negative'], diabetes_prediction['Positive'])
rule3 = ctrl.Rule(log_result['Positive'] & svm_result['Negative']
                  & ann_result['Positive'], diabetes_prediction['Positive'])
rule4 = ctrl.Rule(log_result['Positive'] & svm_result['Negative']
                  & ann_result['Negative'], diabetes_prediction['Negative'])
rule5 = ctrl.Rule(log_result['Negative'] & svm_result['Positive']
                  & ann_result['Positive'], diabetes_prediction['Positive'])
rule6 = ctrl.Rule(log_result['Negative'] & svm_result['Positive']
                  & ann_result['Negative'], diabetes_prediction['Negative'])
rule7 = ctrl.Rule(log_result['Negative'] & svm_result['Negative']
                  & ann_result['Positive'], diabetes_prediction['Negative'])
rule8 = ctrl.Rule(log_result['Negative'] & svm_result['Negative']
                  & ann_result['Negative'], diabetes_prediction['Negative'])

# Create control system and simulation
diabetes_ctrl = ctrl.ControlSystem(
    [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8])
diabetes_prediction_simulator = ctrl.ControlSystemSimulation(diabetes_ctrl)


def fuzzy_logic_model(log_pred, svm_pred, ann_pred):
    # Define Antecedents and Consequent for fuzzy logic system
    diabetes_prediction_simulator.input['log_Result'] = log_pred
    diabetes_prediction_simulator.input['SVM_Result'] = svm_pred
    diabetes_prediction_simulator.input['ANN_Result'] = ann_pred
    diabetes_prediction_simulator.compute()
    fuzzy_prediction = np.round(
        diabetes_prediction_simulator.output['Diabetes_Prediction']).astype(int)
    return fuzzy_prediction


def perform_one_hot_encoding(df):
    cols = ['age', 'hypertension', 'heart_disease', 'bmi', 'HbA1c_level',
            'blood_glucose_level', 'gender_Female', 'gender_Male',
            'smoking_history_current', 'smoking_history_non-smoker',
            'smoking_history_past_smoker']

    vals = [df["age"].iloc[0], df["hypertension"].iloc[0], df["heart_disease"].iloc[0], df["bmi"].iloc[0], df["HbA1c_level"].iloc[0], df["blood_glucose_level"].iloc[0], 1 if df["gender"].iloc[0] == "Female" else 0, 1 if df["gender"].iloc[0] == "Male" else 0,
            1 if df["smoking_history"].iloc[0] == "current" else 0, 1 if df["smoking_history"].iloc[0] == "non-smoker" else 0, 1 if df["smoking_history"].iloc[0] == "past_smoker" else 0]

    d = pd.DataFrame([vals], columns=cols)
    return d


def prepare_data(data):
    # columns = ['gender', 'age', 'hypertension', 'heart_disease', 'smoking_history',
    #            'bmi', 'HbA1c_level', 'blood_glucose_level', 'diabetes']
    # base_data = data
    # data = pd.DataFrame([base_data], columns=columns)
    data = perform_one_hot_encoding(data)
    return scaler.transform(data)[0]


def predict(data):
    log_pred = log_reg.predict(np.array([data]))
    svm_pred = svm.predict(np.array([data]))
    ann_pred = ann.predict(np.array([data]))
    return fuzzy_logic_model(log_pred, svm_pred, ann_pred)[0][0]
