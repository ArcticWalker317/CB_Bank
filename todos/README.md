# Todos

File-based tracking for bugs, features, and technical debt.

## File naming

```
{issue_id}-{status}-{priority}-{description}.md
```

- **status**: `pending` (needs triage), `ready` (approved), `complete` (done)
- **priority**: `p1` (critical), `p2` (important), `p3` (nice-to-have)

## Quick commands

```bash
# List all active todos
ls todos/*-pending-*.md todos/*-ready-*.md 2>/dev/null

# Find next issue ID
ls todos/ | grep -o '^[0-9]\+' | sort -n | tail -1

# List by priority
ls todos/*-p1-*.md
```

## Template

See `assets/todo-template.md`.
