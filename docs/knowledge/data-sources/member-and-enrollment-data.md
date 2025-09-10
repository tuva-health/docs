---
id: member-and-enrollment-data
title: "Member and Enrollment Data"
---


### Eligibility Overview

At their core, member enrollment data were created to answer the question: Who is covered under this health plan right now? They outline member demographics, coverage start and end dates, dependent details, and identifiers like policy or subscriber IDs. When you begin supporting a new member population one of the first things you'll need to determine is "who is eligible for this program?", this may initial seem straightforward but there's generally a lot of nuance to how eligibility checks and transmission of eligibility information is shared between organizations. Note that "enrollment" and "eligibility" generally refer to the same type of files, however if a partner is providing both types of files, the eligibility files are are generally more bare-bones and include very little demographic information, focusing exclusively on actual eligibility vs. a enrollment file that also will include demographics and contact information for the member. 

#### Common methods of eligibility checks / transmissions:
1. **Eligibility APIs**: Eligibility APIs are often available and required to validate the eligibility of the member/patient for services at the time of enrollment or service, note that these eligibility checks are usually real-time (or allow you to check eligibility on a particular date), and only tell you whether a member is covered at that moment in time. Eligibility APIs are NOT generally good at determining the full history of coverage for a member, and this is why they are generally paired with eligibility files that provide the historical record of a members coverage.
2. **Eligibility Flat Files**: Eligibility files in a "flat" format (CSV, pipe-delimited, fixed-width, etc.) continue to be the industry workhorse. Most employers, brokers, and health plans rely on 834s or proprietary formats to exchange large batches of enrollment data on a set schedule (generally weekly or monthly). These files are dependable for exchanging large volumes data, but they have a lag — retro changes or new enrollments may not be reflected until the next file cycle.

Given the strengths and weaknesses of APIs and flat files, most organizations use the two side by side. Flat files handle the bulk transfers, while APIs provide a way to layer on more timely updates and reconcile discrepancies. For example:
- A flat file may load an employer’s full membership each month.
- APIs can be used daily to check for new enrollments, terminations, or changes in coverage tiers.

The Tuva project will rely exclusively on the data received from flat files given they are best fit for analytical use cases and allow historical data to be altered and re-run (more on this later), however the above context should help in understanding discussions between organizations around eligibility verification. The remainder of this article will focus on eligibility falt files and how they should be leveraged to ensure accurate analytics with the Tuva Project.


### Common Eligibility File Formats
- **Eligibility Spans**: Eligibility files that leverage eligibility "spans" have only a single record per patient for a particular continguous timeframe of eligibility (there's some nuance here if other member identifiers change, but we'll cover that more later one). Essentially the number of records in the file will be substantially less, as members are not repeated as frequently in the "member month" file format outlined below. 
- **Member Months**: Member month files have a single record for each member, for each month, for each type of coverage they have (coverage type is only relevant if multiple coverage types are applicable, for instance separate medical, dental, and vision coverage). Eligibility and demographic information can change in each individual member month record (more on this in the attributes section below), generally the latest information received from a member for that particular month is included in the monthly record, and any member with a single days coverage is included in a given month.

### Retroactivity
Health care organizations rarely deal with data that stands still. "Retroactive" changes (often just referred to as "retroactivity") occur frequently due to changes in coverage that require a particular members coverage to be back-dated in some way, common reasons for retroactivity changes are:
- A newborn added after birth
- An employee who backdates coverage after a job change
- A member's coverage is back-dated due to non-payment (after a grace period)
- A dependent dropped months after a divorce.

These retro changes complicate the tracking of eligibility and can also have impacts downstream in other areas of healthcare data. Claims that were already processed may need to be reversed or reprocessed, membership counts swing up or down long after the fact, billing and payroll systems may not align with the updated coverage. Each adjustment creates opportunities for mismatches between systems, making reconciliation a perennial task that any healthcare organization will need to manage. There is no "magic bullet" to manage retroactive changes, the best policy is to ensure you align on how to manage retroactive changes internally for reporting and with organizations you are transmitting data to and from.

