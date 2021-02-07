class Trip {
    constructor(attributes) {
       let whitelist = ["id", "location", "date", ]
       whitelist.forEach(attr => this[attr] = attributes[attr])
       this.activities = []
    }

    static all = [] 

    static container() {
        return this.c ||= document.querySelector('#main')
    }

    static getTrips() {
        this.all = []
        return fetch("http://localhost:3000/trips")
        .then(res => res.json())
        .then(obj => {
            let renderedItems= obj.map(attr => new Trip(attr))
            let trip = renderedItems.map(item => item.renderTrips())
            this.container().append(...trip)
           return trip
        })
        .catch(err => alert(err))
    }

    static findById(id) {
        console.log(id)
        return this.all.find(tripList => tripList.id == id)

    }
   
    renderTrips() {
        //main div that is going to hold all newly created trips
        this.mainDiv ||= document.createElement('div');
        this.mainDiv.className = "columns"
 
        this.secondDiv ||= document.createElement('div');
        this.secondDiv.className = "column is-one-quarter"

        //Ul element
        this.content ||= document.createElement('ul');
        this.content.className = 'trip-list'
        this.content.id = `trip-${this.id}`

        //Li element
        this.listItems ||= document.createElement('li');
        this.listItems.className = "trip-list-item"
        this.listItems.innerHTML = `
                             <strong>Location:</strong> ${this.location}</br>
                             <strong>Date:</strong> ${this.date}</br>`
         
        this.content.append(this.listItems);

        // Delete Button
        this.deleteButton = document.createElement('button');
        this.deleteButton.className = "delete-button button is-danger is-rounded"
        this.deleteButton.id = `delete-button-${this.id}`
        this.deleteButton.innerText = "Delete";
        this.deleteButton.dataset.tripId = `${this.id}`

        this.content.append(this.deleteButton)

        this.deleteButton.addEventListener("click", () => {
            this.mainDiv.remove()
            this.deleteTrip(`${this.id}`)
        })

        //Edit Button
        this.editButton = document.createElement('button');
        this.editButton.className = "edit-button button is-primary is-rounded";
        this.editButton.id = `edit-button-${this.id}`
        this.editButton.innerText = "Edit";
        this.editButton.dataset.tripId = `${this.id}`
        this.content.append(this.editButton)

        //new activities container
        this.activityDiv ||= document.createElement('div');
        this.activityDiv.className = 'acitivity-list'
        this.activityDiv.id = `${this.id}-activity-container`
        this.activityDiv.style.display = 'none'
        this.activityDiv.dataset.tripId = `${this.id}`
        this.content.append(this.activityDiv)
        
        //new activity list
        this.activityUl = document.createElement('ul')
        this.activityUl.className = "activity-list"
        this.activityUl.id = `new-activity-${this.id}`
        this.activityUl.style = "list-style-type: circle;"
        this.activityDiv.append(this.activityUl)

        //create activity form
        this.newActivityForm = document.createElement("form");
        this.newActivityForm.class = "new-activity-form"
        this.newActivityForm.id = `activity-form-${this.id}`
        this.activityDiv.append(this.newActivityForm)

        this.newActivityHeader = document.createElement('h4');
        this.newActivityHeader.id = `new-activity-header-${this.id}` 
        this.newActivityHeader.innerText = "Add Activity"
        this.newActivityForm.appendChild(this.newActivityHeader)

        this.newActivityEntry = document.createElement("input");
        this.newActivityEntry.id = `new-trip-entry-${this.id}`
        this.newActivityEntry.type = "hidden"
        this.newActivityEntry.value = `${this.id}`

        this.newActivityText = document.createElement("input");
        this.newActivityText.class = "form-control"
        this.newActivityText.id = `new-activity-text-${this.id}`
        this.newActivityText.type = "text"
        this.newActivityForm.appendChild(this.newActivityText)

        this.newActivityBtn = document.createElement("button");
        this.newActivityBtn.id = `new-activity-button-${this.id}`
        this.newActivityBtn.className = "button is-primary is-light"
        this.newActivityBtn.innerHTML = "Submit"
        this.newActivityForm.appendChild(this.newActivityBtn)

        this.newActivityBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let activityText = document.getElementById(`new-activity-text-${this.id}`);
            let activityAttr = []
            activityAttr.push(this.id)
            activityAttr.push(activityText.value)
            Activity.createActivity(activityAttr)
            .then(activity => {
                console.log(activity)
                const newActivity = new Activity(activity)
                activityText.value = " " //will cause problems most likely
                this.activities.push(newActivity)
                newActivity.renderActivity()
            })
        })
     
        function displayHideActivities() {
            this.activity = document.getElementById(`${this.id}-activity-container`)
            if (this.activityDiv.style.display === "none") {
                this.activityDiv.style.display = "block"
            } else {
                this.activityDiv.style.display = "none"
            }
        }
 

         //display and hide activities
         this.showActivitiesBtn ||= document.createElement('button');
         this.showActivitiesBtn.id = `show-activities-${this.id}`
         this.showActivitiesBtn.className = 'show-button button is-primary is-rounded'
         this.showActivitiesBtn.innerText = 'Activities'
         this.showActivitiesBtn.addEventListener('click', displayHideActivities.bind(this))
         this.mainDiv.append(this.showActivitiesBtn);

         if(!this.createActivityBtn) {
             this.createActivityDiv = document.createElement('div');
             this.createActivityDiv.className = "buttons are-small";
             this.createActivityBtn = document.createElement('button');
             this.createActivityBtn.className = "button is-primary is-medium is-light is-rounded"
             this.createActivityBtn.id = "create-activity";
             this.createActivityBtn.innerText = "Add an Activity";
             this.createActivityBtn.dataset.tripId = this.id;
 
             this.createActivityDiv.append(this.createActivityBtn)
             this.content.append(this.createActivityDiv)
         }
         this.secondDiv.append(this.content);
         this.mainDiv.append(this.secondDiv)
        
         return this.mainDiv;
    }

  
    static postTrips(formData) {
        let location = formData[0];
        let date = formData[1];
        return fetch("http://localhost:3000/trips", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
             body: JSON.stringify({
                location: location,
                date: date
             })
        })
        .then(resp => {
            if(resp.ok) {
              return resp.json()
            } else {
              return resp.text().then(errors => Promise.reject(errors))
            }
        })
        .then(json => {
            let tripList = new Trip(json);
            //console.log(json)
            console.log(tripList)
            this.all.push(tripList)
            this.container().append(tripList.renderTrips())
            return tripList
        }) 
    }

    deleteTrip(id) {
        console.log(id)
        let proceed = confirm("Are you sure you want to delete this trip?");
        if(proceed) {
            return fetch("http://localhost:3000/trips/" + `${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
        }
    }
}
