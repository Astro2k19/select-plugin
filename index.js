import { Select } from "./classes/select";
import "./styles.scss";

const select = new Select('#select', {
    placeholder: 'выберите',
    selectedId:'3',
    items:[
        {id:1, value:'React'},
        {id:2, value:'Vue'},
        {id:3, value:'Node JS'},
    ]
})

window.s = select;

