import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private StorageService: StorageService) {}

  // Cambiar para que retorne la ubicación
  async getLocation(): Promise<any> {
    try {
      const position = await Geolocation.getCurrentPosition();
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
      };

      // Guardar la ubicación
      await this.StorageService.set('savedLocation', locationData);
      
      // Retornar la ubicación obtenida
      return locationData;
    } catch (error) {
      console.error('Error getting location:', error);
      return null; // Devuelve null en caso de error
    }
  }

  // Función para recuperar la ubicación guardada
  async getSavedLocation() {
    try {
      const savedLocation = await this.StorageService.get('savedLocation');
      if (savedLocation) {
        console.log('Ubicación recuperada:', savedLocation);
        return savedLocation;
      } else {
        console.log('No se encontró ubicación guardada');
        return null;
      }
    } catch (error) {
      console.error('Error al recuperar la ubicación', error);
      return null;
    }
  }
   // Eliminar la ubicación guardada
   async removeSavedLocation() {
    try {
      await this.StorageService.remove('savedLocation');
      console.log('Ubicación eliminada correctamente.');
    } catch (error) {
      console.error('Error al eliminar la ubicación:', error);
    }
  }

}
