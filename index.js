document.addEventListener("DOMContentLoaded", function(e) {
  Trip.getTrips()
  Activity.getActivities()
  //Activity.getActivities()
  clickEvent();
})

document.addEventListener('click', function(e) {
  console.dir(e.target);
  let target = e.target;
  let activityFormContainer = document.getElementById('activity-form-container');
  let formContainer = document.getElementById('add-activity-form');
  let addActivityBtn = document.getElementById('create-activity');

  if(target.matches('#edit-trip-button')){
    let trip = Trip.findById(target.dataset.tripId)
    trip.editTripForm();
  } else if(target.matches('#delete-trip-button')) {
    let trip = Trip.findById(target.dataset.tripId);
    trip.delete();
  }else if(target.matches('#create-activity')) {
    let trip = Trip.findById(target.dataset.tripId)
    activityFormContainer.style.display = "block";
    formContainer.addEventListener('submit', function(e) {
      e.preventDefault();
      let target = e.target;
      let activityAttr = []

      let activityName = target.querySelector('input["name=new-activity"]');
      activityAttr.push(activityName)

      if(activityAttr[0] = !"") {
        Activity.create(...tripAttr)
      }
      document.querySelector('.add-activity-form').reset();        
      })
    }
})

document.addEventListener('submit', function(e) {
  console.dir(e.target);
  let target = e.target;
  if(target.matches('.edit-trip-form')) {
    e.preventDefault();
    let reviewInput = target.querySelector('input[name="trip-review"]');
    let trip = Trip.findById(target.dataset.tripId);
    trip.update(reviewInput.value)
  }
})

function clickEvent() {
  addTrip = false;
  const addTripBtn = document.getElementById("add-trip-btn");
  const tripFormContainer = document.getElementById("form-container");
  const tripForm = document.querySelector('.add-trip-form'); 

  addTripBtn.addEventListener('click', function(e) {
    console.dir(e);
    let target = e.target;
    this.addTrip = !this.addTrip;

    if(this.addTrip) {
      tripFormContainer.style.display = "block";
      addTripBtn.innerText = "Hide Trip Form";
      tripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let target = e.target;
        let tripAttr = []

        let locationInput = target.querySelector('input[name="new-trip-location"]');
        let dateInput = target.querySelector('input[name="trip-date"]');
        //let user = target.querySelector('input[name="user-id"]');
 
        tripAttr.push(locationInput.value);
        tripAttr.push(dateInput.value);
        if(tripAttr[0] != ""){
          Trip.postTrips(tripAttr)
        }
        document.querySelector('.add-trip-form').reset();        
      })
    }else{
      tripFormContainer.style.display = "none";
      addTripBtn.innerText = "Add Trip"
    }
  })
}
