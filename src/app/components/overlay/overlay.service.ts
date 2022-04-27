import {DOCUMENT} from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Observable} from 'rxjs';
import {OverlayComponent} from './overlay.component';
import {OverlayDirective} from './overlay.directive';
import {OverlayModule} from './overlay.module';

@Injectable({
  providedIn: OverlayModule,
})
export class OverlayService {
  private componentRef!: ComponentRef<OverlayComponent>;
  // The view container's ref
  private viewContainerRef!: ViewContainerRef;
  @ViewChild(OverlayDirective, {static: true}) overlayHost!: OverlayDirective;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  createBottomPane(childComponent: Type<any>, data?: any): void {
    // If an instance already exist destroy it first
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef.instance.state$.next(false);
    }
    // Create new instance of child component
    this.insertChildComponent(childComponent);
    if (data) {
      this.componentRef.instance.contentData = data;
    }
    this.componentRef.instance.state$.next(true);
    const doc = this.document.querySelector('html');
    doc?.classList.add('no-scroll');
    // Watch component's state to destroy
    this.getState().subscribe((state) => {
      if (!state) {
        doc?.classList.remove('no-scroll');
        this.componentRef.destroy();
      }
    });
  }

  getBottomPaneHost(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  closeBottomPane(): void {
    if (this.componentRef) {
      this.componentRef.instance.closeBottomSheet();
    }
  }

  private insertChildComponent(childComponent: Type<any>): void {
    this.componentRef = this.viewContainerRef.createComponent(OverlayComponent);
    this.componentRef.instance.componentType = childComponent;
  }

  private getState(): Observable<boolean> {
    return this.componentRef.instance.state$.asObservable();
  }
}
