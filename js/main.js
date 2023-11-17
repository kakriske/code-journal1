/* global data */
const $photoInput = document.getElementById('photo');
const $photoPreview = document.getElementById('photo-preview');
const $form = document.querySelector('form');
const $formView = document.querySelector('.form-view');
const $deleteButton = document.getElementById('delete-button');

$photoInput.addEventListener('input', function (event) {
  $photoPreview.setAttribute('src', event.target.value);
});

$formView.addEventListener('click', function () {
  viewSwap('entry-form');
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = {
    title: document.getElementById('title').value,
    photo: document.getElementById('photo').value,
    notes: document.getElementById('notes').value,
  };

  if (data.editing !== null) {
    formData.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === formData.entryId) {
        data.entries[i] = formData;
        const existingLi = document.querySelector(
          `li[data-entry-id="${formData.entryId}"]`
        );

        if (existingLi) {
          const newRender = renderEntry(formData);
          existingLi.replaceWith(newRender);
        }

        data.editing = null;
        break;
      }
    }
  } else {
    formData.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formData);

    const newRender = renderEntry(formData);
    const unOrder = document.getElementById('unList');
    unOrder.prepend(newRender);
  }

  document.querySelector('.column-full').textContent = 'New-Entry';

  toggleNoEntries();

  viewSwap('entries');
  document.querySelector('.column-full').textContent = 'New-Entry';
  data.editing = null;

  // const $submitButton = document.querySelector('#submit-button');
  // const $confirmationModal = document.querySelector('#confirmation-modal');
  // const $confirmSubmit = document.querySelector('#confirm-submit');
  // const $cancelSubmit = document.querySelector('#cancel-submit');
  // $submitButton.addEventListener('click', function() {
  //   $confirmationModal.classList.remove('hidden');
  // });

  // $cancelSubmit.addEventListener('click', function() {
  //   $confirmationModal.classList.add('hidden');
  // });

  // $confirmSubmit.addEventListener('click', function() )

  $photoPreview.setAttribute('src', '../images/placeholder-image-square.jpg');
  $form.reset();
});

const $confirmationModal = document.getElementById('confirmation-modal');
const $confirmDelete = document.getElementById('confirm-submit');
const $cancelDelete = document.getElementById('cancel-submit');

// Show the confirmation modal when the delete button is clicked
$deleteButton.addEventListener('click', function () {
  $confirmationModal.classList.remove('hidden');
});

// Confirm deletion
$confirmDelete.addEventListener('click', function () {
  // Perform the deletion logic here
  // ...

  // Hide the confirmation modal
  $confirmationModal.classList.add('hidden');
});

// Cancel deletion
$cancelDelete.addEventListener('click', function () {
  // Hide the confirmation modal
  $confirmationModal.classList.add('hidden');
});

function renderEntry(entry) {
  const li = document.createElement('li');
  li.className = 'row';
  li.setAttribute('data-entry-id', entry.entryId);
  const imageDiv = document.createElement('div');
  imageDiv.className = 'column-half';
  const image = document.createElement('img');
  image.setAttribute('src', entry.photo);
  imageDiv.append(image);
  li.appendChild(imageDiv);
  // text container div
  const titleDiv = document.createElement('div');
  titleDiv.className = 'column-half';

  // this is title div
  const headerThree = document.createElement('h3');
  headerThree.textContent = entry.title;

  // pencil button
  const pencilA = document.createElement('a');
  pencilA.className = 'pencil';
  const fontPencil = document.createElement('i');
  fontPencil.className = 'fa-solid fa-pencil';
  pencilA.append(fontPencil);
  headerThree.append(pencilA);

  // notes div
  const noteDiv = document.createElement('div');
  noteDiv.textContent = entry.notes;

  // add title and notes to textcontainer div
  titleDiv.append(headerThree);
  titleDiv.append(noteDiv);
  li.appendChild(titleDiv);
  const textDiv = document.createElement('div');
  titleDiv.append(textDiv);

  return li;
}
const $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function (e) {
  if (data.entries.length < 1) {
    toggleNoEntries();
  } else {
    const textEntries = document.querySelector('.noEntry');
    textEntries.classList.add('hidden');
  }

  for (let i = 0; i < data.entries.length; i++) {
    const entry = renderEntry(data.entries[i]);
    $ul.appendChild(entry);
  }
});

function toggleNoEntries() {
  if (data.entries.length < 1) {
    const textEntry = document.querySelector('.noEntry');
    textEntry.classList.toggle('hidden');
  }
}

const $views = document.querySelectorAll('[data-view]');

function viewSwap(view) {
  data.view = view;
  for (let i = 0; i < $views.length; i++) {
    if (view === $views[i].getAttribute('data-view')) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
}

const anchor = document.getElementById('entries-anchor');

anchor.addEventListener('click', function () {
  viewSwap('entries');
});

const unList = document.getElementById('unList');

unList.addEventListener('click', function (event) {
  const click = event.target;
  if (click.className.includes('pencil')) {
    viewSwap('entry-form');
    const idEntry = click.closest('li').getAttribute('data-entry-id');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(idEntry)) {
        data.editing = data.entries[i];
      }
    }

    $deleteButton.classList.remove('hidden');

    console.log('delete button is visible');
    const titleInput = document.getElementById('title');
    const photoInput = document.getElementById('photo');
    const notesInput = document.getElementById('notes');

    titleInput.value = data.editing.title;
    photoInput.value = data.editing.photo;
    $photoPreview.setAttribute('src', data.editing.photo);
    notesInput.value = data.editing.notes;
    document.querySelector('.column-full').textContent = 'Edit Entry';
  }
});
