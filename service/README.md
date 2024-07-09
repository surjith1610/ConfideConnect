## Installations and setups
    - cd service
    - npm init
    - npm i express mongoose cors
    - npm install nodemon dotenv --save-dev 
    - npm install jsonwebtoken
    - npm install nodemailer
    - npm install socket.io
    - npm install stripe

## Run Backend
        - cd service
        - npm i
        - npm install nodemon dotenv --save-dev 
        - add "start": "nodemon server.js" in scripts in package.json
        - npm start

## DB details
project: ConfideConnect
cluster: ConfideConnectCluster
username: admin
password: connect123
connection string = "mongodb+srv://admin:connect123@confideconnectcluster.purt6ji.mongodb.net/confideconnectdb?retryWrites=true&w=majority&appName=ConfideConnectCluster"

## .env details
MONGO_CONNECTION=mongodb+srv://admin:connect123@confideconnectcluster.purt6ji.mongodb.net/confideconnectdb?retryWrites=true&w=majority&appName=ConfideConnectCluster
SECRET_ACCESS_KEY='your_secret_access_key'
SECRET_REFRESH_KEY='your_secret_refresh_key'
RESET_TOKEN_EXPIRATION_SECONDS=3600
ADMIN_EMAIL="confideconnect@gmail.com"
ADMIN_EMAIL_APP_PASSWORD="lzcuvhkbnxyfnjyh"
URL=http://localhost:5173/confideconnect

## setup gmail for nodemailer
1. In google account settings of confideconnect@gmail.com, set app password
2. In gmail account settings of confideconnect@gmail.com, in Forwarding and POP/IMAP enable IMAP
3. In env app password as ADMIN_EMAIL_APP_PASSWORD


