var url = 'https://www.fixmystreet.com/open311/v2/requests.json?jurisdiction_id=fixmystreet.com&agency_responsible=2514&start_date=2018-04-01&end_date=2018-04-30'

var NAME = "service_name";

addEventListener('load', function() {
  getJSON();

});

function getJSON() {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      var reports = result.requests[0].request;

      var reportsPerCategory = objectCreation(reports);

      createTable(reportsPerCategory);
    });
}

function objectCreation(reports) {
  var reportsPerCategory = {};

  for (var i = 0; i < reports.length; i++) {
    var report = reports[i];

    if (reportsPerCategory[report[NAME]] == undefined) {
      reportsPerCategory[report[NAME]] = "1";
    } else {
      var currentAmount = parseInt(reportsPerCategory[report[NAME]]);
      currentAmount = currentAmount + 1;
      reportsPerCategory[report[NAME]] = currentAmount.toString();
    }
  }

  return Object.entries(reportsPerCategory);
}

function createTable(reportsPerCategory) {

  var table = document.createElement('table');

  var tr = document.createElement('tr');

  var th1 = document.createElement('th');
  th1.appendChild(document.createTextNode('Category'));

  var th2 = document.createElement('th');
  th2.appendChild(document.createTextNode('Amount'));

  tr.appendChild(th1);
  tr.appendChild(th2);

  table.appendChild(tr);

  var tr;
  var td1;
  var td2;
  var report;
  var text;

  for (var i = 0; i < reportsPerCategory.length; i++) {
    report = reportsPerCategory[i];

    tr = document.createElement('tr');
    changeRowColor(tr);

    td1 = document.createElement('td');
    text = report[0];
    td1.appendChild(document.createTextNode(text));

    td2 = document.createElement('td');
    text = report[1];
    td2.appendChild(document.createTextNode(text));

    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
  }

  document.body.appendChild(table);
}

function changeRowColor(tr) {
  tr.addEventListener('mouseover', function(event) {
    event.target.parentElement.style.backgroundColor = 'green';
  });

  tr.addEventListener('mouseout', function(event) {
    event.target.parentElement.style.backgroundColor = 'white';
  });
}