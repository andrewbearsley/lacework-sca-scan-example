# Lacework FortiCNAPP Software Composition Analysis Example

This project is an example of a Software Composition Analysis (SCA) policy for Lacework FortiCNAPP.

## Docs

https://docs.fortinet.com/document/lacework-forticnapp/latest/administration-guide/433465/software-composition-analysis-sca

## Usage
```bash
# Lacework CLI setup
lacework configure

# List installed components
lacework component list

# Install SCA component
lacework component install sca

# Update SCA component
lacework component update sca

# Scan the current directory
lacework sca scan .

# Generate Bill Of Materials (SBOM)
lacework sca scan ./ -f cdx-json -o sbom.json
```

## Example Output
```
❯ lacework sca scan .
* Walking through the directory sca-example
* Generating Lacework BOM of directory sca-example
* Generating file lists for artifacts
* Evaluating BOM model for issues
* Running static analysis on directory sca-example
* Generating source control references for directory sca-example
* Counting lines of code

Summary
-------
  Root artifact: sca-example
  Artifacts analyzed: 74
  Identities found: 0
  Repositories found: 1
  Licenses detected: 5 licenses in 5 expressions
  Copyrights detected: 33 owners in 98 notices
  License risks detected: 1
  Secrets detected: 265
  Vulnerable artifacts found: 8

Vulnerabilities
---------------
  ❌ Critical: 0
  🛑 High:     6
  🟧 Medium:   2
  🟡 Low:      4
  🔷 Info:     0
Total vulnerabilities: 12

lodash@4.17.15: 3 vulnerabilities
  direct: example-app@1.0.0 -> lodash@4.17.15
  🛑 High:     CVE-2020-8203, CVE-2021-23337
  🟧 Medium:   CVE-2020-28500
path-to-regexp@0.1.7: 2 vulnerabilities
  transitive: example-app@1.0.0 -> express@4.16.0 -> path-to-regexp@0.1.7
  🛑 High:     CVE-2024-45296, CVE-2024-52798
body-parser@1.18.2: 1 vulnerabilities
  transitive: example-app@1.0.0 -> express@4.16.0 -> body-parser@1.18.2
  🛑 High:     CVE-2024-45590
qs@6.5.1: 1 vulnerabilities
  transitive: example-app@1.0.0 -> express@4.16.0 -> qs@6.5.1
  🛑 High:     CVE-2022-24999
express@4.16.0: 2 vulnerabilities
  direct: example-app@1.0.0 -> express@4.16.0
  🟧 Medium:   CVE-2024-29041
  🟡 Low:      CVE-2024-43796
cookie@0.3.1: 1 vulnerabilities
  transitive: example-app@1.0.0 -> express@4.16.0 -> cookie@0.3.1
  🟡 Low:      CVE-2024-47764
send@0.16.0: 1 vulnerabilities
  transitive: example-app@1.0.0 -> express@4.16.0 -> send@0.16.0
  🟡 Low:      CVE-2024-43799
serve-static@1.13.0: 1 vulnerabilities
  transitive: example-app@1.0.0 -> express@4.16.0 -> serve-static@1.13.0
  🟡 Low:      CVE-2024-43800

Weaknesses
----------
  ❌ Critical: 0
  🛑 High: 272
  🟧 Medium: 2
  🟡 Low: 15
  🔷 Info: 0
Total weaknesses: 289

CWE-798: Use of Hard-coded Credentials
  265 instances (265 🛑 High)
  Javascript: 1 instances
  None: 129 instances
  Typescript: 135 instances
CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')
  6 instances (6 🛑 High)
  Typescript: 6 instances
CWE-95: Improper Neutralization of Directives in Dynamically Evaluated Code ('Eval Injection')
  1 instances (1 🛑 High)
  Typescript: 1 instances
CWE-287: Improper Authentication
  2 instances (2 🟧 Medium)
  Typescript: 2 instances
CWE-328: Use of Weak Hash
  11 instances (11 🟡 Low)
  Javascript: 10 instances
  Typescript: 1 instances
CWE-319: Cleartext Transmission of Sensitive Information
  2 instances (2 🟡 Low)
  Javascript: 2 instances
CWE-352: Cross-Site Request Forgery (CSRF)
  2 instances (2 🟡 Low)
  Javascript: 1 instances
  Typescript: 1 instances
```