# Restaurant Tip Calculator
#### (React)

A simple React application for calculating the total restaurant tip and how much each guest needs to pay based on the number of people and how much each person enjoyed the meal.

## How it works

Once the user and input the price of the meal and the number of guests, each guest can select how much they wish to tip from a choice of 0%, 5%, 10% and 20% based on their level of satisfaction. Once the number of guests has been input this will iterate over an array element for each guest and display a satisfaction option component for each person. The user can then select their satisfaction level and amend it if they wish. This will update the tips array and apply a percentage to the cost of the meal as a tip. Finally the app will add up the total percentage of tips from each guest and divide by the total number of people, so each person will pay their equal share of the total tip. The final output is the total price of the meal and the total tip and how much each person has to pay.

## Installation

To install the tip calculator run the following code in the terminal:
```bash
$ git clone https://github.com/rachelrodko/restaurant-tip-calculator-react.git tip_calculator
$ npm install
$ npm start
```

## Amendments for the future

I need to migrate this application to Vite as many dependencies are flagged during the installation. I also need to amend the design to make it more attractive and user-friendly. As the purpose of this project was first and foremost an exercise in React, the functionality was prioritised over the styling. This will be updated in due course.

````
