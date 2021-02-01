class Trip {
    constructor(attributes) {
       let whitelist = ["id", "location", "date", ]
       whitelist.forEach(attr => this[attr] = attributes[attr])
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
         this.content.className = "trip-list"
         this.content.dataset.tripId = this.id

         //Li element
         this.listItems ||= document.createElement('li');
         this.listItems.className = "trip-list-item"
         this.listItems.innerHTML = `
                             <strong>Location:</strong> ${this.location}</br>
                             <strong>Date:</strong> ${this.date}</br>`
         
         this.content.append(this.listItems);
 
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
}
