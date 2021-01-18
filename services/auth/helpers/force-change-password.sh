# Initiate auth
aws cognito-idp initiate-auth \
--region eu-west-1 \
--client-id 6vu4ivue0se57dqmgjci3ehkt \
--auth-flow USER_PASSWORD_AUTH \
--auth-parameters USERNAME=miika.luiro@outlook.com,PASSWORD=Jeejee123!

# Respond to auth challenge
aws cognito-idp respond-to-auth-challenge \
--region eu-west-1 \
--client-id 4uunk2r3mqvat88767pdcd7a36 \
--challenge-name NEW_PASSWORD_REQUIRED \
--challenge-responses USERNAME=<username>,NEW_PASSWORD=<password> \
--session <session-id-from-initiate-auth>

