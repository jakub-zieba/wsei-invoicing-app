import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReceiverComponent } from './invoice-receiver.component';

describe('InvoiceReceiverComponent', () => {
  let component: InvoiceReceiverComponent;
  let fixture: ComponentFixture<InvoiceReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
