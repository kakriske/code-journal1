/* global data */
const $photoInput = document.getElementById('photo');
const $photoPreview = document.getElementById('photo-preview');
const $form = document.querySelector('form');
const $formView = document.querySelector('.form-view');

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

  formData.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formData);

  const newRender = renderEntry(formData);
  const unOrder = document.getElementById('unList');
  console.log(unOrder);
  unOrder.prepend(newRender);
  toggleNoEntries();

  viewSwap('entries');

  $photoPreview.setAttribute('src', '../images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntry(entry) {
  const li = document.createElement('li');
  li.className = 'row';
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
