exports.createTables = `
CREATE TABLE account (
    AccountID int NOT NULL PRIMARY KEY,
    Name varchar(200) NOT NULL,
    Email varchar(512) NOT NULL,
    Password char(64) NOT NULL 
);

CREATE TABLE movie_genre (
    GenreID int NOT NULL PRIMARY KEY,
    Name varchar(50) NOT NULL,
    Description varchar(1024)
);

CREATE TABLE movie_genre_favorite (
    AccountID int REFERENCES account(AccountID) ON DELETE CASCADE, 
    GenreID int REFERENCES movie_genre(GenreID) ON DELETE CASCADE,
    PRIMARY KEY (AccountID, GenreID)
);

CREATE TABLE movie (
    MovieID int NOT NULL PRIMARY KEY, 
    Name varchar(50),
    Description varchar(1024), 
    Tags varchar(256), 
    ThumbnailID varchar(256), 
    Cast varchar(256), 
    GenreID int REFERENCES movie_genre(GenreID), 
    AgeCategory varchar(20), 
    LengthSeconds int,
    ReleaseDate date, 
    Price float, 
    Quality varchar(20)
);


CREATE TABLE movie_rating (
    AccountID int REFERENCES account(AccountID) ON DELETE CASCADE, 
    MovieID int REFERENCES movie(MovieID) ON DELETE CASCADE, 
    Liked number(1), /* 1 byte, but we only need 1 bit */
    PRIMARY KEY (AccountID, MovieID)
);

CREATE TABLE payment_method (
    PaymentMethodID int NOT NULL PRIMARY KEY, 
    AccountID int REFERENCES account(AccountID) ON DELETE CASCADE, 
    BillingAddress varchar(1024)
);

CREATE TABLE paypal_payment_method (
    PaymentMethodID int REFERENCES payment_method(PaymentMethodID) ON DELETE CASCADE,  
    Email varchar(512)
);

CREATE TABLE cc_payment_method (
    PaymentMethodID int REFERENCES payment_method(PaymentMethodID) ON DELETE CASCADE, 
    CardNumber int, 
    ExpirationMonth smallint,
    ExpirationYear smallint
);

CREATE TABLE purchase (
    AccountID int NOT NULL, 
    MovieID int NOT NULL, 
    TransactionID varchar(150) NOT NULL, 
    PaymentMethodID int, 
    PurchaseTimestamp timestamp NOT NULL, 
    PurchasePrice float NOT NULL,
    PRIMARY KEY (AccountID, MovieID)
);
`;

