# Credential Rotation Guide

## Exposed Credentials (Must Rotate)

The following secrets were committed to git history and must be rotated:

| Secret | Value (last 4 chars) | Exposed In | Service |
|---|---|---|---|
| MongoDB URI | `...Cluster0` | backend git history (3 commits) | MongoDB Atlas |
| Better Auth Secret | `...zhup` | both .env files | Better Auth |
| Google Client ID | `...dont` | frontend .env | Google Cloud Console |
| Google Client Secret | `...qBwz` | frontend .env | Google Cloud Console |

## Rotation Steps

### 1. MongoDB Atlas

1. Go to https://cloud.mongodb.com → Security → Database Access
2. Delete the `SportNest` user
3. Create a new user with a strong password
4. Update connection string in both `.env` files
5. Update IP whitelist if needed

### 2. Better Auth Secret

```bash
# Generate new secret
openssl rand -hex 32

# Update BETTER_AUTH_SECRET in:
#   backend/.env
#   frontend/.env
```

### 3. Google OAuth

1. Go to https://console.cloud.google.com → APIs & Services → Credentials
2. Find the OAuth 2.0 Client ID for SportNest
3. Delete or regenerate the client secret
4. Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `frontend/.env`

## Post-Rotation Checklist

- [ ] All services restart with new credentials
- [ ] Auth flows work (login, signup, Google OAuth)
- [ ] MongoDB connections succeed
- [ ] Git history no longer contains secrets (consider `.git-blame-ignore-revs`)

## Prevent Future Exposures

- `.env` files are in `.gitignore` — verify before every commit
- Use `git secrets` or `.env` scanning in pre-commit hooks
- Consider using a secret manager:
  - **Vercel** for frontend env vars (free)
  - **GitHub Actions Secrets** for CI/CD
  - **AWS Secrets Manager** / **HashiCorp Vault** for production
