const getTemplateSelect = (placeholder, items, selectedId) =>{
    let text = placeholder ?? 'Текст по умолчанию';

    const list = items.map(item => {

        let cls = ''

        if(item.id == selectedId){
            text = item.value;
            cls = 'selected';
        }
        return `<li class="select__dropdown-item ${cls}" data-type="value" data-id="${item.id}">${item.value}</li>`;
    });

    return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
        <span data-type="value">${text}</span>
        <i class="fas fa-chevron-down" data-icon="arrow"></i>
        </div>
        <div class="select__dropdown">
            <ul class="select__dropdown-list">
                ${list.join('')}
            </ul>
        </div>
    `
}

export class Select{
    constructor(selector, options){
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;
        this.#render();
        this.#setup();
    }

    #render(){
        let {placeholder, items} = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplateSelect(placeholder, items, this.selectedId);
    }

    #setup(){
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler );
        this.$arrow = this.$el.querySelector('[data-icon="arrow"]');
        this.$value = this.$el.querySelector('[data-type="value"]')

    }

    clickHandler(event){
        const {type} = event.target.dataset;

        if(event.target.closest('.select__input')){
            this.toggle();
        }else if(type === 'value'){
            const {id} = event.target.dataset;
            this.select(id);
        }else if(type == 'backdrop'){
            this.close();
        }
    }

    get isOpen(){
        return this.$el.classList.contains('open');
    }

    toggle(){
        this.isOpen ? this.close() : this.open();
    }

    open(){
        this.$arrow.classList.remove('fa-chevron-down');
        this.$arrow.classList.add('fa-chevron-up');
        this.$el.classList.add('open');

    }

    close(){
        this.$arrow.classList.remove('fa-chevron-up');
        this.$arrow.classList.add('fa-chevron-down');   
        this.$el.classList.remove('open');
    }

    get current(){
        return this.options.items.find(item => item.id == this.selectedId);
    }

    select(id){
        this.selectedId = id;
        this.$value.textContent = this.current.value;
        this.$el.querySelectorAll('[data-id]').forEach(item => item.classList.remove('selected'))
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        this.close();
    }

    destroy(){
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = '';
    }
}
