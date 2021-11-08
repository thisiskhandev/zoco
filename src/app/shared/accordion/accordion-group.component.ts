import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'group-accordion',
  templateUrl: './accordion-group.component.html',
  styleUrls: ['./accordion.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionGroupComponent {

  faCaretDown = faCaretDown;
  /**
   * If the panel is opened or closed
   * @type {boolean}
   * @memberof AccordionGroupComponent
   * @private
   * @default false
   */
  @Input() opened = false;
  /**
   * Text to display in the group title bar
   * @type {string}
   * @memberof AccordionGroupComponent
   * @private
   */
  @Input() title: string;
  /**
   * Text to display in the group title bar on right side, at the left of the caret
   * @type {string}
   * @memberof AccordionGroupComponent
   * @private
   * @default '' 
   * @example '50 photos'
   */
  @Input() subtitle: string;
  /**
   * Bootstrap class for the background color of the group title bar
   * (default: 'bg-dark')
   * @type {string}
   * @memberof AccordionGroupComponent
   * @private
   * @default 'bg-dark'
   */
  @Input() bsBackground: string = 'bg-dark';
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
   * Bootstrap class for the text color of the group title bar
   * (default: 'text-white')
   * @type {string}
   * @memberof AccordionGroupComponent
   * @private
   * @default 'text-white'
   */
  @Input() bsText: string = 'text-white';
  /**
   * Emitted when user clicks on group titlebar
   * @type {EventEmitter<any>}
   * @memberof AccordionGroupComponent
   * @private
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
