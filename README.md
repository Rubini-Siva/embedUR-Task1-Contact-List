Task 1 : 

Develop a basic contact list application that includes a list of contacts and when clicked it displays the details of the contact. Make a search bar that helps to search for a contact from the list. Containerize the application using Docker and host the same via a docker.

Video link of the output : 

Technology Stack Used :

      Frontend : ReactJs + Tailwind CSS
      Backend  : Golang
      Database : Postgre SQL
      Devops   : Docker

Description :

   The Database will contain all the contact information. I will be fetched and displayed on the webpage using the Golang server which interacts with the backend and frontend. Changes such as adding new contacts, deleting contacts etc.. will be reflected in the webpage by refreshing it. This application only displays the contact list where we can search particular contacts by name, gender, role, and location. Also, When click the details button, details about the specific contact will be displayed.

Run the application : 

1) Download Docker Desktop and sign in by using the mail ID.
2) Install the required WSL 2 version and enable the Hyper-V platform, Virtualization, and Virtual Machine Platform from "Turn on or off windows features"
3) Install npm, PostgreSQL, Golang, and Tailwind CSS. Once installed, check the version available for confirmation.
4) Run command in task1 folder (frontend): " npm install " for required packages.
5) Run the command " docker-compose up --build " outside the task1 and backend folder. 
6) Now, browse http://localhost to run the web application.

*** Screenshots are attached on the screenshot folder. ***

