import {getBytes, ref, uploadBytes} from 'firebase/storage';
import { getApplicationStorage } from '../config/firebase';

export async function uploadCsv(userId, file) {
  const storage = getApplicationStorage();
  const fileName = `${new Date().getTime()}-${file.name}`;
  const csvRef = ref(storage, `users/${userId}/${fileName}`);
  await uploadBytes(csvRef, file);

  return fileName;
}

export async function downloadCsv(userId, fileName) {
  const storage = getApplicationStorage();
  const csvRef = ref(storage, `users/${userId}/${fileName}`);

  return await getBytes(csvRef);
}
