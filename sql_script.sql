
CREATE DATABASE MCBI;
GO


USE MCBI;
GO

CREATE TABLE users (
    userId int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    userName nvarchar(255) NOT NULL,
    emailAddress nvarchar(255) NOT NULL,
    userPass nvarchar(255) NOT NULL,
    CONSTRAINT users_con UNIQUE (userName,emailAddress)
);



GO

ALTER TABLE users ALTER COLUMN userName NVARCHAR(255)  NOT NULL ;
ALTER TABLE users ALTER COLUMN emailAddress NVARCHAR(255)  NOT NULL;
ALTER TABLE users ALTER COLUMN userPass NVARCHAR(255)  NOT NULL;
 

