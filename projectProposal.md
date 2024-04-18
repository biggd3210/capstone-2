# Facility File System 

### The agency I work for has indicated there is a need for automation/improvement in the efficiency of the filing system and storage database for facility forms and documents. Due to contracting with the state, there are forms that need completed and kept on file, monthly, quarterly, or annually. When these forms are submitted, a tickler is updated and sent to each facilty respectively. My goal for this app is make a friendly UI that is easy to follow for end users and efficient in storing files and providing timely reminders to facilities for upcoming or overdue docs. 

1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project.
    
    - I will be using Node, Express, and React to build the site. React Strap will help with styling. 

2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?
    
    - The app will need a decent back end to handle the types of requests. But the UI is equally as important as this is a B2B application. My goal is to have an even and well rounded app. 

3. Will this be a website? A mobile app? Something else?
    
    - This will begin as a website. If the agency I work for decides they want it, it might be refactored to plugin to the site they already have. 

4. What goal will your project be designed to achieve?
    
    - to assist a non-profit agency improving their workflow efficiency. 

5. What kind of users will visit your app? In other words, what is the demographic of your users?
    
    - Family Style mental health care providers who contract with the state to provide services to youth in care. 

6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API.
    
    - I will be designing my own API that will handle requests from front end users and assist with organizing and storing data. There will not be any background data I need to pull from a 3rd party location. The data will be organic and provided from the users themselves. 

7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information:
    
    a. What does your database schema look like?
        
        - There will be a table for each type of form that is used. 
        
        - There will be a table for Users. And a table of facilities. Users can be mapped to which facility they're allowed to edit (if they work with or in that specific facility.)
        
        - There will be a table of blank forms as well if the user needs to print a copy for some reason. 
    
    b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data.
        
        - I suppose I need clarification on this as I shouldn't need to webscrape to gather data as it will be coming from the users themselves. That being said, I'm aiming to have quality validation tools in place to prevent poorly filled out forms from being submitted. 
    
    c. Is there any sensitive information you need to secure?
        
        - There should not be as the facility documents for the agency do not pertain to any of the persons served. It only pertains to facilities based issues, repairs, maintenance, inspections, etc. The agency has a database and secure server to handle HIPAA compliance and I will not be working with that. 
    
    d. What functionality will your app include?
        
        - Initially, the app will allow end users to upload forms and store them in the database. It will also automatically calculate the due dates for all forms as they are recurring. Eventually, a user will be able to fill out a form online without having to print and handwrite. (The forms need to meet special compliance with everything that is displayed. So any forms I write for the page will need to be approved prior to publication. so this is a later step.)
    
    e. What will the user flow look like?
        
        - When a user signs in, they will see a dashboard displaying the current tickler for their home facility. Admin will be able to see all deadlines for all facilities. 
        
        - The navbar will include links to blank forms that might be needed as well as form submission.
        
        - Form submission will take them through the process of submitting a form that will store the form on the database and reflect an updated deadline for the next submission of the form. 
        
        - The app will also send reminders to any user associated with a facility whose deadlines are approaching. (These will look different depending on what the forms are and when the facility needs them. Some forms are due regularly such as every month or every quarter. However there are forms like work orders for repairs that have different projected deadlines based on teh project.)
    
    f. What features make your site more than a CRUD app? What are your stretch goals?
        
        - I would eventually like to have all forms migrated digitally so a user could walk around on their tablet (agency provided) and fill out forms without having to waste the paper to print them. Once a user fills out a form, I would like to add a feature to the app where the digital form will fill out a document/pdf with the data so that it could be printed if necessary and placed in a paper file. (Some requirements from the state indicate a need to keep a digital and a paper file.)
        
        - To start out, only some forms will have presence and functionality on the site. Stretch goal would be for all forms to have presence and functionality on the site. 
        
        - My aim is to eventually factore this project so it can be scalable and useable for other platforms or companies. Not just my agency. Therefore, I'm planning on making it modular in build so certain pieces could be hooked in when necessary but easily modifiable if not. 