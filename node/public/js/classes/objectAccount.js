class accountObj {
    //atributs privats
    #id;
    #accountTypeObj;
    #clientTypeObj;
    #DNIClient;
    #fullNameClient;
    #amount;
    #entryDate;

    constructor(id,DNIClient,fullNameClient,amount,entryDate,accountType,clientType,description){ //constructor
        this.#id = id;
        this.#fullNameClient = fullNameClient;
        this.#DNIClient = DNIClient;
        this.#amount = amount;
        this.#entryDate = entryDate;
        this.#accountTypeObj = new accountTypeObj(id,accountType);
        this.#clientTypeObj = new clientTypeObj(id,clientType,description);
    }

    //getters
    get id(){
        return this.#id;
    }

    get fullNameClient(){
        return this.#fullNameClient;
    }

    get DNIClient() {
        return this.#DNIClient;
    }

    get amount() {
        return this.#amount;
    }

    get entryDate() {
        return this.#entryDate;
    }

    //setters
    set id(id){
        this.#id = id;
    }

    set fullNameClient(fullNameClient){
        this.#fullNameClient = fullNameClient;
    }

    set DNIClient(DNIClient) {
        this.#DNIClient = DNIClient;
    }

    set amount(amount) {
        this.#amount = amount;
    }

    set entryDate(entryDate) {
        this.#entryDate = entryDate;
    }
}