# marsRover
Mars Rover Tech Challenge

Requirements can be found here, just to get a bit of context: 
https://code.google.com/archive/p/marsrovertechchallenge/

How to run the code.

1. Clone a local version.
2. Ensure you have NodeJs 
3. Navigate to the marsRover repository on your terminal
4. Install packages by typing 'npm install'
5. I've added a script for you to run, simply type 'npm start'
6. This should get the API running. You can edit the API as it's running, and it'll automatically pick up your changes as soon as you save
7. http://localhost:3000/v1

# Endpoints and what objects to pass
So far I've only built two endpoints, one GET and one POST

GET
http://localhost:3000/v1/rover/

POST
http://localhost:3000/v1/rover/

body = {
	"grid": "5 5",
	"rovers": [
		{
			"position": "1 2 N",
			"instructions": "LMLMLMLMM"
		},
		{
		    "position": "3 3 E",
			"instructions": "MMRMMRMRRM"
		}
		]
}

# Assumptions
At the moment, I've assumed that all instructions given to the input for each rover is correct.

I've also assumed that rovers can not be given a starting point which is greater than the grid, and also that they cannot drive out of the boundaries of the grid

# What the user can expect
All if not most edge cases have been validated upon input. The user can expect quite a decsriptive error message stating what which input is incorrect, including the position of the rover who's input is incorrect.

# Ideally
I would have loved to have built a React Native frontend for this API. If time allows, I'll include it too... <link pending>
