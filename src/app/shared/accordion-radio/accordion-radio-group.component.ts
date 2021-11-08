import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'group-radio-accordion',
  templateUrl: './accordion-radio-group.component.html',
  styleUrls: ['./accordion-radio.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionRadioGroupComponent {

  faCaretDown = faCaretDown;
  /**
   * If the panel is opened or closed
   * @type {boolean}
   * @memberof AccordionRadioGroupComponent
   * @private
   * @default false
   */
  @Input() opened = false;
  
  /**
   * Radio button on the left
   * default: false
   */
  @Input() useRadioBtn: boolean = true;
  /**
   * Text to display in the group title bar
   */
  @Input() title: string;
  /**
   * Bootstrap class for the text color of the group title bar
   * (default: 'text-white')
   */
  @Input() bsText: string = 'text-white';
  /**
   * Determines if the chevron will be white or black
   * @type {boolean}
   * @memberof AccordionRadioGroupComponent
   * @private
   * @default false
   */
  @Input() whiteChevron: boolean = false;
  /**
   * Determines if the caret will be used
   * @type {boolean}
   * @memberof AccordionRadioGroupComponent
   * @private
   * @default true
   */
  @Input() useCaret: boolean;
  /**
   * Determines if the body will be used
   * @type {boolean}
   * @memberof AccordionRadioGroupComponent
   * @private
   * @default true
   */
  @Input() useBody: boolean;
  /**
   * Emitted when user clicks on group titlebar
   * @type {EventEmitter<any>}
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
