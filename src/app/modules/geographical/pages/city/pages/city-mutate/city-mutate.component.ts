import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  AbstractMutateApiService,
  SingleFormMutateComponent,
} from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { FormBuilder3Component } from '../../../../../../shared/components/form-builder3/form-builder3.component';
import { CityApiService } from 'src/app/shared/apis/city-api.service';

@Component({
  selector: 'app-city-mutate',
  standalone: true,
  templateUrl: './city-mutate.component.html',
  styleUrls: ['./city-mutate.component.css'],
  imports: [FormBuilder3Component],
})
export class CityMutateComponent extends SingleFormMutateComponent<CityControls> implements OnInit {
  override successText: string = $localize`شهر با موفقیت ذخیره شد`;
  override entityApiService = inject(CityApiService);

  constructor() {
    super();
    this.controls = {
      title: new FormControl2('', {
        label: $localize`عنوان`,
        type: 'text',
        validators: [Validators.required],
      }),
      country: new FormControl2('', {
        label: $localize`کشور`,
        type: 'select',
        validators: [Validators.required],
        optionObjImportantKey: 'id',
      }),
    };
  }

  override handleAfterPostInitialization(controls: CityControls): void {
    this.formLabel = $localize`ثبت شهر`;
    const qp = this.route.snapshot.queryParams;
    if ('countryId' in qp && 'countryTitle' in qp) {
      const { countryId, countryTitle } = qp;
      const mountedCountry = {
        id: countryId,
        title: countryTitle,
      };
      controls.country.options = [countryTitle];
      controls.country.setObjOptions([mountedCountry]);
      controls.country.setValue(countryTitle);
      controls.country.disable();
    }
  }

  ngOnInit() {
    this.onInit();
  }
}

export interface CityControls {
  title: FormControl2;
  country: FormControl2;
}
