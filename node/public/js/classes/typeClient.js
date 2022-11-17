class clientTypeObj {
    //atributs privats
    #id;
    #type;
    #description;

    
    constructor(id,type,description){ //constructor
        this.#id          = id;
        this.#type        = type;
        this.#description = description;
    }


    //getters
    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    get description() {
        return this.#description;
    }

    //setters
    set id(id) {
        this.#id = id;
    }

    set type(type) {
        this.#type = type;
    }

    set description(description) {
        this.#description = description;
    }
}