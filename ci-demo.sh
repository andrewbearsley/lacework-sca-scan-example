#!/usr/bin/env bash
# Demo: what a CI/CD stage does with FortiCNAPP SCA.
# Scan the app, write pipeline artifacts, fail the build on Critical findings.
set -uo pipefail
cd "$(dirname "$0")"

TARGET="${1:-./swiss-cheese-app}"
OUT="./ci-results"
FAIL_ON="${FAIL_ON:-critical}"   # critical | high

echo "== Stage 1: scan $TARGET (SCA + SAST + secrets + SBOM) =="
lacework sca scan "$TARGET" \
  --deployment ci \
  --formats lw-json,sarif,md-summary,cdx-json \
  --output "$OUT" 2>&1 | grep -v "Loading component"

echo
echo "== Stage 2: pipeline artifacts =="
ls -1 "$OUT"

echo
echo "== Stage 3: policy gate (fail on $FAIL_ON) =="
JSON="$OUT/output-lw.json"
CRIT=$(jq '[.Vulnerabilities[] | select(.Info.Severity=="critical")] | length' "$JSON")
HIGH=$(jq '[.Vulnerabilities[] | select(.Info.Severity=="high")] | length' "$JSON")
echo "critical=$CRIT high=$HIGH"

if [ "$FAIL_ON" = "high" ]; then GATE=$((CRIT + HIGH)); else GATE=$CRIT; fi
if [ "$GATE" -gt 0 ]; then
  echo "BUILD FAILED: $GATE $FAIL_ON-or-worse vulnerabilities. Fix:"
  jq -r '(.Artifacts | map({(.Id): "\(.Name)@\(.Version.Version)"}) | add) as $a
         | .Vulnerabilities[] | select(.Info.Severity=="critical" or .Info.Severity=="high")
         | "  \(.Info.Severity|ascii_upcase)\t\(.Info.ExternalId)\t\($a[.AffectedArtifactIds[0]])\tfix: \(.Info.FixVersion.Version // "none")"' "$JSON" \
    | sort
  exit 1
fi
echo "BUILD PASSED"
