# Initiate auth
aws cognito-idp initiate-auth \
--region eu-west-1 \
--client-id 7mlb9r6te77telhh3bi3ni57if \
--auth-flow USER_PASSWORD_AUTH \
--auth-parameters USERNAME=miika.luiro@outlook.com,PASSWORD=xxxx

# Respond to auth challenge
aws cognito-idp respond-to-auth-challenge \
--region eu-west-1 \
--client-id 7mlb9r6te77telhh3bi3ni57if \
--challenge-name NEW_PASSWORD_REQUIRED \
--challenge-responses USERNAME=miika.luiro@outlook.com,NEW_PASSWORD=xxxx \
--session xxxx