### Common Eligibility Types
- **Incremental**: Incremental eligibility files are generally used when providing a member month file format, with only the most recent member months being provided in each individual file. This is the simpliest method of transmission logic as you can combine each individual file together to get a complete history of eligibility, however it will NOT capture retroactive changes to eligibility that may have occurred. For administrating many programs, capturing retroactivity is unnecessary, but it will have an impact on many analytic calculations and therefore can cause issues when reconciling data for many programs.
- **Full Replacement**: Full replacement eligibility files provide a full history of the eligibility records since the inception of the contract/program. Full replacement files can be provided in either eligibilty span or member month format, and allow retroactive changes to be captured correctly and are the most accurate for reconciling changes over time, however given that the files will continue to grow over time this can cause some performance issues for transmission and process over time.
- **Hybrid**: The limitations of incremental and full replacement files sometimes lead organizations to provide a hybrid set of files. Incremental files are leveraged for regular weekly/monthly updates, but yearly "true-up" files are provided with the "final" eligibility data for past years of data (generally after a period of run-out, 3 months being the most common). The final eligibility files are used for historical data while incremental files are used where final data is not yet available, providing a "best of both worlds" approach that can be helpful for many programs.

### Eligibility File Attributes
- **Start & End Dates**:
    - Eligibility start and end dates represent the beginning and end of a particular coverage. However, note that the existance of start or end date does NOT necessarily mean a member is new or is terminating coverage, a member may have changes plans, moved, or had some other attribute change that requires eligibility to change, and you will need to look across all eligibility records to determine if a member is truly new, termed, or just had a change in eligibility requiring a reset of start/end dates.
    - Eligibility start and end dates are most commonly the first day and last day of a month, but note that this is not always the case. Sometimes mid-month start/end dates are required, this could be because of a employment event (mid-month hiring), a life event (birth of a child), or program transition (Medicare/Medicaid transitions are often on exact eligibility determination date)
- **Subscriber/Cardholder**:
    - Identifying the primary subscriber, contract holder, cardholder is often necessary for understanding plan coverage and identifying / differentiating which members are covered under a particular policy. Typically, an eligibility file will have both a member ID and a subscriber ID, the member ID is unique to each individual member, while the subscriber ID is repeated for all members covered by the policy, which can be used to "group" members that are covered together. In addition, to the subscriber ID used for grouping members, the members "relationship" to the subscriber may also be listed, common relationship types used are:
        - Spouse / Partner
        - Child / Dependent
        - Covered Adult
- **Demographics**:
    - Eligibility files generally also include member demographics and contact information, however sometimes this information is provided separately in a "enrollment" or "marketing" file. If this is the case you need to ensure that common member identifiers are available to combine the files and that you have effective dates in both files to make joining them seamless
    - Note that changes in demographic information are often the cause of eligibility start/end date changes, so you may see eligibility spans that look unnecessary based on the plan coverage, but are due to a demographic changes like a chanage o
    - Common Attributes:
        - Plan / Group Info: 
        - Address, Email, Phone Numbers:
        - Other program eligibility (DUAL-coverage, subsidies eligibility, etc.)
    - **Age/Birth Date**: Age / birth date are also commonly used, however there is nuance here that must be accounted for. When calculating the person's age, it's important to understand if the file is calculating the age as of the date of the file generation, or the date of coverage for that particular record. Best practice is to calculate the member's age for the timeframe in question so that analytics are accurate when you are analyzing data based on the age of a member (past year's data reflecting the member's current age will mislead and cause issues)
    - **Provider Alignment/PCP Election**:

### EMR Patient Data
EMR patient data is slightly different then the information received on a classic eligibility file, as the purpose is not to validate coverage but instead store the latest information available for that member. Many EMRs will have history of changes in address and other demographic information for a member, but frequently the EMR patient data is a point in time with only the latest demographic and health plan coverage information for a patient. You will need to account for this when creating historical analytics for a particular patient, and it may require you to combine the EMR data with other eligibility information (for instance health plan eligibility files) in order to determine the history of coverage for a particular plan or program.

### Sources of Enrollment Data
- Payers
- Clearinghouses/Aggregators
- CMS
- NAIC

### A special note on Member Months


### Other 
- Key Relationships: Claims, EMR Data, Attributed/Assigned Providers, Provider Network Membership (Tied to Plan)

Typical Health Plan Concepts (Member Month)
        - When to count a member month (1st, 15th, last, etc…)
    - Key elements
        - Plan Information
        - Subscriber Relationship
        - Member Demographics & Geography
        