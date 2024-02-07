import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';
import { MessageImageInfo } from '@interfaces/message';

interface Coords {
  x: number;
  y: number;
}

@Component({
  selector: 'app-gpt-message-editable-image',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gptMessageEditableImage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageEditableImageComponent implements AfterViewInit {

  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: MessageImageInfo;

  @Output() onSelectedImage = new EventEmitter<string>();

  @ViewChild('canvas') canvasElement?: ElementRef<HTMLCanvasElement>;
  public originalImage = signal<HTMLImageElement|null>(null);
  public isDrawing = signal<boolean>(false);
  public cooords = signal<Coords>({ x: 0, y: 0 });

  ngAfterViewInit(): void {
    if ( !this.canvasElement ) return;

    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d')!;

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.imageInfo.url;

    this.originalImage.set(image);

    image.onload = () => {
      context.drawImage( image, 0,0, canvas.width, canvas.height );
    }

  }

  onMouseDown( event: MouseEvent ) {
    if ( !this.canvasElement?.nativeElement ) return;

    this.isDrawing.set(true);

    const canvas = this.canvasElement.nativeElement;

    // Obtener las coordenadas del mouse relativo al canvas.
    const startX = event.clientX - canvas.getBoundingClientRect().left;
    const startY = event.clientY - canvas.getBoundingClientRect().top;

    this.cooords.set({ x:startX, y:startY })

  }

  onMouseMove( event: MouseEvent ) {
    if ( !this.isDrawing() ) return;
    if ( !this.canvasElement?.nativeElement ) return;

    const canvas = this.canvasElement.nativeElement;

    const currentX = event.clientX - canvas.getBoundingClientRect().left;
    const currentY = event.clientY - canvas.getBoundingClientRect().top;

    const width = currentX - this.cooords().x;
    const height = currentY - this.cooords().y;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, canvasHeight, canvasWidth );
    context.drawImage( this.originalImage()!, 0, 0, canvasWidth, canvasHeight )

    context.clearRect( this.cooords().x, this.cooords().y, width, height );

  }

  onMouseUp( event: MouseEvent ) {
    if ( !this.canvasElement?.nativeElement ) return;

    this.isDrawing.set(false);

    const canvas = this.canvasElement.nativeElement;
    const url = canvas.toDataURL('image/png');
    console.log('🚀 | GptMessageEditableImageComponent | onMouseUp | url:', url)

    this.onSelectedImage.emit( url );

  }

  handleClick() {
    this.onSelectedImage.emit( this.imageInfo.url );
  }

}
