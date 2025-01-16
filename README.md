## Facility-Assist
### A multi-funcitonal filing tool for the childcare facilities oh Ohio.

##### For a running example of this program, please navigate [here](https://facility-assist-frontend-base.onrender.com) . 
This project is still in development. However, if you would like to replicate the program, install the dependencies for both the front-end and the back-end. For development, I used nodemon for the backend server. Run the command like this:<br>
`nodemon server.js`
For the front end, the program was built using Vite. The run command is:<br>
`npm run dev`

In order to sign in, the following are the credentials for a test user:<br>
username: testuser<br>
password: password

In the current iteration, users are able to upload new documents, view documents for their associated facilities, and download items that have been uploaded. 

The program uses R2 buckets from Cloudflare for image and full document/attachment storage. Eventually, each form will have its own page that will store the document data and the only items that will be stored in the R2 bucket will be image attachments such as photo evidence of repairs or damage, or items of similar nature. 

The main focus as of this moment is the tickler view. Once the tickler view is complete, the next step will be for the server to run a check once daily to provide an updated tickler that is sent to admins and end users to ensure timely submission of documentation. 

For any questions, comments, or concerns, please email:<br>
derek.s.biggers@gmail.com
