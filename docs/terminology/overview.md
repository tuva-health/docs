---
id: overview
title: "Overview"
description: The Tuva Project makes it easy to load useful terminology sets like ICD-10 codes directly into your data warehouse where you need them for analytics.
---

import { JsonDataTable } from '@site/src/components/JsonDataTable';
import { JsonDataTableNoTerm } from '@site/src/components/JsonDataTableNoTerm';

Terminology sets are reference code sets and descriptions used in claims and 
medical record data.  These code sets are maintained by many different 
organizations, updated on various frequencies, and often distributed in ways 
that make it a pain to load them into your data warehouse.

Most of the terminology sets are too large to maintain on GitHub so we maintain 
them on AWS S3.

The following video demonstrates how to load all the terminology and value sets 
from Tuva into your data warehouse.  

<iframe width="560" height="315" src="https://www.youtube.com/embed/oJyuJ4XFYNI?si=2OqvRdcL9D9itUrB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe>

<table>
  <thead>
    <tr>
      <th>Terminology Set</th>
      <th>Maintainer</th>
      <th>Last Updated</th>
      <th>Download CSV</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="../terminology/admit-source">Admit Source</a></td>
      <td>National Uniform Billing Committee</td>
      <td>1/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/admit_source.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/admit-type">Admit Type</a></td>
      <td>National Uniform Billing Committee</td>
      <td>1/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/admit_type.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
        <tr>
      <td><a href="../terminology/ansi-fips-state">ANSI FIPS State</a></td>
      <td>ANSI</td>
      <td></td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/ansi_fips_state.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/apr-drg">APR-DRG</a></td>
      <td>3M</td>
      <td>1/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/apr_drg.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/bill-type">Bill Type</a></td>
      <td>National Uniform Billing Committee</td>
      <td>11/3/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/bill_type.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/calendar">Calendar</a></td>
      <td></td>
      <td></td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/calendar.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/census-shape-files">Census Shape Files</a></td>
      <td>U.S. Census</td>
      <td></td>
      <td><a></a></td>
    </tr>
    <tr>
      <td><a href="../terminology/claim-type">Claim Type</a></td>
      <td>Tuva</td>
      <td>11/4/2023</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/claim_type.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/code-type">Code Type</a></td>
      <td>Tuva</td>
      <td>4/19/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/code_type.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/discharge-disposition">Discharge Disposition</a></td>
      <td>National Uniform Billing Committee</td>
      <td>1/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/discharge_disposition.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/encounter-type">Encounter Type</a></td>
      <td>Tuva</td>
      <td>6/17/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/encounter_type.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/ethnicity">Ethnicity</a></td>
      <td>Tuva</td>
      <td>11/3/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/ethnicity.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/fips-county">FIPS County</a></td>
      <td>Tuva</td>
      <td>4/19/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/fips_county.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/gender">Gender</a></td>
      <td>Tuva</td>
      <td>4/19/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/gender.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/hcpcs-level-ii">HCPCS Level II</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>4/19/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/hcpcs_level_2.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/hcpcs-to-rbcs">HCPCS to RBCS</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>8/26/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/hcpcs_to_rbcs.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/icd-9-cm">ICD-9-CM</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>5/10/2023</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/icd_9_cm.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/icd-9-pcs">ICD-9-PCS</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>5/10/2023</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/icd_9_pcs.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/icd-10-cm">ICD-10-CM</a></td>
      <td>Centers for Disease Control and Prevention (CDC)</td>
      <td>1/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/icd_10_cm.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/icd-10-pcs">ICD-10-PCS</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>1/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/icd_10_pcs.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/loinc">LOINC</a></td>
      <td>Regenstrief Institute</td>
      <td>9/18/2023</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/loinc.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/loinc-deprecated-mapping">LOINC Deprecated Mapping</a></td>
      <td>Regenstrief Institute</td>
      <td>9/18/2023</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/loinc_deprecated_mapping.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/mdc">MDC</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>1/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/mdc.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/medicare-dual-eligibility">Medicare Dual Eligibility</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>3/7/2023</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/medicare_dual_eligibility.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/medicare-orec">Medicare OREC</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>9/25/23</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/medicare_orec.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/medicare-status">Medicare Status</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>11/3/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/medicare_status.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/ms-drg-weights-los">MS DRG Weights and LOS</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>8/26/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/ms_drg_weights_los.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/ms-drg">MS-DRG</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>1/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/ms_drg.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/ndc">NDC</a></td>
      <td><a href="https://coderx.io/">CodeRx</a></td>
      <td>4/24/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/ndc.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/other-provider-taxonomy">Other Provider Taxonomy</a></td>
      <td>NUCC / CMS</td>
      <td>Semi-annually / Annually</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_provider_data/latest/other_provider_taxonomy_compressed.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/payer-type">Payer Type</a></td>
      <td>Tuva</td>
      <td>4/19/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/payer_type.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/place-of-service">Place of Service</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>4/19/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/place_of_service.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/present-on-admission">Present on Admission</a></td>
      <td>Centers for Medicare & Medicaid Services (CMS)</td>
      <td>4/19/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/present_on_admission.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/provider">Provider</a></td>
      <td>NPPES</td>
      <td>Monthly</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_provider_data/latest/provider_compressed.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/race">Race</a></td>
      <td>Tuva</td>
      <td>2/3/2023</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/race.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/revenue-center">Revenue Center</a></td>
      <td>National Uniform Billing Committee</td>
      <td>6/23/2022</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/revenue_center.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/rxnorm-to-atc">RxNorm to ATC</a></td>
      <td><a href="https://coderx.io/">CodeRx</a></td>
      <td>4/24/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/rxnorm_to_atc.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/snomed-ct">Snomed-CT</a></td>
      <td>US National Library of Medicine</td>
      <td>3/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/snomed_ct_compressed.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/snomed-ct-transitive-closures">Snomed-CT transitive closures</a></td>
      <td>US National Library of Medicine</td>
      <td>3/1/2024</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/snomed_ct_transitive_closures_compressed.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/snomed-ct-to-icd-10-cm-map">Snomed-CT to ICD-10-CM Map</a></td>
      <td>US National Library of Medicine</td>
      <td>9/1/2023</td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/snomed_icd_10_map.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/social-vulnerability-index">Social Vulnerability Index</a></td>
      <td>Centers for Disease Control and Prevention</td>
      <td></td>
      <td><a></a></td>
    </tr>
    <tr>
      <td><a href="../terminology/ssa-state-fips">SSA State FIPS</a></td>
      <td>Social Security Administration</td>
      <td></td>
      <td><a href="https://tuva-public-resources.s3.amazonaws.com/versioned_terminology/latest/ssa_fips_state.csv_0_0_0.csv.gz">Link</a></td>
    </tr>
    <tr>
      <td><a href="../terminology/zip-code">Zip Code</a></td>
      <td>U.S. Census / HUD</td>
      <td></td>
      <td><a></a></td>
    </tr>
  </tbody>
</table>