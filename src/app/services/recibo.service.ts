import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc, getDoc, query, where, getDocs, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, uploadBytes, Storage } from '@angular/fire/storage';
import { Recibo } from '../models/recibo.model';

@Injectable({
    providedIn: 'root'
})
export class ReciboService {
    private invoiceCollection = collection(this.firestore, 'contable');

    constructor(private firestore: Firestore, private storage: Storage) { }

    // Sube el recibo a Firebase Storage
    async uploadInvoice(userId: string, courseId: string, file: File): Promise<string> {
        let extension = file.name.split('.').pop();
        const storageRef = ref(this.storage, `bouchers/${userId}/${courseId + '.' + extension}`);
        await uploadBytes(storageRef, file);
        try {
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error('Error getting download URL:', error);
            throw error;
        }
    }

    // Agrega el recibo
    createInvoice(invoice: Recibo) {
        const invoiceDocRef = doc(this.invoiceCollection, invoice.id.toString());
        return setDoc(invoiceDocRef, invoice);
    }

    // Obtener todos los recibos
    getInvoices(): Observable<Recibo[]> {
        return collectionData(this.invoiceCollection) as Observable<Recibo[]>;
    }

    // Obtener recibo especifico
    async checkInvoiceExists(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let invoices = this.getInvoices();
            invoices.subscribe(invoices => {
                const found = invoices.some(invoice => invoice.id.toString() === id);
                resolve(found);
            });
        });
    }

    // Obtener recibo especifico
    async getInvoiceId(invoiceId: string): Promise<Recibo | null> {
        const invoiceDocRef = doc(this.invoiceCollection, invoiceId.toString());
        const invoiceSnapshot = await getDoc(invoiceDocRef);
        if (invoiceSnapshot.exists()) {
            const invoiceData = invoiceSnapshot.data() as Recibo;
            return invoiceData;
        }
        return null;
    }

    // Actualizar recibo
    updateInvoice(invoice: Partial<Recibo>): Promise<void> {
        const invoiceDocRef = doc(this.invoiceCollection, invoice.id!.toString());
        return updateDoc(invoiceDocRef, invoice);
    }

    //Cambiar estado del recibo
    async acceptInvoice(id: string): Promise<void> {
        let invoice = await this.getInvoiceId(id);
        if (invoice) {
            invoice.estado = 'Aceptado';
            await this.updateInvoice(invoice);
        }
    }
}