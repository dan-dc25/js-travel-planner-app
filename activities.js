class Activity {
    constructor(attributes) { /*constructor method set what paremeters will be accepted/used in creating a new instance of class Trip*/
       let whitelist = ["id", "name", "trip_id"]

       whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static all = [] /*creates an empty array that will receive the paremeters once a new instance of the class has been created*/

    static container() {
        return this.c ||= document.querySelector('#main')
    }

    static getActivities() {
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
    }

    render() {
        //this.trip_id = this.all[0].tripId;
        //this.trip = Trip.all.find(e => e.id === trip_id);

        this.mainDiv ||= document.createElement('div');
        this.mainDiv.className = "columns"
        this.mainDiv.dataset.tripListId = this.id

        this.secondDiv ||= document.createElement('div');
        this.secondDiv.className = "column is-one-quarter"

        this.mainUl ||= document.createElement('ul');
        this.mainUl.className = "trip-list"

        this.content ||= document.createElement('ul');
        this.content.className = "activity-list"
        this.content.setAttibute = ("style", "list-style-type: circle;");
        //this.content.innerText = `${this.name}`

        this.addActivity ||= document.createElement('li');
        this.addActivity.innerText = `{this.name }` 
        debugger
        this.content.append(this.addActivity);
        this.mainUl.append(this.content);
        this.secondDiv.append(this.mainUl);
        this.mainDiv.append(this.secondDiv);
        //this.container().append(mainDiv)
       
        return this.mainDiv;
    } 

    static create(obj) {
        Trip.all = [];
        return fetch(`http://localhost:3000/trips/${trip_id}/activities`, {
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
