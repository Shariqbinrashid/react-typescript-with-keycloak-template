class LocalStorageHelper {
    static setItem(key: string, value: string): void {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error setting item in local storage: ${error}`);
      }
    }
  
    static getItem(key: string): string | null {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error(`Error getting item from local storage: ${error}`);
        return null;
      }
    }
  
    static removeItem(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item from local storage: ${error}`);
      }
    }
  }
  
  export default LocalStorageHelper;
  