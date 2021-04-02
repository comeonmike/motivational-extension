(function(){

let $  = document.getElementById.bind(document);
let $$ = document.querySelectorAll.bind(document);

class App {
    constructor($el) {
        this.$el = $el;
        this.load();
        this.$el.addEventListener(
            'submit', this.submit.bind(this)
          );
        if (this.dob) {
            this.renderAgeLoop();
        } else {
            this.renderChooseDate();
        }
    }
    load() {
        let value;
        if (value = localStorage.dob)
            this.dob = new Date(parseInt(value));
    }
    submit(event) {
        event.preventDefault();
        let input = this.$$('input')[0];
        if ( !input.valueAsDate ) return;
        this.dob = input.valueAsDate;
        this.save();
        this.renderAgeLoop();
    }
    save() {
        if (this.dob)
            localStorage.dob = this.dob.getTime();
    }
    renderAgeLoop() {
        this.interval = setInterval(this.renderAge.bind(this), 30);
    }
    renderAge() {
        let now       = new Date
        let duration  = now - this.dob;
        let years     = duration / 31556900000;
        let majorMinor = years.toFixed(9).toString().split('.');

        requestAnimationFrame(function(){
            this.innerHTML(this.view('age')({
                    year:         majorMinor[0],
                    milliseconds: majorMinor[1]
                })
            );
        }.bind(this));
    }
    renderChooseDate() {
        this.innerHTML(this.view('dob')());
    }
    innerHTML(html) {
        this.$el.innerHTML = html;
    }
    view(name) {
        let $el = $(name + '-template');
        console.log($el.innerHTML)
        return Handlebars.compile($el.innerHTML);
    }

}

App.prototype.$$ = function(sel){ return this.$el.querySelectorAll(sel); };
window.app = new App($("app"));

})();


let changeBackground = (back) => {
    document.querySelector('body').classList = '';
    document.querySelector('body').classList.add(back);
    localStorage.setItem('background', back)
}


document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById('background-button-default').onclick = function() {changeBackground('default')};
    document.getElementById('background-button-green').onclick = function() {changeBackground('green')};
    document.getElementById('background-button-purple').onclick = function() {changeBackground('purple')};
    document.getElementById('background-button-whiteblue').onclick = function() {changeBackground('whiteblue')};
    document.getElementById('background-button-whitewhiteblue').onclick = function() {changeBackground('whitewhiteblue')};
    
    if(localStorage.getItem('background')) {
        document.querySelector('body').classList = '';
        document.querySelector('body').classList.add(localStorage.getItem('background'));
    } else {
        document.querySelector('body').classList = '';
        document.querySelector('body').classList.add('default');
    }
}); 