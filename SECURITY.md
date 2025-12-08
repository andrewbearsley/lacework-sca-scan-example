# Security Notice

## Intentional Security Vulnerabilities

⚠️ **WARNING: This repository contains intentionally vulnerable code and fake secrets for demonstration purposes only.**

This repository is designed to demonstrate Software Composition Analysis (SCA) scanning capabilities. It intentionally includes:

- **Fake/Test Secrets**: All API keys, tokens, and credentials in this repository are **FAKE** and **NOT REAL**. They are included solely to demonstrate secret detection capabilities.
- **Vulnerable Dependencies**: Outdated packages with known CVEs
- **Security Weaknesses**: SQL injection, eval injection, weak hashing, etc.

### Fake Secrets Included

All secrets follow patterns that match real secret formats but are clearly fake:
- Stripe keys: `sk_live_51H3ll0W0rld...` (contains "H3ll0W0rld" indicating fake)
- AWS keys: Uses AWS official example keys (`AKIAIOSFODNN7EXAMPLE`)
- GitHub tokens: `ghp_1234567890...` (sequential numbers indicating fake)
- Other tokens: All follow obvious fake patterns

### GitHub Secret Scanning

GitHub's secret scanning may flag these fake secrets. If you see alerts:
1. These are **intentional** and **fake** - safe to dismiss
2. This repository is for **educational/demonstration purposes only**
3. No real credentials are exposed

### For Repository Maintainers

If you need to bypass secret scanning alerts:
- Dismiss the alerts in GitHub's security tab
- Add this repository to your organization's secret scanning allowlist (if available)
- Contact GitHub support if you need assistance

**DO NOT** use any credentials from this repository in production environments.