exports.populateTables = `

INSERT INTO movie_genre VALUES (1,'Drama','Narrative fiction with a serious tone.');

INSERT INTO movie_genre VALUES (2,'Horror','Speculative fiction which is intended to frighten, scare, disgust, or startle its viewers by inducing feelings of horror and terror.');

INSERT INTO movie_genre VALUES (3,'Action','Adventure oriented film, typically including an abundance of violence and liveliness.');

INSERT INTO movie_genre VALUES (4,'Comedy','These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.');


INSERT INTO movie VALUES (1, 'Downton Abbey', 'The television series Downton Abbey followed the lives of the Crawley family and the servants who worked for them at the turn of the 20th century in an Edwardian English country house. Over its 6 seasons, the series garnered 3 Golden Globe Awards, 15 Primetime Emmy Awards, 69 Emmy nominations in total.', 'Emmy winning, London, Family', null, 'Max Brown, Hugh Bonneville, Jim Carter, Michelle Dockery, Elizabeth McGovern', 1, 'PG', 121, DATE '2019-09-20', 19.99, 'HD');

INSERT INTO movie VALUES (2, 'IT Chapter Two', 'Because every 27 years evil revisits the town of Derry, Maine, IT CHAPTER TWO brings the characters - who have long since gone their separate ways - back together as adults, nearly three decades after the events of the first film.', 'Thriller, Suspenseful', null, 'Thomas Jay Ryan, Jaeden Lieberher, Jack Dylan Grazer, Jessica Chastain, James McAvoy', 2, '14A', 169, DATE '2019-09-06', 29.99, 'HD');

INSERT INTO movie VALUES (3, 'Rambo: Last Blood', 'When the daughter of one of his friends is kidnapped, Rambo- who has been working on a ranch- crosses the U.S.-Mexico border and quickly finds himself up against the full might of one of Mexico’’s most violent cartels.', 'Adventure, Violence', null, 'Sylvester Stallone, Paz Vega, Sergio Peris-Mencheta, Adriana Barraza, Yvette Monreal', 3, '18A', 90, DATE '2019-09-20', 24.99, 'SD');

INSERT INTO movie VALUES (4, 'Avengers: Endgame', 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.', 'Fantasy, Sci-fi', null, '	Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson', 3, 'PG13', 182, DATE '2019-04-26', 24.99, 'HD');

INSERT INTO movie VALUES (5, 'The Shining: Remastered', 'Warner Brothers new 40th Anniversary remastering of Stanley Kubrick’’s iconic horror masterpiece returns to cinemas on September 29, featuring a sneak peek at the upcoming sequel DOCTOR SLEEP. THE SHINING tells the story of a family that heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.', 'Creepy, Thriller', null, '	Jack Nicholson, Joe Turkel, Philip Stone, Barry Nelson, Scatman Crothers', 2, 'R', 153, DATE '2019-09-29', 29.99, 'HD');

INSERT INTO movie VALUES (6, 'Judy', 'Winter 1968: Showbiz legend Judy Garland (Renée Zellweger) arrives in Swinging London to perform in a sell-out run at The Talk of the Town. It is 30 years since she shot to global stardom in THE WIZARD OF OZ, but if her voice has weakened, its dramatic intensity has only grown. As she prepares for the show, battles with management, charms musicians, and reminisces with friends and adoring fans, her wit and warmth shine through. Even her dreams of romance seem undimmed as she embarks on a courtship with Mickey Deans (Finn Wittrock), her soon-to-be fifth husband.', 'Musical, Biography', null, 'Renée Zellweger, Finn Wittrock, Jessie Buckley, Michael Gambon, Rufus Sewell', 1, 'PG', 118, DATE '2019-09-27', 19.99, 'SD');

INSERT INTO movie VALUES (7, 'Good Boys', 'Just how bad can one day get? The creative minds behind Superbad, Pineapple Express and Sausage Party take on sixth grade hard in the outrageous comedy, GOOD BOYS. After being invited to his first kissing party, 12-year-old Max (Rooms Jacob Tremblay) is panicking because he doesnt know how to kiss. Eager for some pointers, Max and his best friends Thor (Brady Noon, HBOs Boardwalk Empire) and Lucas (Keith L. Williams, Foxs The Last Man On Earth) decide to use Maxs dads drone -- which Max is forbidden to touch -- to spy (they think) on a teenage couple making out next door. But when things go ridiculously wrong, the drone is destroyed.', 'Alternative Comedy', null, 'LilRel Howery, Jacob Tremblay, Keith L. Williams, Brady Noon, Molly Gordon', 4, '14A', 90, DATE '2019-08-16', 14.99, 'HD');


INSERT INTO account VALUES (1, 'John Smith', 'jsmith@gmail.com', 'c8eb6be7da27a445473bc50d1bbf60d91e06b1332156ffdd252d87270bf351bf');
INSERT INTO payment_method VALUES (1, 1, '_123 Sesame st.');
INSERT INTO paypal_payment_method VALUES (1, 'account@paypal.com');
INSERT INTO movie_genre_favorite VALUES (1, 1);
INSERT INTO movie_genre_favorite VALUES (1, 3);
INSERT INTO movie_rating VALUES (1, 3, 1);
INSERT INTO movie_rating VALUES (1, 4, 1);
INSERT INTO movie_rating VALUES (1, 5, 1);
INSERT INTO movie_rating VALUES (1, 7, 1);



INSERT INTO account VALUES (2, 'Donald Trump', 'OrangeMan1337@hotmail.ca', 'b23a27949d63ec1acc7f39912237881cf86b8f3f59d1269b2cdb6dfcf879d6bb');
INSERT INTO payment_method VALUES (2, 2, '_50 Main st.');
INSERT INTO cc_payment_method VALUES (2, 1234123412341234, 5, 2021);
INSERT INTO movie_genre_favorite VALUES (2, 1);
INSERT INTO movie_rating VALUES (2, 1, 1);
INSERT INTO movie_rating VALUES (2, 2, 0);
INSERT INTO movie_rating VALUES (2, 6, 1);
INSERT INTO movie_rating VALUES (2, 7, 1);


INSERT INTO account VALUES (3, 'Karen McDonald', 'KMcDonald@gmail.com', '2697dafecf24c71a0e570b3969a033f059debaeb20eaf0beeb829ae0b44e3c51');
INSERT INTO payment_method VALUES (3, 3, '_310 Broadway st.');
INSERT INTO cc_payment_method VALUES (3, 4324432443244324, 8, 2022);
INSERT INTO payment_method VALUES (4, 3, '_310 Broadway st.');
INSERT INTO paypal_payment_method VALUES (4, 'KarenMcdonald@paypal.com');
INSERT INTO movie_genre_favorite VALUES (3, 1);
INSERT INTO movie_genre_favorite VALUES (3, 3);
INSERT INTO movie_rating VALUES (3, 2, 1);
INSERT INTO movie_rating VALUES (3, 4, 1);
INSERT INTO movie_rating VALUES (3, 1, 0);
INSERT INTO movie_rating VALUES (3, 3, 0);


INSERT INTO account VALUES (4, 'Sam Terry', 'STerry24@yahoo.ca', '3c8b89438d222ebe6a044c59929fb2d96b64fc41b41052c36528ae88cd83dc62');
INSERT INTO payment_method VALUES (5, 4, '_10 Front st.');
INSERT INTO cc_payment_method VALUES (5,1527152715271527,7, 2020);
INSERT INTO movie_genre_favorite VALUES (4, 2);
INSERT INTO movie_genre_favorite VALUES (4, 3);
INSERT INTO movie_rating VALUES (4, 5, 1);
INSERT INTO movie_rating VALUES (4, 3, 1);
INSERT INTO movie_rating VALUES (4, 1, 0);



INSERT INTO purchase VALUES (1, 3, 'g4ci33fuip', 1, TIMESTAMP '2019-09-28 03:14:07', 24.99);

INSERT INTO purchase VALUES (3, 4, '1dkmd81zz3', 3, TIMESTAMP '2019-10-01 15:27:37', 39.99);

INSERT INTO purchase VALUES (4, 3, '51ykxvscve', 5, TIMESTAMP '2019-09-26 19:17:23', 24.99);

INSERT INTO purchase VALUES (4, 5, 'f90wkoktkn', 5, TIMESTAMP '2019-09-27 22:03:38', 29.99);
`;

