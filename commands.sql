13.1 - 13.3 Commands
- repo created at https://github.com/japeka/blogi_part13 (backend+frontend)
- instructed that for heroku sake application should be created (heroku not free, deployment will not be done to heroku)

- postgresql created locally and run inside docker instance
- docker pull postgres
- docker run -e POSTGRES_PASSWORD=<password> -p 5432:5432 -v /data:/var/lib/postgresql/data postgres
- docker ps > copy id
- docker exec -it <copied id> psql -U postgres postgres

- create blogs table inside docker instance
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,	 	   	
    likes INTEGER DEFAULT 0
);

- add 2 entries
insert into blogs (author, url, title, likes) values ('janne kal', 'abc.com','Go programming', 0);
insert into blogs (author, url, title, likes) values ('ari kal', 'cde.fi','Tablet fan', 0);

- type \d
\d blogs

- query items from blogs 
select * from blogs;

- cli.js created inside backend


