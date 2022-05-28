const input1 = {
    "LAX": ["SFO", "HNL"],
    "SFO": ["LAX"],
    "HNL": ["NRT", "LAX"],
    "NRT": ["HNL"]
};

const input2 = {};

const input3 = {
    "LAX": ["SFO"],
    "SFO": ["LAX"]
};

const input4 = {
    "NRT": ["HNL"]
};

function buildItineraryFromTickets(tickets) {
    if (Object.keys(tickets).length <= 1) {
        return [];
        //This could also be an error depending on how you want to use the function.
    };

    if (Object.keys(tickets).length === 1) {
        return [Object.keys(tickets)[0], Object.keys(tickets)[1]];
    };

    const airportsWeHaveSeen = {};
    
    //increment airportsWeHaveSeen for each airport

    Object.keys(tickets).forEach(key => {
        //increment for each key
        // if (airportsWeHaveSeen[key]) {
        //     airportsWeHaveSeen[key]++;
        // } else {
        //     airportsWeHaveSeen[key] = 1;
        // }

        //increment for each value
        tickets[key].forEach(airport => {
            if (airportsWeHaveSeen[airport]) {
                airportsWeHaveSeen[airport]++;
            } else {
                airportsWeHaveSeen[airport] = 1;
            }
        })        
    });

    console.log(airportsWeHaveSeen);

    //Choose first airport that only appears once
    const startingPoint = Object.keys(airportsWeHaveSeen).find(key => {
        if (airportsWeHaveSeen[key] === 1) {
            return key;
        }
    });

    const itinerary = [startingPoint];
    let currentStartingPoint = startingPoint;
    let prev;

    for (let i = 1; i < Object.keys(tickets).length; i++) {
        const possibleDestinations = tickets[currentStartingPoint];
        let currentDestination;
        //push destination
        if (possibleDestinations.length === 0) {
            currentDestination = possibleDestinations[0];
        } else {
            currentDestination = possibleDestinations.find(airport => airport !== prev);
        }
        itinerary.push(currentDestination);
        prev = currentStartingPoint;
        currentStartingPoint = currentDestination;
    }
    
    return itinerary;
}

console.log("With input1", buildItineraryFromTickets(input1));
console.log("With input2, no flights", buildItineraryFromTickets(input2));
console.log("Witth input3, one flight", buildItineraryFromTickets(input3));
console.log("Witth input3, with incorrect single direction flight", buildItineraryFromTickets(input4));