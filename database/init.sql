CREATE TABLE "employees" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (120) NOT NULL,
    "employee_number" VARCHAR (100) NOT NULL,
    "annual_salary" INTEGER NOT NULL,
    "review_rating" INTEGER
);
