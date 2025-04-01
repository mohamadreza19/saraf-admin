import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl2 } from '../../form-builder2/form-builder2.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Icon, latLng, Map, MapOptions, marker, Marker, tileLayer, LatLngExpression } from 'leaflet';

@Component({
  selector: 'app-map-input',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.css'],
})
export class MapInputComponent implements AfterViewInit {
  map!: Map; // Reference to the map instance

  layers: Marker[] = []; // Array to hold markers

  @Input()
  control!: FormControl2;

  @Input()
  mapOption!: MapOptions;

  ngAfterViewInit(): void {
    if (!this.control.value) {
      const latLng: LatLngExpression = [32.4279, 53.688];
      this.control.setValue(latLng);
    }
    this.mapOption = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors',
        }),
      ],
      zoom: 13,
      center: this.control.value, // Initial center
    };

    // Add an initial marker
    this.layers = [marker(this.control.value, { icon: this.getCustomIcon() }).bindPopup('Click the map to move me!')];
  }

  // Handle map initialization
  onMapReady(map: Map) {
    this.map = map;

    // Listen for map click events
    this.map.on('click', (event: any) => {
      const { lat, lng } = event.latlng;

      // Update the marker position
      this.updateMarkerPosition(lat, lng);
    });
  }

  // Update the marker's position dynamically
  updateMarkerPosition(lat: number, lng: number) {
    this.control.setValue([lat, lng]);
    this.layers = [marker([lat, lng], { icon: this.getCustomIcon() }).bindPopup(`Marker moved to: ${lat}, ${lng}`)];
  }

  // Custom icon for the marker
  getCustomIcon() {
    return new Icon({
      iconUrl: 'assets/images/marker-icon.png', // Path to your custom icon image
      shadowUrl: 'assets/images/marker-shadow.png',
      iconSize: [32, 32], // Size of the icon [width, height]
      iconAnchor: [16, 32], // Anchor point of the icon (center bottom)
      popupAnchor: [0, -32], // Anchor point for the popup
    });
  }
}
