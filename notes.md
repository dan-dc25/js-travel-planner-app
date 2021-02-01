 editTripForm() {
    this.editForm ||= document.createElement('form');
    this.editForm.className = 'edit-trip-form';
    this.editForm.dataset.tripListId= this.id;

    this.reviewLabel ||= document.createElement('label');
    this.reviewLabel.className = 'review';
    this.reviewLabel.innerText = Review';

    this.reviewInput ||= document.createElement('input');
    this.reviewInput.type = 'text';
    this.reviewInput.value = this.review;
    this.reviewInput.name = 'trip-review';
    this.nameInput.className = "review";

    this.reviewLabel.append(this.reviewInput);

    this.saveTripButton ||= document.createElement('button');
    this.saveTripButton.className = 'button is-success is-rounded';
    this.saveTaskButton.type = "submit";
    this.saveTaskButton.textContent = "Save Trip";


    this.editForm.append(this.reviewLabel, this.saveTripButton);

    return this.editForm;
  }

   <button class="button is-success">
    <span class="icon is-small">
      <i class="fas fa-check"></i>
    </span>
    <span>Save</span>
  </button>