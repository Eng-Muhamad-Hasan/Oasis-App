// src/lib/supabase/large-secure-store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as aesjs from "aes-js";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

// Session is too big for SecureStore, so: AES key -> SecureStore, encrypted blob -> AsyncStorage
export class LargeSecureStore {
  async getItem(key: string): Promise<string | null> {
    const [blobHex, keyHex] = await Promise.all([
      AsyncStorage.getItem(key),
      SecureStore.getItemAsync(key),
    ]);
    if (!blobHex || !keyHex) {
      if (blobHex || keyHex) await this.removeItem(key); // halves out of sync
      return null;
    }
    try {
      const cipher = new aesjs.ModeOfOperation.ctr(
        aesjs.utils.hex.toBytes(keyHex),
        new aesjs.Counter(1),
      );
      return aesjs.utils.utf8.fromBytes(
        cipher.decrypt(aesjs.utils.hex.toBytes(blobHex)),
      );
    } catch {
      await this.removeItem(key);
      return null;
    }
  }

  async setItem(key: string, value: string) {
    const encryptionKey = Crypto.getRandomBytes(32); // new key on every write
    const cipher = new aesjs.ModeOfOperation.ctr(
      encryptionKey,
      new aesjs.Counter(1),
    );
    const encrypted = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
    await SecureStore.setItemAsync(
      key,
      aesjs.utils.hex.fromBytes(encryptionKey),
    );
    await AsyncStorage.setItem(key, aesjs.utils.hex.fromBytes(encrypted));
  }

  async removeItem(key: string) {
    await Promise.all([
      SecureStore.deleteItemAsync(key),
      AsyncStorage.removeItem(key),
    ]);
  }
}
