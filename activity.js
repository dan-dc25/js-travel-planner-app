class Activity {
    constructor(attributes) { 
        let whitelist = ["id", "name", "trip_id"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
        this.activities = []
        this.fetchAndLoadActivities()
    }

    fetchAndLoadActivities() {
        return fetch("http://localhost:3000/activities")
        .then(res => res.json())
        .then(activities => {
            activities.forEach(activity => {
                const newActivity = new Activity(activity)
                Trip.findById(newActivity.tripId).activities.push(newActivity)
                this.activities.push(newActivity)
            })
        })
        .then(() => {
            this.renderAll(newActivity)
        })
    }

    renderAll() {
        this.activities.map(activity => activity.renderActivities())
    }

    /*static getActivities() {
        this.all = []
        return fetch("http://localhost:3000/activities")
        .then(res => res.json())
        .then(obj => {
            let renderedItems= obj.map(attr => new Activity(attr))
            //debugger
            this.container().append(...renderedItems)

           return renderedItems
        })
        .catch(err => alert(err))
    }*/

    renderActivities() {
        //this.trip_id = this.all[0].tripId;
        //this.trip = Trip.all.find(e => e.id === trip_id);
        let activityUl = document.getElementById(`new-activity-${this.id}`);

        //activity Li
        this.activityLi = document.createElement("li");
        this.activityLi.className = "entry-activity"
        this.activityLi.id = `entry-activity-${this.id}`
        activityUl.append(this.activityLi)

    } 

    static createActivity(obj) {
        console.log(obj)
        Trip.all = [];
        return fetch(`http://localhost:3000/activities`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
             body: JSON.stringify(obj)
        
        })
        .then(resp => {
            if(resp.ok) {
              return resp.json()
            } else {
              return resp.text().then(errors => Promise.reject(errors))
            }
        })
        .then(json => {
            let newActivity = new Activity(json);
            this.all.push(newActivity)
            const main = document.getElementById('main');
            main.append(...newActivity)
            debugger
            return newActivity
        }) 
    }
}
