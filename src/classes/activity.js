class Activity {
    constructor(activity) {
        this.id = activity.id 
        this.name = activity.name
        this.tripId = activity.trip_id
    }

    findEntryById() {
        return Trip.findById(this.tripId)
    }

    renderActivity() {
        const tripActivitiesUl = document.getElementById(`new-activity-ul-${this.tripId}`)
        
        //new activity li
        const activityLi = document.createElement('li');
        activityLi.className = "new-activity-li"
        activityLi.id = `activity-li-${this.id}`
        activityLi.style = "list-style-type: circle;"
        activityLi.innerText = `${this.name}`
        tripActivitiesUl.append(activityLi)
    }
}