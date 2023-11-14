let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', function (event) {
  const serializeData = JSON.stringify(data);
  localStorage.setItem('code-journal-data', serializeData);
});

const storedData = localStorage.getItem('code-journal-data');
if (storedData) {
  data = JSON.parse(storedData);
}
const $photoInput = document.getElementById('photo');
const $photoPreview = document.getElementById('photo-preview');
const $form = document.querySelector('form');

$photoInput.addEventListener('input', function (event) {
  $photoPreview.setAttribute('src', event.target.value);
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

  $photoPreview.setAttribute('src', '../images/placeholder-image-square.jpg');
  $form.reset();
});
