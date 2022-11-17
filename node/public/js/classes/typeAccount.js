class accountTypeObj {
    //atributs privats
    #id;
    #type;

    
    constructor(id,type){ //constructor
        this.#id   = id;
        this.#type = type;
    }


    //getters
    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    //setters
    set id(id) {
        this.#id = id;
    }

    set type(type) {
        this.#type = type;
    }
}