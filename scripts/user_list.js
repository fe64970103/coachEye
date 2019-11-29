const userList = document.querySelector('.list-group');
const modal = document.querySelector('.modal');

const modalEvent = new Event('users-select');

modal.addEventListener('users-select', e => {    
    const list_ = Array.from(userList.children);    

    const checkedList = list_.filter(e => {        
        return e.children[0].checked;
    });
    const checkdSailors = checkedList.map(e => {
        return e.innerText.trim();
    });

    allSailors.forEach(e => {        
        e.checked = false;
        checkdSailors.forEach(c => {            
            if(e.name === c) {
                e.checked = true;
            }
        });        
    });

    updateTable(allSailors);
})

$('#exampleModal').on('hidden.bs.modal', function (e) {
    // do something...
    // console.log(e);
    modal.dispatchEvent(modalEvent);


})