exports.sampleQueries = `
-- get movies of genre Horror;
SELECT * FROM movie WHERE movie.GenreID = (SELECT GenreID FROM movie_genre WHERE Name = 'Horror');

-- get all ratings for a movie;
SELECT AccountID, Liked FROM movie_rating WHERE MovieID = 1;

-- get accounts that have purchased movies;
SELECT * FROM account WHERE AccountID IN (SELECT DISTINCT AccountID FROM purchase);

-- get all movies which genres have been favorited by an account;
SELECT * FROM movie WHERE GenreID IN (SELECT GenreID FROM movie_genre_favorite WHERE AccountID = 1);

-- get all credit card payment methods for an account;
SELECT * FROM payment_method, cc_payment_method WHERE AccountID = 2 AND payment_method.PaymentMethodID = cc_payment_method.PaymentMethodID;

-- get average rating for particular movie;
SELECT AVG(Liked) AS AverageRating FROM movie_rating WHERE MovieID = 1;

-- get average ratings for all rated movies;
SELECT MovieID, AVG(Liked) AS AverageRating FROM movie_rating GROUP BY MovieID HAVING COUNT(Liked) > 0;

-- get total number of favorites per movie genre;
SELECT movie_genre.GenreID, Name, Count(*) AS Favorites FROM movie_genre, movie_genre_favorite WHERE movie_genre.GenreID = movie_genre_favorite.GenreID GROUP BY movie_genre.GenreID, Name;

-- get the payment method of the purchase
SELECT p.PaymentMethodID, a.name, e.* FROM payment_method p, purchase e, account a WHERE p.AccountID = 3 AND p.accountid = e.accountid AND p.accountid = a.accountid AND e.paymentmethodid = p.paymentmethodid ORDER BY a.name, p.paymentmethodid;

-- get persons all payment methods 
SELECT PaymentMethodID, account.Name FROM payment_method, account WHERE account.accountid = 3 AND account.accountID = payment_method.accountid;

-- get count of payment methods for person 
SELECT account.Name, Count(*) AS Count FROM payment_method, account WHERE account.accountid = 3 AND account.accountID = payment_method.accountid GROUP BY account.name;

`;

exports.dropTables = `
DROP TABLE purchase; 
DROP TABLE cc_payment_method;
DROP TABLE paypal_payment_method;
DROP TABLE payment_method;
DROP TABLE movie_rating;
DROP TABLE movie;
DROP TABLE movie_genre_favorite;
DROP TABLE movie_genre;
DROP TABLE account;
`;