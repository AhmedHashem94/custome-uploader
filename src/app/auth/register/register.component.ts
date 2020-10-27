import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { MyApiService } from '../../services/my-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  current = 0;
  passwordVisible = false;
  password?: string;
  loading = false;
  doctorImage: string;
  specialties;
  subSpecialties;
  prefixTitles;
  profissionalDetails;
  listOfOption: number[] = [];

  registerForm: FormGroup = this.fb.group({
    firstName_en: ['', Validators.required],
    lastName_en: ['', Validators.required],
    firstName_ar: ['', Validators.required],
    lastName_ar: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phonenumber: ['', Validators.required],
    gender_id: ['', Validators.required],
    password: ['', Validators.required],
    featured: ['', Validators.required],
    specialty_id: ['', Validators.required],
    subSpecialties_id: this.fb.array([this.listOfOption]),
    prefix_title_id: ['', Validators.required],
    profissionalDetails_id: ['', Validators.required],
    profissionalTitle_en: ['', Validators.required],
    profissionalTitle_ar: ['', Validators.required],
    aboutDoctor_ar: ['', Validators.required],
    aboutDoctor_en: ['', Validators.required],
    practiceLicenseID: ['', Validators.required],
    profissionalTitleID: ['', Validators.required],
    price: ['', Validators.required],
    streetName_en: ['', Validators.required],
    streetName_ar: ['', Validators.required],
    buildingNum_en: ['', Validators.required],
    buildingNum_ar: ['', Validators.required],
    role: ['', Validators.required],
    apartmentNum_en: ['', Validators.required],
    apartmentNum_ar: ['', Validators.required],
    landmark_en: ['', Validators.required],
    landmark_ar: ['', Validators.required],
    area_id: ['', Validators.required],
    waiting_time: ['', Validators.required],
    num_of_day: ['', Validators.required],
    lng: ['', Validators.required],
    lat: ['', Validators.required],
  });

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }

  constructor(private fb: FormBuilder, private myApi: MyApiService) {}

  ngOnInit(): void {
    this.myApi.getAllSpecialties().subscribe((res) => {
      this.specialties = res;
      console.log(this.specialties);
    });
    this.myApi.getAllSubSpecialties().subscribe((res) => {
      this.subSpecialties = res;
      console.log(this.subSpecialties);
    });
    this.myApi.getAllprefixTitles().subscribe((res) => {
      this.prefixTitles = res;
      console.log(this.prefixTitles);
    });
    this.myApi.getAllprofissionalDetails().subscribe((res) => {
      this.profissionalDetails = res;
      console.log(this.profissionalDetails);
    });
  }

  getImageBase64(event): Promise<any> {
    return new Promise((resolve, reject) => {
      const file: File = event.target.files[0];
      const pattern = /image-*/;
      const reader = new FileReader();
      if (file && !file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      if (file && file.type.match(pattern)) {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }
    });
  }
  onSelectImage(event, imageType): void {
    if (imageType === 'doctorImage') {
      this.getImageBase64(event).then((imageBase64) => {
        this.doctorImage = imageBase64;
        this.registerForm.patchValue({
          featured: this.doctorImage,
        });
      });
    }
    // else imageType === "some thinge" store the image in another property like doctor image and patch the form value
  }

  // handleChange(info: { file: NzUploadFile }, imageType): void {
  //   console.log(info, imageType);

  //   switch (info.file.status) {
  //     case 'uploading':
  //       this.loading = true;
  //       break;
  //     case 'done':
  //       // Get this url from response in real world.
  //       console.log(info, info.file!.originFileObj!);

  //       this.getBase64(info.file!.originFileObj!, (img: string) => {
  //         this.loading = false;
  //         this.avatarUrl = img;
  //         console.log(this.avatarUrl, imageType);
  //         this.registerForm.patchValue({
  //           featured: this.avatarUrl,
  //         });
  //       });
  //       break;
  //     case 'error':
  //       this.loading = false;
  //       break;
  //   }
  // }

  submitForm(): void {
    console.log(this.registerForm.value);
  }
}
