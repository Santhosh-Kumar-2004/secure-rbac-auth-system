import json
from datetime import datetime
from pathlib import Path

LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)

AUDIT_LOG_FILE = LOG_DIR / "audit.log"


def write_audit_log(
    *,
    actor: str,
    action: str,
    resource: str,
    result: str,
    ip: str,
    user_agent: str,
    metadata: dict | None = None
):
    log_entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "actor": actor,
        "action": action,
        "resource": resource,
        "result": result,
        "ip": ip,
        "user_agent": user_agent,
        "metadata": metadata or {}
    }

    with open(AUDIT_LOG_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(log_entry) + "\n")
