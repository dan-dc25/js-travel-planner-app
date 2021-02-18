class Trip {
    constructor(trip) {
        this.id = trip.id
        this.location = trip.location
        this.date = trip.date
        this.activities = []
    }

    static findById(id) {
        console.log(Trips.tripsInstance.trips.find(trip => trip.id === id))
    }

    renderTrip() {
        const tripsContainer = document.getElementById("trip-list")

        // Build Entry Div
        const tripDiv = document.createElement('div');
        tripDiv.className = "trips-container"
        tripDiv.id = `trip-${this.id}-container`
        tripsContainer.appendChild(tripDiv)

        //ul list
        const newTripUl = document.createElement("ul");
        newTripUl.className = "trip-list block-list is-small is-outlined is-success is-centered"
        newTripUl.id = `trip-${this.id}`

        //Li element
        const listItems = document.createElement('li');
        listItems.className = "trip-list-item"
        listItems.id = `trip-list-item-${this.id}`
        listItems.innerHTML = `
                               <strong>Location:</strong> ${this.location}</br>
                               <strong>Date:</strong> ${this.date}</br>`

        tripDiv.append(newTripUl, listItems)


        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.className = "delete-button button is-danger is-rounded"
        deleteButton.id = `delete-button-${this.id}`
        deleteButton.innerText = "Delete";      
        deleteButton.dataset.tripId = `${this.id}`
    
        tripDiv.append(deleteButton)
    
        deleteButton.addEventListener("click",(event) => {
            event.preventDefault()
            tripDiv.remove()
            ApiAdapter.deleteTrip(`${this.id}`)
        })
  
        //new activities container
        const activityDiv = document.createElement('div');
        activityDiv.className = 'acitivity-container'
        activityDiv.id = `${this.id}-activities-container`
        activityDiv.style.display = 'none'
        activityDiv.dataset.tripId = `${this.id}`
        tripDiv.append(activityDiv)

        //activity ul
        const activityUl = document.createElement('ul');
        activityUl.className = "new-activity-container"
        activityUl.id = `new-activity-ul-${this.id}`

        //new activity li
        const activityLi = document.createElement('li');
        activityLi.className = "new-activity-li"
        activityLi.id = `activity-li-${this.id}`
        activityLi.innerHTML = "<strong>All Activities</strong>"
        activityUl.append(activityLi)
        activityDiv.append(activityUl)
        tripDiv.append(activityDiv)

        //new activity form
        const newActivityForm = document.createElement("form");
        newActivityForm.class = "new-activity-form"
        newActivityForm.id = `activity-form-${this.id}`
        newActivityForm.style.display = "block"
        activityDiv.append(newActivityForm)

        const newActivityHeader = document.createElement('h4');
        newActivityHeader.id = `new-activity-header-${this.id}` 
        newActivityHeader.innerHTML = "<strong>Add Activity<strong>"
        newActivityForm.appendChild(newActivityHeader)

        const activitySubtitle = document.createElement('h5');
        activitySubtitle.class = `new-activity-subtitle-${this.id}`
        activitySubtitle.innerText = "All fields are required"
        newActivityForm.appendChild(activitySubtitle)

        const newActivityEntry = document.createElement("input");
        newActivityEntry.id = `new-trip-entry-${this.id}`
        newActivityEntry.type = "hidden"
        newActivityEntry.value = `${this.id}`

        const newActivityText = document.createElement("input");
        newActivityText.class = "form-control"
        newActivityText.id = `new-activity-text-${this.id}`
        newActivityText.type = "text"
        newActivityForm.appendChild(newActivityText)

        const newActivityBtn = document.createElement("button");
        newActivityBtn.id = `new-activity-button-${this.id}`
        newActivityBtn.className = "button is-primary is-light"
        newActivityBtn.innerHTML = "Submit"
        newActivityForm.appendChild(newActivityBtn)

        newActivityBtn.addEventListener('click',(event) => {
            event.preventDefault();
            let activityText = document.getElementById(`new-activity-text-${this.id}`);
            let activityAttr = []
            activityAttr.push(this.id)
            activityAttr.push(activityText.value)
            ApiAdapter.createActivity(activityAttr)
            .then(activity => {
                console.log(activity)
                const newActivity = new Activity(activity)
                activityText.value = " "
                this.activities.push(newActivity)
                newActivity.renderActivity()
            })
        })

        function displayHideActivities() {
            const activityDiv = document.getElementById(`${this.id}-activities-container`)
            const activityBtn = document.getElementById(`show-activities-${this.id}`)
            if (activityDiv.style.display === "none") {
                activityDiv.style.display = "block"
            }else {
                activityDiv.style.display = "none"
            }
        }
 

        //display and hide activities
        const showActivitiesBtn = document.createElement("button");
        showActivitiesBtn.id = `show-activities-${this.id}`
        showActivitiesBtn.className = 'show-button button is-primary is-rounded'
        showActivitiesBtn.innerText = 'Show Activities'
        showActivitiesBtn.addEventListener('click', displayHideActivities.bind(this))
        tripDiv.append(showActivitiesBtn);

    }


}