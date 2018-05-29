import request from 'request-promise';
import fs from 'fs';

import Responses from '../../config/responses'
import errorMessages from '../../config/errorMessages'

export default class Rover {
    constructor() {
        this.response = new Responses();
        this.grid = [100, 100],
            this.surroundingRovers = [],
            this.rover = {
                location: {
                    x: 0,
                    y: 0
                },
                direction: 'N'
            }
    }


    deployRovers = async body => {

        /**
         * INPUT OBJECT
          {
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
         */
        try {

            //Verify grid value provided
            const gridResponse = this.validateGrid(body.grid)

            if (gridResponse !== "") {
                return this.response.error(
                    400,
                    "Grid error",
                    gridResponse
                )
            }

            //Set grid size 
            let gridInput = body.grid.split(" ")
            this.grid[0] = gridInput[0]
            this.grid[1] = gridInput[1]

            //Verify rover(s) provided
            const roverResponse = this.validateRovers(body.rovers)
            if (roverResponse !== "") {
                return this.response.error(
                    400,
                    "Rover error",
                    roverResponse
                )
            }

            let output = []
            body.rovers.forEach((rover, index) => {
                this.moveRover(rover, index)
                output.push(this.formatOutput(this.rover))

            })

            return this.response.success(200, 'Rover(s) deployed successfully. Expected output: ', output)

        } catch (error) {
            console.log('deployRovers: method error', error)
            return this.response.error(
                400,
                "Could not deploy rovers",
                error
            )
        }

    }

    validateGrid = grid => {

        let result = ''
        if (typeof grid !== "undefined" && grid !== "") {
            let values = grid.split(" ")
            if (typeof values !== "undefined" && values.length !== 2) {
                result = 'Please provide 2 grid values, separated by a space character'
            }
            values.forEach(val => {
                if (!/^\d+$/.test(val)) {
                    result = 'One of the grid values entered is not a number'

                } else {

                    if (val <= 0) {
                        result = 'One of the values entered is less than or equal to zero'

                    }
                }

            });

            return result
        }
        result = errorMessages.values.mandatoryFieldPrefix + 'grid size'
        return result
    }

    validateRovers = rovers => {
        let result = '';
        if (typeof rovers === "undefined" && rovers.length === 0) {
            return result = errorMessages.values.mandatoryFieldPrefix + " one or more rovers"
        } else {
            rovers.forEach((rover, i) => {

                //Validate rover position: co-ordinates
                let values = rover.position.split(" ")
                if (typeof values !== "undefined" && values.length !== 3) {
                    result = 'Rover at position ' + i++ + ' is incorrect. Please provide position in this format: 1 2 N '
                    return result
                }

                if (!/^\d+$/.test(values[0])) {
                    result = 'The x co-ordinate value entered is not a number for the Rover at position ' + i++
                }

                if (!/^\d+$/.test(values[1])) {
                    result = 'The y co-ordinate value entered is not a number for the Rover at position ' + i++

                }

                if (values[0] > this.grid[0]) {
                    result = 'Rover at position ' + i++ + ' has a x co-ordinate value which is greater than the grid size provided'
                    return result
                }

                if (values[1] > this.grid[1]) {
                    result = 'Rover at position ' + i++ + ' has a y co-ordinate value which is greater than the grid size provided'
                    return result
                }

                //Validate rover position: cardinal point
                if (!/^[a-zA-Z]/i.test(values[2])) {
                    result = 'Cardinal compass point entered is not a letter for the Rover positioned at ' + i++
                } else {
                    //Check whether it's correct cardinal points
                    if (values[2].toLowerCase() === 'n') {

                    } else if (values[2].toLowerCase() === 'e') {

                    } else if (values[2].toLowerCase() === 's') {

                    } else if (values[2].toLowerCase() === 'w') {

                    } else {
                        result = 'Cardinal compass point entered is incorrect, please enter either N, E, S, W for the Rover positioned at ' + i++
                    }
                }

                //Validate rover instruction commands

                if (!/^[a-zA-Z]/i.test(rover.instructions)) {
                    result = 'Instruction command entered is not a letter for the Rover positioned at ' + i++
                } else {
                    if (rover.instructions.toLowerCase().includes('m')) {

                    } else if (rover.instructions.toLowerCase().includes('l')) {

                    } else if (rover.instructions.toLowerCase().includes('r')) {

                    } else {
                        //Still needs better validation
                        result = 'Instruction command entered entered is incorrect, please enter either M, L, R for the Rover positioned at ' + i++
                    }
                }

            })
        }
        return result
    }

    moveRover = (rover, index) => {
        let positionValues = rover.position.split(" ");

        this.rover.location.x = positionValues[0]
        this.rover.location.y = positionValues[1]
        this.rover.direction = positionValues[2]

        //Commands
        this.rover.commands = rover.instructions

        for (let index = 0; index < this.rover.commands.length; index++) {
            const command = this.rover.commands[index];

            this.takeCommand(command)
        }

    }

    takeCommand = (command) => {
        command = command.toLowerCase()
        switch (command) {
            case 'm':
                this.moveForward()
                break;
            case 'l':
                this.turnLeft()
                break;
            case 'r':
                this.turnRight()
                break;
            default:
                break;
        }
    }

    moveForward = () => {
        let direction = this.rover.direction.toLowerCase()
        switch (direction) {
            case 'n':
                if (this.grid[1] > this.rover.location.y) {
                    this.rover.location.y++
                }
                break;
            case 's':
                if (this.rover.location.y - 1 >= 0) {
                    this.rover.location.y--
                }
                break;
            case 'e':
                if (this.grid[0] > this.rover.location.x) {
                    this.rover.location.x++
                }
                break;
            case 'w':
                if (this.rover.location.x - 1 >= 0) {
                    this.rover.location.x--
                }
                break;
            default:
                break;
        }
    }
    turnLeft = () => {
        let direction = this.rover.direction.toLowerCase()
        switch (direction) {
            case 'n':
                this.rover.direction = 'W'
                break;
            case 's':
                this.rover.direction = 'E'
                break;
            case 'e':
                this.rover.direction = 'N'
                break;
            case 'w':
                this.rover.direction = 'S'
                break;

            default:
                break;
        }
    }
    turnRight = () => {
        let direction = this.rover.direction.toLowerCase()
        switch (direction) {
            case 'n':
                this.rover.direction = 'E'
                break;
            case 's':
                this.rover.direction = 'W'
                break;
            case 'e':
                this.rover.direction = 'S'
                break;
            case 'w':
                this.rover.direction = 'N'
                break;

            default:
                break;
        }
    }

    formatOutput = (rover) => {

        let x = ''
        let y = ''
        let direction = ''

        x = rover.location.x.toString()
        y = rover.location.y.toString()
        direction = rover.direction
        let output = x + " " + y + " " + direction


        return output;
    }

}