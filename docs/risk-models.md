---
id: risk-models
title: "9. Risk Models"
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

This means that while the models may accurately predict total costs for a large population, they will have significant errors when predicting for individual patients. This is expected and acceptable for benchmarking purposes, as the goal is to compare group performance fairly (risk stratification), not to predict individual patient costs perfectly.

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

The Tuva Project has developed a set of benchmarking models using Medicare data from the CMS Limited Data Set (5% file). These models run on output from The Tuva Project's benchmarking mart, so no additional data transformations are needed to get started.

Visit [The Tuva Project's page on Hugging Face](https://huggingface.co/tuva-ml-models/) to get started integrating these models with your own data. The page also provides detailed information about each model, including evaluation metrics and performance insights.

In line with The Tuva Project's philosophy of openness and collaboration, we have initially made available models trained on CMS data. We encourage active participation from the community, inviting members to contribute their own models. Ultimately, our vision is to build a place where users can create and share machine learning models that leverage The Tuva Project’s data resources.
