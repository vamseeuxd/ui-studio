import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UifComponentsListService {
  private uifComponentsList: any[] = [
    {
      id: '1572345108921',
      position: 0,
      components: [],
      isOpen: false,
      isSubComponents: false,
      name: 'Alerts'
    },
    {
      id: '1572345098430',
      position: 1,
      components: [
        {
          componentName: 'Primary Button',
          componentGroup: {
            id: '1572345098430'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'button',
          properties: [
            {
              name: 'type',
              value: 'button',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false,
              propertyName: 'Test 01',
              propertyId: 'test1'
            },
            {
              name: 'class',
              value: 'btn btn-primary m-1',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: true,
              isEditable: false,
              propertyName: 'Test 02',
              propertyId: 'test2'
            },
            {
              name: 'innerText',
              value: 'Primary',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: true,
              isOpen: true,
              propertyName: 'Label',
              propertyId: 'label'
            }
          ],
          model: [
            {
              propertyName: 'Label',
              propertyId: 'label',
              propertyValue: 'Primary',
              propertyDataType: 'STRING'
            }
          ],
          id: '1572345187510',
          isValid: true,
          containerId: '1575946103167'
        },
        {
          componentName: 'Secondary Button',
          componentGroup: {
            id: '1572345098430'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'button',
          properties: [
            {
              name: 'type',
              value: 'button',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'class',
              value: 'btn btn-secondary m-1',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: true,
              isEditable: false
            },
            {
              name: 'innerText',
              value: 'Secondary',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: true,
              isOpen: true,
              propertyName: 'label',
              propertyId: 'label'
            }
          ],
          model: [
            {
              propertyName: 'label',
              propertyId: 'label',
              propertyValue: 'Secondary',
              propertyDataType: 'STRING'
            }
          ],
          id: '1572346191641',
          isValid: true,
          containerId: '1575946125796'
        },
        {
          componentName: 'Danger Button',
          componentGroup: {
            id: '1572345098430'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'button',
          properties: [
            {
              name: 'type',
              value: 'button',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'class',
              value: 'btn btn-danger m-1',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: true,
              isEditable: false
            },
            {
              name: 'innerText',
              value: 'Danger Button m-1',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: false,
              isOpen: false,
              propertyName: 'label',
              propertyId: 'label'
            }
          ],
          model: [],
          id: '1572346252536',
          isValid: true,
          containerId: '1575946210747'
        },
        {
          componentName: 'Warning Button',
          componentGroup: {
            id: '1572345098430'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'button',
          properties: [
            {
              name: 'type',
              value: 'button',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'class',
              value: 'btn btn-warning m-1',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: true,
              isEditable: false
            },
            {
              name: 'innerText',
              value: 'Warning Button  m-1',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: false,
              isOpen: false,
              propertyName: 'label',
              propertyId: 'label'
            }
          ],
          model: [],
          id: '1572346282886',
          isValid: true,
          containerId: '1575946232256'
        },
        {
          componentName: 'Info Button',
          componentGroup: {
            id: '1572345098430'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'button',
          properties: [
            {
              name: 'type',
              value: 'button',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'class',
              value: 'btn btn-info m-1',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: true,
              isEditable: false
            },
            {
              name: 'innerText',
              value: 'Info Button m-1',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: true,
              isOpen: false,
              propertyName: 'label',
              propertyId: 'label'
            }
          ],
          model: [
            {
              propertyName: 'label',
              propertyId: 'label',
              propertyValue: 'Info Button m-1',
              propertyDataType: 'STRING'
            }
          ],
          id: '1572346303729',
          isValid: true,
          containerId: '1575946243142'
        },
        {
          componentName: 'Light Button',
          componentGroup: {
            id: '1572345098430'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'button',
          properties: [
            {
              name: 'type',
              value: 'button',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'class',
              value: 'btn btn-light m-1',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: true,
              isEditable: false
            },
            {
              name: 'innerText',
              value: 'Light Button m-1',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: true,
              isOpen: false,
              propertyName: 'label',
              propertyId: 'label'
            }
          ],
          model: [
            {
              propertyName: 'label',
              propertyId: 'label',
              propertyValue: 'Light Button m-1',
              propertyDataType: 'STRING'
            }
          ],
          id: '1572346337891',
          isValid: true,
          containerId: '1575946253044'
        },
        {
          componentName: 'Dark Button',
          componentGroup: {
            id: '1572345098430'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'button',
          properties: [
            {
              name: 'type',
              value: 'button',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'class',
              value: 'btn btn-dark m-1',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: true,
              isEditable: false
            },
            {
              name: 'innerText',
              value: 'Dark Button m-1',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: true,
              isOpen: false,
              propertyName: 'label',
              propertyId: 'label'
            }
          ],
          model: [
            {
              propertyName: 'label',
              propertyId: 'label',
              propertyValue: 'Dark Button m-1',
              propertyDataType: 'STRING'
            }
          ],
          id: '1572346366456',
          isValid: true,
          containerId: '1575946262667'
        }
      ],
      isOpen: false,
      isSubComponents: false,
      name: 'Buttons'
    },
    {
      id: '1572345137787',
      position: 2,
      components: [
        {
          componentName: 'Progress Bar Primary',
          componentGroup: {
            id: '1572345137787'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'progress',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'div',
              properties: [
                {
                  name: 'class',
                  value: 'progress-bar progress-bar-striped progress-bar-animated',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'style',
                  value: 'width: 55%',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: true,
                  isEditable: true,
                  propertyName: 'progress',
                  propertyId: 'progress'
                }
              ],
              model: [
                {
                  propertyName: 'progress',
                  propertyId: 'progress',
                  propertyValue: 'width: 55%',
                  propertyDataType: 'STRING'
                }
              ],
              isValid: true
            }
          ],
          model: [
            {
              propertyName: 'progress',
              propertyId: 'progress',
              propertyValue: 'width: 55%',
              propertyDataType: 'STRING'
            }
          ],
          id: '1572607785901',
          isValid: true
        },
        {
          componentName: 'Progress Bar Danger',
          componentGroup: {
            id: '1572345137787'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'progress',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'div',
              properties: [
                {
                  name: 'class',
                  value: 'progress-bar progress-bar-striped progress-bar-animated  bg-danger',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'style',
                  value: 'width: 55%',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: true,
                  isEditable: true,
                  propertyName: 'progress',
                  propertyId: 'progress'
                }
              ],
              model: [
                {
                  propertyName: 'progress',
                  propertyId: 'progress',
                  propertyValue: 'width: 55%',
                  propertyDataType: 'STRING'
                }
              ],
              isValid: true
            }
          ],
          model: [
            {
              propertyName: 'progress',
              propertyId: 'progress',
              propertyValue: 'width: 55%',
              propertyDataType: 'STRING'
            }
          ],
          id: '1572607856230',
          isValid: true
        },
        {
          componentName: 'Progress Bar Warning',
          componentGroup: {
            id: '1572345137787'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'progress',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'div',
              properties: [
                {
                  name: 'class',
                  value: 'progress-bar progress-bar-striped progress-bar-animated  bg-warning',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'style',
                  value: 'width: 55%',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: true,
                  isEditable: true,
                  propertyName: 'progress',
                  propertyId: 'progress'
                }
              ],
              model: [
                {
                  propertyName: 'progress',
                  propertyId: 'progress',
                  propertyValue: 'width: 55%',
                  propertyDataType: 'STRING'
                }
              ],
              isValid: true
            }
          ],
          model: [
            {
              propertyName: 'progress',
              propertyId: 'progress',
              propertyValue: 'width: 55%',
              propertyDataType: 'STRING'
            }
          ],
          id: '1573371062089',
          isValid: true
        }
      ],
      isOpen: false,
      isSubComponents: false,
      name: 'Progress-bars'
    },
    {
      id: '1572345157160',
      position: 3,
      components: [
        {
          componentName: 'Spinner Secondary',
          componentGroup: {
            id: '1572345157160'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'spinner-border text-secondary',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'role',
              value: 'status',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'span',
              properties: [
                {
                  name: 'class',
                  value: 'sr-only',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'innerText',
                  value: 'Loading...',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ],
              model: {
                class: 'string',
                innerText: 'string'
              }
            }
          ],
          model: [],
          id: '1572347345628'
        },
        {
          componentName: 'Spinner Success',
          componentGroup: {
            id: '1572345157160'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'spinner-border text-success',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'role',
              value: 'status',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'span',
              properties: [
                {
                  name: 'class',
                  value: 'sr-only',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'innerText',
                  value: 'Loading...',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ],
              model: {
                class: 'string',
                innerText: 'string'
              }
            }
          ],
          model: [],
          id: '1572347373203'
        },
        {
          componentName: 'Spinner Danger',
          componentGroup: {
            id: '1572345157160'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'spinner-border text-danger',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'role',
              value: 'status',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'span',
              properties: [
                {
                  name: 'class',
                  value: 'sr-only',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'innerText',
                  value: 'Loading...',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ],
              model: {
                class: 'string',
                innerText: 'string'
              }
            }
          ],
          model: [],
          id: '1572347399791'
        },
        {
          componentName: 'Spinner Warning',
          componentGroup: {
            id: '1572345157160'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'spinner-border text-warning',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'role',
              value: 'status',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'span',
              properties: [
                {
                  name: 'class',
                  value: 'sr-only',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'innerText',
                  value: 'Loading...',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ],
              model: {
                class: 'string',
                innerText: 'string'
              }
            }
          ],
          model: [],
          id: '1572347418483'
        },
        {
          componentName: 'Spinner Info',
          componentGroup: {
            id: '1572345157160'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'spinner-border text-info',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'role',
              value: 'status',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'span',
              properties: [
                {
                  name: 'class',
                  value: 'sr-only',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'innerText',
                  value: 'Loading...',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ],
              model: {
                class: 'string',
                innerText: 'string'
              }
            }
          ],
          model: [],
          id: '1572347444086'
        },
        {
          componentName: 'Spinner Dark',
          componentGroup: {
            id: '1572345157160'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'spinner-border text-dark',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'role',
              value: 'status',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'span',
              properties: [
                {
                  name: 'class',
                  value: 'sr-only',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'innerText',
                  value: 'Loading...',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ],
              model: {
                class: 'string',
                innerText: 'string'
              }
            }
          ],
          model: [],
          id: '1572347465364'
        }
      ],
      isOpen: false,
      isSubComponents: false,
      name: 'Spinners'
    },
    {
      id: '1572607923901',
      position: 4,
      components: [
        {
          componentName: 'DTCC Card',
          componentGroup: {
            id: '1572607923901'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'card m-1',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: true,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: true,
              repeatable: false,
              repeatCount: 1,
              tag: 'div',
              properties: [
                {
                  name: 'class',
                  value: 'card-header',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                }
              ],
              isValid: true,
              containerId: '1575944334788',
              model: []
            },
            {
              isContainer: true,
              repeatable: false,
              repeatCount: 1,
              tag: 'div',
              properties: [
                {
                  name: 'class',
                  value: 'card-body',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                }
              ],
              isValid: true,
              containerId: '1575944347860',
              model: []
            },
            {
              isContainer: true,
              repeatable: false,
              repeatCount: 1,
              tag: 'div',
              properties: [
                {
                  name: 'class',
                  value: 'card-footer',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                }
              ],
              isValid: true,
              containerId: '1575944358768',
              model: []
            }
          ],
          isValid: true,
          containerId: '1575946345238',
          model: [],
          id: '1575610734766'
        }
      ],
      isOpen: false,
      isSubComponents: false,
      name: 'Card'
    },
    {
      id: '1572608036161',
      position: 5,
      components: [],
      isOpen: false,
      isSubComponents: false,
      name: 'Lists'
    },
    {
      id: '1573550331851',
      position: 6,
      components: [
        {
          componentName: 'Enter Email',
          componentGroup: {
            id: '1573550331851'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-3',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'form-group',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'label',
              properties: [
                {
                  name: 'innerText',
                  value: 'Email address',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ]
            },
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'input',
              properties: [
                {
                  name: 'type',
                  value: 'email',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'class',
                  value: 'form-control',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'placeholder',
                  value: 'Enter email',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                }
              ]
            },
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'small',
              properties: [
                {
                  name: 'class',
                  value: 'form-text text-muted',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'innerText',
                  value: 'We\'ll never share your email with anyone else.',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ]
            }
          ],
          isValid: true,
          id: '1573634921145'
        },
        {
          componentName: 'Password Input',
          componentGroup: {
            id: '1573550331851'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-3',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'form-group',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'label',
              properties: [
                {
                  name: 'innerText',
                  value: 'Password',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ]
            },
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'input',
              properties: [
                {
                  name: 'type',
                  value: 'password',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'class',
                  value: 'form-control',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'placeholder',
                  value: 'Enter Password',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                }
              ]
            },
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'small',
              properties: [
                {
                  name: 'class',
                  value: 'form-text text-muted',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'innerText',
                  value: 'We\'ll never share your Password with anyone else.',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ]
            }
          ],
          isValid: true,
          id: '1573634992316'
        },
        {
          componentName: 'Date Input',
          componentGroup: {
            id: '1573550331851'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-3',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'form-group',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'label',
              properties: [
                {
                  name: 'innerText',
                  value: 'Text',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ]
            },
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'input',
              properties: [
                {
                  name: 'type',
                  value: 'date',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'class',
                  value: 'form-control',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'placeholder',
                  value: 'Enter Text',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                }
              ]
            },
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'small',
              properties: [
                {
                  name: 'class',
                  value: 'form-text text-muted',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                },
                {
                  name: 'innerText',
                  value: 'We\'ll never share your Text with anyone else.',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ]
            }
          ],
          isValid: true,
          id: '1573801565951'
        },
        {
          componentName: 'DTCC Select',
          componentGroup: {
            id: '1573550331851'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-3',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'form-group',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'label',
              properties: [
                {
                  name: 'innerText',
                  value: 'Example select',
                  isAttribute: false,
                  dataType: 'STRING',
                  isEditable: false
                }
              ],
              isValid: true
            },
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'select',
              properties: [
                {
                  name: 'class',
                  value: 'form-control',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                }
              ],
              children: [
                {
                  isContainer: false,
                  repeatable: true,
                  repeatCount: 5,
                  tag: 'option',
                  properties: [
                    {
                      name: 'innerText',
                      value: '1',
                      isAttribute: false,
                      dataType: 'STRING',
                      isEditable: false
                    }
                  ],
                  isValid: true,
                  model: []
                }
              ],
              isValid: true,
              model: []
            }
          ],
          isValid: true,
          model: [],
          id: '1573801859264'
        }
      ],
      isOpen: false,
      isSubComponents: false,
      name: 'Form Inputs'
    },
    {
      id: '1573725688594',
      position: 8,
      components: [
        {
          componentName: 'DTCC Beadcrumb',
          componentGroup: {
            id: '1573725688594'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'nav',
          properties: [
            {
              name: 'aria-label',
              value: 'breadcrumb',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          children: [
            {
              isContainer: false,
              repeatable: false,
              repeatCount: 1,
              tag: 'ol',
              properties: [
                {
                  name: 'class',
                  value: 'breadcrumb',
                  isAttribute: true,
                  dataType: 'STRING',
                  isOpen: false,
                  isEditable: false
                }
              ],
              children: [
                {
                  isContainer: false,
                  repeatable: true,
                  repeatCount: 2,
                  tag: 'li',
                  properties: [
                    {
                      name: 'class',
                      value: 'breadcrumb-item',
                      isAttribute: true,
                      dataType: 'STRING',
                      isOpen: false,
                      isEditable: false
                    }
                  ],
                  children: [
                    {
                      isContainer: false,
                      repeatable: false,
                      repeatCount: 1,
                      tag: 'a',
                      properties: [
                        {
                          name: 'href',
                          value: '#',
                          isAttribute: true,
                          dataType: 'STRING',
                          isOpen: false,
                          isEditable: false
                        },
                        {
                          name: 'innerText',
                          value: 'Home',
                          isAttribute: false,
                          dataType: 'STRING',
                          isEditable: false
                        }
                      ]
                    }
                  ],
                  isValid: true,
                  model: []
                },
                {
                  isContainer: false,
                  repeatable: false,
                  repeatCount: 1,
                  tag: 'li',
                  properties: [
                    {
                      name: 'class',
                      value: 'breadcrumb-item active',
                      isAttribute: true,
                      dataType: 'STRING',
                      isOpen: false,
                      isEditable: false
                    },
                    {
                      name: 'aria-current',
                      value: 'page',
                      isAttribute: true,
                      dataType: 'STRING',
                      isOpen: false,
                      isEditable: false
                    },
                    {
                      name: 'innerText',
                      value: 'Data',
                      isAttribute: false,
                      dataType: 'STRING',
                      isEditable: true,
                      isOpen: true,
                      propertyName: 'PageLink',
                      propertyId: 'pageLink'
                    }
                  ],
                  isValid: true,
                  model: [
                    {
                      propertyName: 'PageLink',
                      propertyId: 'pageLink',
                      propertyValue: 'Data',
                      propertyDataType: 'STRING'
                    }
                  ]
                }
              ],
              isValid: true,
              model: [
                {
                  propertyName: 'PageLink',
                  propertyId: 'pageLink',
                  propertyValue: 'Data',
                  propertyDataType: 'STRING'
                }
              ]
            }
          ],
          isValid: true,
          model: [
            {
              propertyName: 'PageLink',
              propertyId: 'pageLink',
              propertyValue: 'Data',
              propertyDataType: 'STRING'
            }
          ],
          id: '1573725774962'
        }
      ],
      isOpen: false,
      isSubComponents: false,
      name: 'Breadcrumb'
    },
    {
      id: '1574930282628',
      position: 8,
      components: [
        {
          componentName: 'Heading 1',
          componentGroup: {
            id: '1574930282628'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'h1',
          properties: [
            {
              name: 'innerText',
              value: 'Heading One',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: false
            }
          ],
          isValid: true,
          id: '1574930326878'
        },
        {
          componentName: 'Heading 2',
          componentGroup: {
            id: '1574930282628'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'h2',
          properties: [
            {
              name: 'innerText',
              value: 'Heading Two',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: false
            }
          ],
          isValid: true,
          id: '1574930806080'
        },
        {
          componentName: 'Heading 3',
          componentGroup: {
            id: '1574930282628'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'h3',
          properties: [
            {
              name: 'innerText',
              value: 'Heading Three',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: false
            }
          ],
          isValid: true,
          id: '1574930832846'
        },
        {
          componentName: 'Heading 4',
          componentGroup: {
            id: '1574930282628'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'h4',
          properties: [
            {
              name: 'innerText',
              value: 'Heading Four',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: false
            }
          ],
          isValid: true,
          id: '1574930858997'
        },
        {
          componentName: 'Heading 5',
          componentGroup: {
            id: '1574930282628'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'h5',
          properties: [
            {
              name: 'innerText',
              value: 'Heading Five',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: false
            }
          ],
          isValid: true,
          id: '1574930879400'
        },
        {
          componentName: 'Heading 6',
          componentGroup: {
            id: '1574930282628'
          },
          isResponsive: true,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: '%',
          defaultWidth: null,
          isContainer: false,
          repeatable: false,
          repeatCount: 1,
          tag: 'h6',
          properties: [
            {
              name: 'innerText',
              value: 'Heading Six',
              isAttribute: false,
              dataType: 'STRING',
              isEditable: false
            }
          ],
          isValid: true,
          id: '1574930898703'
        }
      ],
      isOpen: false,
      isSubComponents: false,
      name: 'Heading'
    },
    {
      id: '1575469659737',
      position: 9,
      components: [
        {
          componentName: 'DTCC Row',
          componentGroup: {
            id: '1575469659737'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: true,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'row bg-light',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'style',
              value: 'min-height: 50px;min-width: 50px;',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          isValid: true,
          containerId: '1575609241706',
          model: [],
          id: '1575609252229'
        },
        {
          componentName: 'DTCC Col 6',
          componentGroup: {
            id: '1575469659737'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: true,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'col-6 bg-light',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'style',
              value: 'min-height: 50px;min-width: 50px;',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          isValid: true,
          containerId: '1575609858038',
          model: [],
          id: '1575609860160'
        },
        {
          componentName: 'DTCC Col 4',
          componentGroup: {
            id: '1575469659737'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: true,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'col-4 bg-light',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'style',
              value: 'min-height: 50px;min-width: 50px;',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          isValid: true,
          containerId: '1575609881032',
          model: [],
          id: '1575609883592'
        },
        {
          componentName: 'DTCC Col 12',
          componentGroup: {
            id: '1575469659737'
          },
          isResponsive: false,
          defaultResponsiveWidth: 'col-12',
          defaultWidthUnit: 'auto',
          defaultWidth: null,
          isContainer: true,
          repeatable: false,
          repeatCount: 1,
          tag: 'div',
          properties: [
            {
              name: 'class',
              value: 'col-12 bg-light',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            },
            {
              name: 'style',
              value: 'min-height: 50px;min-width: 50px;',
              isAttribute: true,
              dataType: 'STRING',
              isOpen: false,
              isEditable: false
            }
          ],
          isValid: true,
          containerId: '1575609955172',
          model: [],
          id: '1575609957757'
        }
      ],
      isOpen: false,
      isSubComponents: false,
      name: 'Responsive Grid'
    }
  ];
  private uifComponentsListSubject = new BehaviorSubject<any[]>([]);
  uifComponentsListAction$ = this.uifComponentsListSubject.asObservable();

  getUifComponentsList() {
    this.uifComponentsListSubject.next(this.uifComponentsList);
  }
}
