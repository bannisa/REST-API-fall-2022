export default class BookServie {
    constructor({heroRespository}) {
        this.heroRespository = heroRespository;
    }
    find() {
        return this.heroRespository.find();
    }

    create(data) {
        return this.heroRespository.create(data);
    }
}