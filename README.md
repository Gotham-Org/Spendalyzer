Spendalyzer is a web-app that allows the user to keep a track of daily spending and analyzes your expenditure and displays it as a list and a graph. 
Technologies used: HTML,CSS, JavaScript for Frontend, MySQL for Database and Node.js for Backend.

Before running the code you should have a database setup in MySQL Workbench with following data:
Database name = 'spendalyzer'
Table name = 'expenses'
Columns: 
+--------+--------------+------+-----+---------+----------------+
| Field  | Type         | Null | Key | Default | Extra          |
+--------+--------------+------+-----+---------+----------------+
| id     | int          | NO   | PRI | NULL    | auto_increment |
| Title  | varchar(255) | NO   |     | NULL    |                |
| Amount | float        | YES  |     | NULL    |                |
| Date   | date         | NO   |     | NULL    |                |

After the database is set, install the dependencies using 'npm install' and then run the command 'npm run dev' to start the server and open index.html on live server using live-server extension in VS Code.
