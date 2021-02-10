class Activities {
    constructor() {
        this.activities = []
        this.fetchAndLoadActivities()
        console.log(this.activities)
    }

    fetchAndLoadActivities() {
        ApiAdapter.getActivities()
        .then(activities => {
            activities.forEach(activity => {
                const newActivity = new Activity(activity)
                console.log(newActivity)
               //console.log(Trip.findById(newActivity.tripId))
                this.activities.push(newActivity)
            })
        })
        .then(() => {
            this.renderActivities()
        })
    }

    renderActivities() {
        this.activities.map(activity => {
            activity.renderActivity()
        })
        
    }
}