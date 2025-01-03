## Deployment Link : https://communication-calender.vercel.app/

## Dashboard
![image](https://github.com/user-attachments/assets/3c06701d-9855-4eb1-aab9-710d885fd34c)

The dashboard of the **Communication Calendar** application provides an intuitive interface to track companies, recent interactions, upcoming planned communications, and their statuses for streamlined communication management.

## Companies
![image](https://github.com/user-attachments/assets/62a8f22f-3896-4498-ae51-55b989700b5a)

On the Companies page, you can view, add, edit, and delete company.

## Adding New Company
![image](https://github.com/user-attachments/assets/917c5d90-25aa-494a-b638-7f35262bebe0)

To add a new company, click on the "Add company" button, fill in the required fields.

## Add Communication Method
![image](https://github.com/user-attachments/assets/df5c7f26-081c-4fb5-a0bd-92a564bb3176)
here you can add the communication Method and details

## Communication Methods
 ![image](https://github.com/user-attachments/assets/e2f9f845-5983-404b-9181-3a24cf47fd54)
on this page we can view methods of communication and method name
 ## Communication Calender
  ![image](https://github.com/user-attachments/assets/3004ad76-6239-47a9-a3aa-74b555e66618)
  You can view and display the communication with expected delivery date by clicking a particular date on a calender
## Due Communication
 ![image](https://github.com/user-attachments/assets/fae43293-5543-4e92-9bba-db6ebc251ff5)
The **Communication Calendar** dashboard highlights due communications by marking them as "Overdue," enabling users to prioritize and address missed or pending interactions efficiently.
## Navigation
  ![image](https://github.com/user-attachments/assets/4fede945-ab8a-4de2-8334-893cf19da2af)
The **Communication Calendar** features a navigation bar with tabs for the **Dashboard**, **Calendar**, and **Admin** sections, allowing seamless access to communication tracking, scheduling, and administrative settings.
## Application Functionality

  1. Admin Module:
    Allows admins to set up companies.
    Admins can configure communication parameters such as frequency and method.
    Admins have tools for managing data related to companies and communication tasks.
  
  2. User Module:
    Users can visualize, manage, and log communication tasks.
    Provides two views:
    Past Communications: Displays all completed communications sorted by date.
    Upcoming Communications: Lists all planned communications that are scheduled for future dates.
  
  3. Includes a Notification System:
    Overdue communications are flagged.
    Communications due today are highlighted.
    Users can log communication events through a dedicated form.
  
  4. Communication Logging:
    Supports logging communication for single or multiple companies at once.
    Includes fields for date, method, and optional notes.
    Automatically associates logged communications with the selected companies.
  
  5. Dark Mode Support:
    Enhanced user interface for dark mode compatibility.
    Ensures proper contrast and visibility of all form elements.
    Dynamic Filtering and Sorting:
  
  6. Filters communications based on time (past vs. upcoming).
    Sorts communications in descending order for past and ascending for upcoming tasks.

## Known Limitations:

  1. Notification Accuracy:
    The notification system relies on computed properties from data. If there are data inaccuracies (e.g., missing periodicity or incorrect communication logs), the notifications might not reflect the correct status.
  
  2. Limited Admin/User Separation:
    Current implementation does not differentiate between admin and user modes at the authentication level.
    Both admin and user functionalities are accessible within the same UI, separated by tabs or sections.
    Future implementations might require proper role-based access control.
  
  3. Limited Data Validation:
    Dependencies between communication methods, companies, and communications are not strictly enforced.
    Deleting a company or communication method could leave orphaned records.
