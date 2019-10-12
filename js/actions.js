var content = [
    { title: 'Sonar' },
    { title: 'Oktoberfest' },
    { title: 'HackUPC' },
    { title: 'Dia de la Hispanidad' },
    { title: 'Anguilla' },
    { title: 'Albania' },
    { title: 'Armenia' },
    { title: 'Netherlands Antilles' },
    { title: 'Angola' },
    { title: 'Argentina' },
    { title: 'American Samoa' },
    { title: 'Austria' },
    { title: 'Australia' },
    { title: 'Aruba' },
    { title: 'Aland Islands' },
    { title: 'Azerbaijan' },
    { title: 'Bosnia' },
    { title: 'Barbados' },
    { title: 'Bangladesh' },
    { title: 'Belgium' },
    { title: 'Burkina Faso' },
    { title: 'Bulgaria' },
    { title: 'Bahrain' },
    { title: 'Burundi' }
    // etc
  ];

document.ready
function prepareSearch(){
    $('.ui.search').search({source: content});
}

function showModal1(){
    $('.ui.modal').modal('show');
}

function reservationOk(){
    document.getElementById("resOkMessage").classList.remove("invisible");
    setTimeout(function () {
        document.getElementById("resOkMessage").classList.add("invisible");
    }, 2000);
}