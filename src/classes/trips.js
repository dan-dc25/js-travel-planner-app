class Trips {
    constructor() {
        this.all = []
        this.constructor.tripsInstance = this
        this.newTripBindings()
    }


    newTripBindings() {
        this.addTrip = false;
        this.tripFormContainer = document.getElementById("form-container");
        this.createTripButton = document.getElementById("new-trip-button");
        this.newTripForm = document.getElementById("add-trip-form")
        this.newTripLocation = document.getElementById("new-trip-location")
        this.newTripDate = document.getElementById("new-trip-date")
        this.addTrip = !this.addTrip;
      
          if(this.addTrip) {
            this.tripFormContainer.style.display = "block";
            this.newTripForm.addEventListener('submit', this.createNewTrip.bind(this));
          }
    }

    createNewTrip(event) {
        event.preventDefault()
        const tripAttr = []
        const tripLocation = this.newTripLocation.value
        const tripDate = this.newTripDate.value 
        const tripsContainer = document.getElementById("trip-list")

        tripAttr.push(tripLocation)
        tripAttr.push(tripDate)

        ApiAdapter.createTrip(tripAttr)
        .then(trip => {
            console.log(trip)
            const newTrip = new Trip(trip)
            this.all.push(newTrip)
            tripsContainer.append(newTrip.renderTrip())
            return newTrip
        })
    }

    fetchAndLoadTrips() {
        return ApiAdapter.getTrips()
        .then(trips => {
            console.log(trips)
            trips.forEach(trip => this.all.push(new Trip(trip)))
        })
        .then(() => {
            this.renderTrips()
        })
    }

    renderTrips() {
        this.all.map(trip => trip.renderTrip())
    }

  
}