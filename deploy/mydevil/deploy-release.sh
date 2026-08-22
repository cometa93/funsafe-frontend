#!/usr/local/bin/bash
set -eu

VERSION=${1:?Version is required}
PUBLIC_DIR=${2:?Public directory is required}
RELEASE_ROOT=${3:?Release root is required}

case "${VERSION}" in
  *[!0-9.]*|'') echo "Invalid version" >&2; exit 1 ;;
esac
case "${PUBLIC_DIR}" in
  /usr/home/*/domains/safe.funventure.eu/public_html) ;;
  *) echo "Refusing unsafe public directory: ${PUBLIC_DIR}" >&2; exit 1 ;;
esac
case "${RELEASE_ROOT}" in
  /usr/home/*/apps/safefun/frontend) ;;
  *) echo "Refusing unsafe release root: ${RELEASE_ROOT}" >&2; exit 1 ;;
esac

INCOMING_DIR="${RELEASE_ROOT}/incoming/${VERSION}"
RELEASE_DIR="${RELEASE_ROOT}/releases/${VERSION}"
CONFIG_DIR="${HOME}/.config/safefun"
HTPASSWD_FILE="${CONFIG_DIR}/site.htpasswd"
[ -f "${INCOMING_DIR}/frontend.tar.gz" ] || { echo "Missing frontend bundle" >&2; exit 1; }
[ -f "${INCOMING_DIR}/site.htpasswd" ] || { echo "Missing preview credentials" >&2; exit 1; }
[ ! -e "${RELEASE_DIR}" ] || { echo "Release ${VERSION} already exists" >&2; exit 1; }

mkdir -p "${RELEASE_DIR}" "${PUBLIC_DIR}" "${CONFIG_DIR}"
install -m 600 "${INCOMING_DIR}/site.htpasswd" "${HTPASSWD_FILE}"
tar -xzf "${INCOMING_DIR}/frontend.tar.gz" -C "${RELEASE_DIR}"
cp -R "${RELEASE_DIR}/." "${PUBLIC_DIR}/"
rm -f "${INCOMING_DIR}/site.htpasswd"
printf '%s\n' "${VERSION}" > "${RELEASE_ROOT}/CURRENT_VERSION"
echo "Frontend ${VERSION} deployed successfully"
