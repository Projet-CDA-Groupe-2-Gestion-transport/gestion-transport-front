import {Component, DestroyRef, forwardRef, inject, ViewEncapsulation} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {AddressApiResponse} from '../../model/address-api-response';
import {AddressApiService} from '../../services/address-api.service';
import {DropdownModule} from 'primeng/dropdown';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-address-input',
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    AutoComplete,
    FormsModule
  ],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class AddressInputComponent {
  suggestions: AddressApiResponse[] = [];
  selectedAddress?: string;

  readonly destroyRef = inject(DestroyRef);
  private addressService = inject(AddressApiService);

  private onChange: (value: string) => void = () => {
    // Intentionally empty
  };
  private onTouched = () => {
    // Intentionally empty
  };

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query;

    if (query && query.length > 2) {
      this.addressService.search(query)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          debounceTime(1000)
        )
        .subscribe((results) => {
          this.suggestions = results;
        });
    } else {
      this.suggestions = [];
    }
  }

  onSelect(address: {value: AddressApiResponse}) {
    this.selectedAddress = this.getFormattedAddress(address.value);
    this.onChange(this.getFormattedAddress(address.value));
    this.onTouched();
  }

  getFormattedAddress(address: AddressApiResponse): string {
    const parts: string[] = [];

    if (address.address?.house_number) {
      parts.push(address.address.house_number);
    }

    if (address.address?.road) {
      parts.push(address.address.road);
    }

    if (address.address?.city) {
      parts.push(address.address.city.toUpperCase());
    }

    if (address.address?.village) {
      parts.push(address.address.village.toUpperCase());
    }

    if (address.address?.country) {
      parts.push(address.address.country);
    }

    return parts.join(' ') || address.display_name;
  }

  writeValue(value: string): void {
    this.selectedAddress = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


}
