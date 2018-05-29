import express from 'express'
import Rover from './Rover'

const roverClass = new Rover();
const router = express.Router()

router.get("/", function (request, result) {

    result.send("Hello Rover");
});

router.post("/", function (request, result) {
    roverClass
    .deployRovers(request.body) 
    .then(response => {
        result.send(response)
    })
    .catch(error => {
        result.send(error);
    })

})

export default router