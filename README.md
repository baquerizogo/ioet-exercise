## Exercise
The company ACME offers their employees the flexibility to work the hours they want. But due to some external circumstances they need to know what employees have been at the office within the same time frame.

The goal of this exercise is to output a table containing pairs of employees and how often they have coincided in the office.

### Input
The name of an employee and the schedule they worked, indicating the time and hours. This should be a .txt file with at least five sets of data. You can include the data from our examples below:

Example 1:
_INPUT_
RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00 ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

_OUTPUT_
ASTRID-RENE: 2 
ASTRID-ANDRES: 3 
RENE-ANDRES: 2

Example 2:
_INPUT_
RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00 
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

_OUTPUT_
RENE-ASTRID: 3

## Overview
This exercise was solved as part of the Junior Software developer screening at Ioet. I used TypeScript for solving this challenge using a modular pattern and focused on TDD using Jest.

There are three modules in this app: Employees, Workdays and utilities. Every module has its own functions, data models and tests since it's a clear way to structure the programming logic in Node projects and find the corresponding tests.

The code also follows SOLID principles applied to Functional Programming like Single-Responsibility and interface segregation principles.

## Project Structure
```markdown
.
├── coverage                          // Coverage report generated by Jest                    
├── dist                              // Compiled JS files
├── public           
│   └── assets
│       ├── data_empty.txt
|       ├── data.txt
│       └── data_wrong_format.txt
├── src
│   ├── __test__
│   │   └── global.test.ts
│   ├── utils
│   │   ├── prompt.test.ts
│   │   └── prompt.ts
│   └── workdays
│   │   ├── workday.model.ts
│   │   ├── workday.service.ts
│   │   └── workday.test.ts
│   ├── employees
│   │   ├── employees.model.ts
│   │   ├── employees.service.ts
│   │   └── employees.test.ts
│   ├── index.service.ts
│   └── index.ts
├── tsconfig.json
├── jest.config.js
├── package.json
└── package-lock.json
```
## Solution
For solving this challenge I followed the next steps:

 1. Read the user file.
 2. Parse the employees data into the right format.
 3. If the data is invalid then throw errors and finish the app.
 4. Parse the work days of each employee into the right format.
 5. Check if every work day has valid day, entry hour and departure hour else throw error and finish the app.
 6. Calculate pairs of employees checking if they match the day and the worked hours.
 7. Output the table in console in the required format. 


## Requirements
 - Node v14.18.0 or later

## How to run the project
 - Clone this repository. 
 `git clone https://github.com/baquerizogo/ioet-exercise.git`
 
 - Move to the project's folder. 
 `cd ioet-exercise/`

 - Install the dependencies.
 `npm install`
 
 - Build the app. This will run the TypeScript compiler and generate the dist folder.
`npm run build`

 - Run the built app using node.
 `node dist`

Once it starts running, you can pass the name of the .txt file in the prompt. These files should be located in public/assets/ 
## How to run the project in development mode
- Run nodemon with the following command:
`npm run dev`

This will run nodemon and it will watch any change you made in src

## How to test the app.
This project uses Jest for Unit testing purposes. You can check each test in the corresponding .test.ts files.
- Run jest
`npm run test`
or
`npm run test:watch`

- Run Jest Coverage. This will generate the coverage folder containing the report in HTML.
`npm run test:coverage`
