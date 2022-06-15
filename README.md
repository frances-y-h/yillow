<h1 align="center">🏠 Yillow</ha>

<h3 align="center">The leading real estate marketplace. Search thousands of for-sale homes and connect with local professional real estate agents.</h3>

<p align="center"><a  href="https://yillow-app.herokuapp.com">Yillow Live Demo</a></p>

### Splash Page

<img width="909" alt="Screen Shot 2022-06-15 at 7 57 20 AM" src="https://user-images.githubusercontent.com/97005157/173861600-5e1f5085-46bb-4510-ac9f-9a2e88b23bab.png">

### Google Map Search and filter

<img width="904" alt="Screen Shot 2022-06-15 at 7 58 25 AM" src="https://user-images.githubusercontent.com/97005157/173861622-eb9f123c-3d1f-4b8b-9f56-21c65b87507f.png">

### Browse Properties and Schedule Appointments

<img width="901" alt="Screen Shot 2022-06-15 at 7 59 13 AM" src="https://user-images.githubusercontent.com/97005157/173861642-c53e0e50-2532-490d-87ea-b4afbc342291.png">

### Manage Appointments

<img width="899" alt="Screen Shot 2022-06-15 at 8 00 27 AM" src="https://user-images.githubusercontent.com/97005157/173861674-6d72edff-a0e9-4932-b421-0672658e0eff.png">

### Search and Review Agents

<img width="898" alt="Screen Shot 2022-06-15 at 8 01 03 AM" src="https://user-images.githubusercontent.com/97005157/173861712-96988a38-f093-4748-a051-402796aa4cb6.png">

<img width="899" alt="Screen Shot 2022-06-15 at 8 01 15 AM" src="https://user-images.githubusercontent.com/97005157/173861686-2ce7ee52-d75f-4db1-8b19-36a0ff917c28.png">

## Yillow at a Glance

Yillow is a full stack application that allows users to search and filter for properties. A user does not need to log in to use the search property and agent feature, but if they choose to setup an account with Yillow, they can also schedule appointment to tour the properties, and review their experience with the agent.

## Getting Started

1. Clone the repository

```
git clone git@github.com:frances-y-h/yillow.git

```

2. Install dependencies

- In root folder, install Python server.

```
pipenv install
```

- Navigate to React-app folder, install React

```
cd React-app
npm install
```

3. Setup your PostgreSQL user, password and database

```
psql
CREATE USER yillow_app WITH PASSWORD 'password';
CREATE DATABASE yillow_app WITH OWNER yillow_app;

```

4. create a .env file in root folder, based on the .env.example with proper settings for your development environment

5. Migrate and seed your database in root folder

```
pipenv run flask db upgrade
pipenv run flask seed all

```

6. Start the server

- In root folder

```
pipenv run flask run
```

- Navigate to React-app folder

```
npm start
```

7. Have fun!

## Application Architecture

Yillow is built on React and Redux frontend with Python Flask backend, using PostgresSQL as a database.

### Technologies Used

- [Docker](https://www.docker.com/)
- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Javascript](https://www.javascript.com/)
- [Google Map API](https://developers.google.com/maps)
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.1.x/)
- [Flask SQL Alchmeny](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
- [Flask Alembic](https://flask-alembic.readthedocs.io/en/stable/)
- [PostgresSQL](https://www.postgresql.org/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Conclusion and Next Steps

Yillow is not only a communication platform for regular users, also for agents. The next step for Yillow is to implement the agent interface, porfolio page, manage appointments, and communicate with client users through chat channels(web socket).

## Conatact

- Frances (Huang) Lau <a href="https://www.linkedin.com/in/frances-huang-660607156">Linkedin</a> | <a href="https://github.com/frances-y-h">Github</a>
