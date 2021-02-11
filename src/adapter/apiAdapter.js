class ApiAdapter {
    static getTrip(id) {
        return fetch("http://localhost:3000/trips" + id).then(res => res.json())
    }
   
    static getTrips() {
        return fetch("http://localhost:3000/trips").then(res => res.json())
    }

    static createTrip(attributes) {

        const trip = {
            location: attributes[0],
            date: attributes[1]
        }

        return fetch("http://localhost:3000/trips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(trip)
        })
        .then(res => (res.json()))
        .catch(error => console.log("Error: " + error))
    }

    static deleteTrip(id) {
        console.log(id)
        return fetch(`http://localhost:3000/trips/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }

    static getActivities() {
        return fetch("http://localhost:3000/activities").then(res => res.json())
    }

    static createActivity(attributes) {
        const activity = {
            trip_id: attributes[0],
            name: attributes[1]
        }
        return fetch("http://localhost:3000/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(activity)
        })
        .then(res => (res.json()))
        .catch(error => console.log("Error: " + error))
    }
}