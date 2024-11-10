import { makeAutoObservable } from "mobx";

class UniverseModel {
    constructor() {
        makeAutoObservable(this);
    }

}

const universeModel = new UniverseModel();

export default universeModel;
