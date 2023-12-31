import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Meter } from 'app/common/models/meter';
import { MeterService } from 'app/common/services/meter.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-meter-form',
  templateUrl: './meter-form.component.html',
  styleUrls: ['./meter-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MeterFormComponent implements OnInit {

  public contentHeader: object;
  private unsubscribeAll: Subject<any>;
  @BlockUI() blockUI:NgBlockUI;
  public customDateOptions: FlatpickrOptions = {
    altFormat: 'Y-m-d',
    altInput: true,
    enableTime: false,
    defaultDate: new Date()
  }
  public meterForm: FormGroup;
  public submitted = false;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private meterService: MeterService,  private router: Router,) { this.unsubscribeAll=new Subject();}

  get f() {
    return this.meterForm.controls;
  }

  ngOnInit(): void {
    const title = this.activatedRoute.snapshot.data.title;
    const breadcrumb = this.activatedRoute.snapshot.data.breadcrumb;
    const meter = this.activatedRoute.snapshot.data.Meter;

    this.contentHeader = {
      headerTitle: title,
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Meters',
            isLink: true,
            link: '/meters'
          },
          {
            name: breadcrumb,
            isLink: false
          }
        ]
      }
    }

    this.meterForm = this.formBuilder.group({
      id: [meter?meter.id:null, []],
      customerId: [meter?meter.customerId:null, []],
      meterNumber: [meter?meter.meterNumber:null, []],
      installationDate: [meter?meter.installationDate:null, []],
    });
    
  }

  

  onSubmit(): void {
    console.log(this.meterForm.getRawValue());

    if(this.f.id.value)
    {
      this.meterService.putMeter(this.meterForm.getRawValue())
    .pipe(takeUntil(this.unsubscribeAll)).subscribe((response)=>{
      this.blockUI.stop();
this.router.navigate(['/meters'])
    },()=>{
      this.blockUI.stop();
    });
    }
    else{
      this.meterService.postMeter(this.meterForm.getRawValue())
    .pipe(takeUntil(this.unsubscribeAll)).subscribe((response)=>{
      this.blockUI.stop();
this.router.navigate(['/meters'])
    },()=>{
      this.blockUI.stop();
    });

    }
  
}
  }
