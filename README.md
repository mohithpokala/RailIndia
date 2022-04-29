# RailIndia

The aim of this project is to build a web application that allows users to 
view the information of various trains and stations in the Indian Railway 
network. It also allows users to book seats on a train and view the 
availability. 

The web application also displays various statistics relating to the 
Indian Railway network dataset. The detailed project proposal can be 
viewed at this 
[link](https://docs.google.com/document/d/1qFgo9zRUJYhb9-cxu7YAyFyS8E3PsdT8U2l-xzNcVFI/edit 
).
We jotted down various implementation ideas in rough over 
[here](https://docs.google.com/document/d/10oi_GV8wzoeZaYYYcrU4NkAEe1DAV9ea_DhNbPBm60I/edit).

The initial submission with respect to the project details and ER diagrams 
is 
[here](https://docs.google.com/document/d/e/2PACX-1vSmXQEsxZ5Pj7gX7MVy9amVMYhM1G6nRHbiDOBCnrO3-bkc6izFCOZY1vbYdHnxrFN_kPRobC5rBHbQ/pub).

---

# Running Frontend
1. cd client
2. npm install
3. npm i react-router-dom@next
4. npm start

# Running Backend
1. cd new_server
2. npm install
3. npx nodemon start

# Load Testing
1. cd dataset
2. pip install indian-names
3. python loadtest.py
----

>Test Plan.pdf contains the different testcases by which the performance and validation of the website can be done
***
>Website Layout.pdf explains how the frontend of our website looks like and how the transition among different pages takes place
***
>Requirement and analysis.pdf contains different use cases for the website and explains various relationships and entities present in the database
>Design Document.pdf explains the schema (i.e 3NF Decomposition ) used for generating the ddl file and it contains all the wuerries that we implemented
>Schema.ddl is used to load and create tables into the database with required relationships
>dataset folder consist of insert.py file which is used to generate multiple queries which will then be loaded into the database
>client folder consists of all frontend related files
>new_server folder consists of all backend related files
