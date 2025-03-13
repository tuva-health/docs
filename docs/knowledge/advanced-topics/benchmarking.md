---
id: benchmarking
title: "11. Benchmarking"
---

  
# Claims Based Benchmarking

## Benchmarking Background and Purpose

### Why Benchmark

Healthcare organizations need reliable ways to compare their performance against expected outcomes to identify improvement opportunities, track progress, and demonstrate value to stakeholders. Benchmarking helps healthcare organizations answer critical questions that drive strategic decision-making:

**Performance Assessment** : How is our organization performing compared to what would be expected given our patient population characteristics?  
**Resource Allocation**: Where should we focus improvement efforts to maximize impact?  
**Contract Negotiation**: What targets are realistic for our specific patient mix in risk-based contracts?  
**Fairness in Comparison**: How can we ensure we're making "apples-to-apples" comparisons when evaluating performance across different practices, regions, or time periods?



### The Model-Based Approach to Risk Adjustment

A basic way to calculate benchmarks is to derive separate summary statistics from a benchmark dataset for different demographic factors (age, sex, geography, etc.) and then combine these statistics to create comparison points. This is time consuming, error prone, and not very precise.

A better approach is to build a predictive model that takes the demographic factors and chronic conditions as inputs. Using modern machine learning techniques allows us to rapidly explore and iterate on features and models to maximize the predictive value of these models in short periods of time. These models are then used to predict values at the member-year level and (and can be applied at the member-month level for trending purposes). 

### Adjusting for the Right Factors

It's important to understand that the purpose of benchmarking models isn't to build the most predictive model possible. Rather, these models should only adjust for factors that are outside a healthcare organization's control within a risk-based contract.

For example:  
- **Include in models**: Age, sex, geography, chronic conditions  
- **Exclude from models**: Number of ED visits, prior year's spend, whether a member has an assigned PCP, or wellness visits

The reasoning is straightforward: factors like ED utilization are outcomes that healthcare organizations are trying to improve, so including them would mask the very performance differences we're trying to measure. In contrast, an organization cannot change a patient's age or geographic location, so these factors should be adjusted for.

### Prospective vs. Concurrent Models

There are two basic types of predictive models:

**Prospective Models**  
- Use historical data to predict future performance  
- Appropriate for forward-looking risk contracts and planning  
- Example: Using 2024 patient data to predict 2025 expenditures

**Concurrent Models**  
- Use current period data to establish expected performance for the same period  
- Useful for performance evaluation and understanding current variation  
- Example: Using 2024 patient data to establish expected 2024 expenditures


### How to Interpret Benchmarking Results

It's crucial to understand that benchmarking models make sense (and can guide decision making) in aggregate, but not at an individual level. They typically show good calibration (predicted/actual ratio very close to 100%), but will have high mean absolute error percentages (MAE% typically above 60%).

This means that while the models may accurately predict total costs for a large population, they will have significant errors when predicting for individual patients. This is expected and acceptable for benchmarking purposes, as the goal is to compare group performance fairly, not to predict individual patient costs perfectly.

### Two Types of Benchmarking Models

#### 1. Denominator-Based Models  
These models predict metrics across an entire population (the denominator):  
- Predict yearly or monthly spend across all members  
- Predict utilization rates across service categories  
- Examples: Total PMPM cost, inpatient admissions per 1,000 members

#### 2. Encounter-Based Models  
These models predict outcomes for specific healthcare encounters that have already occurred:  
- Given a patient has an inpatient admission, what is their predicted chance of readmission?  
- Given a patient is admitted, what is their predicted length of stay?  
- Given an admission, what is the likelihood of discharge to home versus a skilled nursing facility?

Encounter-based metrics, particularly readmission rates, are valuable in population health management as they help identify opportunities for improved care transitions, follow-up care, and chronic condition management.

## Tuva's Prediction Models 

The Tuva Project has developed a suite of benchmarking models using Medicare data (CMS Limited Data Set, 5% file). These models provide expected values that can be compared against actual performance to identify opportunities for improvement.

To identify the optimal machine learning technique for predicting paid amounts, Tuva explored a variety of common regression algorithms. Each model was evaluated based on key predictive performance metrics including the coefficient of determination (R²), Mean Absolute Error Percentage (MAE%), and Calibration Ratio (predicted/actual). Below is a summary table of model performance:


| Model Type            | R² (higher is better) | MAE% (lower is better) | Calibration Ratio (closer to 1 is better) |
|-----------------------|-----------------------|------------------------|-------------------------------------------|
| Linear Regression     | *placeholder*         | *placeholder*          | *placeholder*                             |
| Random Forest         | *placeholder*         | *placeholder*          | *placeholder*                             |
| XGBoost               | *placeholder*         | *placeholder*          | *placeholder*                             |
| Neural Networks       | *placeholder*         | *placeholder*          | *placeholder*                             |

**Note:** *Actual evaluation metrics to be populated based on completed analyses.*

Upon thorough evaluation, the XGBoost model consistently demonstrated the highest predictive accuracy and superior calibration. Additionally, XGBoost provides efficient computational speed and scalability, making it ideal for rapidly iterating and deploying predictive models within healthcare benchmarking applications. Given its optimal blend of predictive performance, computational efficiency, and interpretability, we selected XGBoost as the preferred modeling approach for predicting paid amounts.


#### Member-Year Grain Models

| Model                    | Type              | Description                                         | Performance               |
|--------------------------|------------------------------|--------------------------------------------------|---------------------------|
| Total PMPM Cost          | XGBoost Regressor            | Predicts total per-member-per-month costs       | R² = 0.4, MAE% = 60%      |
| Service Category Models  | XGBoost Regressors (ratios)  | Predicts cost distribution across service categories (multiplied by Total PMPM) | Evaluation metrics TBD    |
| Encounter (PKPY) Models    | XGBoost Regressors           | Predicts encounter rates for various service types | Evaluation metrics TBD    |

**Encounter types predicted in Encounter (PKPY) Models include:**
- Inpatient admissions  
- Emergency department visits  
- Radiology (outpatient and office-based)  
- Home health  
- SNF
- Office visits

#### Encounter-Grain Models

| Model                   | Type              | Description                                                  | Performance               |
|------------------------|------------------------------|----------------------------------------------------------|---------------------------|
| Readmission Rate       | XGBoost Binary Classifier     | Predicts probability of readmission after hospital discharge | Evaluation metrics TBD    |
| Length of Stay (LOS)   | XGBoost Regressor             | Predicts expected duration of an inpatient stay           | Evaluation metrics TBD    |
| Discharge Location     | XGBoost Multiclass Classifier | Predicts discharge destination (e.g., home, SNF, etc.)    | Evaluation metrics TBD    |


By providing these benchmarking capabilities, The Tuva Project enables healthcare organizations to fairly compare their performance against expected outcomes, accounting for the specific risk factors present in their patient populations. This supports more informed decision-making and targeted quality improvement initiatives in value-based care arrangements.


