new Vue({

    el:
    '#app',
    mounted: function () {
        this.loadPeople();
    },
    data: {
       selected: [],
        people: [],
        modalPerson: {
           
            FirstName: '',
            LastName: '',
            Age: ''
     
        },
        isEditMode: false,
        sortAsc: 1,
        isNotSorted: true
     
    },
    methods: {
        loadPeople: function (cb) {
            $.get('/home/get', people => {
                this.people = people;
                if (cb) {
                    cb();
                }
            });
        },
        updateClick: function () {
            $.post('/home/edit', this.modalPerson, () => {
                this.loadPeople(() => {
                    $('.modal').modal('hide');
                    this.modalPerson = {
                        FirstName: '',
                        LastName: '',
                        Age: ''
                    };
                });
            });
        },
        deleteClick: function (id) {
            $.post('/home/delete', { id }, () => {
                this.loadPeople();
            });
        },
        addClick: function () {
            $.post('/home/add', this.modalPerson, () => {
                this.loadPeople(() => {
                    $('.modal').modal('hide');
                    this.modalPerson = {
                        FirstName: '',
                        LastName: '',
                        Age: ''
                    };
                });
            });
        },
        editClick: function (person) {
            this.isEditMode = true;
            this.modalPerson = Object.assign({}, person);
            $(".modal").modal();
        },
        newClick: function () {
            $(".modal").modal();
            this.isEditMode = false;
        },
        //sortClick: function () {
        //    this.people.sort((a, b) => (a.Age - b.Age) * this.sortAsc);
        //    this.sortAsc *= -1;
        //}
        sortClick: function () {
            if (this.isNotSorted) {
                this.people.sort((a, b) => (a.Age - b.Age));
                this.isNotSorted = false;
            }
            else {
                this.people.sort((a, b) => (-a.Age - -b.Age));
                this.isNotSorted = true;
            }
        }
      
        //deleteAllClick: function () {
        //    //delete all that are in the selected array
        //}
    }

});