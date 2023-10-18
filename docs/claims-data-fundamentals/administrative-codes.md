---
id: administrative-codes
title: "Administrative Codes"
description: This section describes administrative codes contained in claims data, including HCPCS, place of service, bill type, and revenue codes, among others.
---

One of the great things about claims data (compared to clinical data) is that they contain a number of fields with standard terminology that are (usually) well-populated.  We refer to these fields as Administrative Codes because they are used for billing (i.e. administrative) purposes as opposed for clinical purposes.  These fields contain valuable information about the services performed, where they were performed, and where the patient came from and went to before/after the service.  

In this section we review these codes, their analytic use cases, and how you can identify common data quality problems in them.

## Admit Source
Admit source code is used in institutional claims to indicate where the patient was located prior to admission.  The field does not exist in professional claims.  The field exists at the header-level, meaning there should be only 1 distinct value for this field per claim.

Admit source, along with admit type, is the least reliable among the administrative codes because the accuracy of the code is not verified during the claims adjudication process (other than verifying that the code is in fact a valid code).

Despite this, it's possible to use admit source to help identify things like:
- transfers from another hospital
- inpatient stays that came through the emergency department

Admit source codes are maintained by the National Uniform Billing Committee (NUBC).

You can find a complete listing of admit source codes and their descriptions [here](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_source.csv).

## Admit Type
Admit type code is used in institutional claims to indicate the priority of admission, e.g., urgent, emergent, elective, etc.  The field does not exist in professional claims.  The field exists at the header-level, meaning there should be only 1 distinct value for this field per claim.

Admit type along with admit source, is the least reliable among the administrative codes because the accuracy of the code is not verified during the claims adjudication process (other than verifying that the code is in fact a valid code).

Despite this, admit type is commonly used to identify things like elective procedures.

Admit type codes are maintained by the National Uniform Billing Committee (NUBC).

You can find a complete listing of admit type codes and their descriptions [here](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__admit_type.csv).

## Bill Type
Bill type code is by far the most complex of the administrative codes.  Each digit in the bill type code has a distinct purpose and meaning:

- 1st digit: This is always "0" and often omitted.
- 2nd digit: Indicates the type of facility, e.g., skilled nursing facility 
- 3rd digit: Indicates the type of care, e.g., inpatient part A
- 4th digit: Indicates the sequence of the bill (also referred to as the frequency code)

The thing that makes this code complex is that the possible values of the 3rd and 4th digits depend on the value of the 2nd digit.  As a result, some claims datasets will separate out the digits of bill type code into distinct fields.  However, we find it preferable to work with bill type code as a single field and the dictionary below lists all bill type codes this way.

Despite the complexity of this field, it's extremely useful.  Bill type code is used extensively in the creation of service categories, including the identification of acute inpatient, outpatient, skilled nursing, and emergency department services, among many others.  The field is generally considered reliable because the accuracy and suitability of the code is verified during the claims adjudication process, i.e., a claim may be denied if the code doesn't make sense.

Bill type codes are maintained by the National Uniform Billing Committee (NUBC).

You can find a complete listing of bill type codes and their descriptions [here](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__bill_type.csv).

## Discharge Disposition
Discharge disposition code indicates where the patient was discharged following a stay at a facility.  The field only exists on institutional claims.  The field is sometimes called discharge status or patient status.  The field exists at the header-level, meaning there should be only 1 distinct value for this field per claim.

The code is commonly used to identify things like:
- Patients that died during an institutional stay
- Patients who were transferred
- Patients who were discharged to home or home w/ home health services
- Patients who left against medical advice (LAMA)

Discharge disposition codes are maintained by the National Uniform Billing Committee (NUBC).

You can find a complete listing of discharge disposition codes and their descriptions [here](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__discharge_disposition.csv).

## HCPCS
HCPCS codes indicate the services and supplies rendered by providers to patients.  These codes are used in both institutional and professional claims forms.  These codes exist at the line-level, meaning there can be many HCPCS codes on a single claim.  There are codes for many different types of supplies and services including:
- physician visits
- lab tests
- imaging reads
- durable medical equipment
- remote patient monitoring devices

And many many other types of things.  There are thousands of HCPCS codes spread across two levels.  Level 1 codes, also called CPT codes, are maintained by the American Medical Association (AMA).  Level 2 codes are maintained by CMS.

Professional contracted rates between payers and providers are established using HCPCS codes.  These rates are referred to as a fee schedule.  Conversely, institutional rates are often paid on a per encounter (e.g. DRG) or per diem basis.

You can find a complete listing of all level 2 HCPCS codes and their descriptions [here](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__hcpcs_level_2.csv).

## Place of Service
Place of service codes indicate the type of care setting professional claim services were delivered in.  This field only exists on professional claims.  Place of service is coded at the line-level to reflect the fact that services during a particular encounter can occur in different locations.  Because of this, a single professional claim can have multiple place of service codes.

Place of service codes are used to assign claims to services categories.  For example, place of service code 11 indicates an office visit.

CMS maintains place of service codes.

You can find a complete listing of all place of service codes and their descriptions [here](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__place_of_service.csv).

## Revenue Center Codes
Revenue center codes are used to account for the services and supplies rendered to patients in institutional care settings.  These codes are only used in institutional claims.  Typically these codes will correspond to a facility's chargemaster, which is a listing of all charges used by the institution in billing.  Although a hospital will use these codes to "charge" the health insurer, they have no bearing on the contracted payment amount, i.e., the amount paid to the provider by the payer.  The payment amount is entirely determined by MS-DRG for inpatient claims and often a per diem rate for skilled nursing.

Many different categories of revenue center codes exist including for example:
- Room and Board
- Emergency
- IV Therapy

For a given institutional claim there may be dozens of revenue center codes used.  These codes are submitted at the line-level of the claim, so there is no limit to the number of revenue center codes that may be used on a given claim.

Revenue center codes play an important role in identifying different types of insitutional claims, including acute inpatient, emergency department, and others.

Revenue center codes are maintained by the National Uniform Billing Committee (NUBC).

You can find a complete listing of revenue center codes and their descriptions [here](https://github.com/tuva-health/the_tuva_project/blob/main/seeds/terminology/terminology__revenue_center.csv).

