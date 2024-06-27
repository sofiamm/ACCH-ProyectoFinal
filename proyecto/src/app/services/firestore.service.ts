import { Inject, Injectable } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import path from "path";


@Injectable({
    providedIn: 'root'
})

export class firestoreService{

    //ocupa token
constructor(private firestore:AngularFirestore) {}


createDoc (data: any,path: string , id: string) {

    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);

}

getId() {
    return this.firestore.createId();
}

getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
}

getDoc<tipo>(path:String, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges()
}


}