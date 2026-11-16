// MOCKUP: documentos de ejemplo.
import { delay, listDocuments } from '../mocks/mockDb';

export const getDocuments = async () => {
    await delay(200);
    return { data: listDocuments() };
};
