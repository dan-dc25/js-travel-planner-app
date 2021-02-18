document.addEventListener("DOMContentLoaded", function() {
  new Trips().fetchAndLoadTrips().then(() => {
    
      new Activities()
  })
})



  
