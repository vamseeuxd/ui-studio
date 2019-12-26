export interface ModelEntity {
    propertyName: string;
    propertyId: string;
    propertyValue: any;
    propertyDataType: string;
}

export interface PropertiesEntity {
    name: string;
    value: string;
    isAttribute: boolean;
    dataType: string;
    isOpen?: boolean;
    propertyName?: string;
    propertyId?: string;
    isEditable: boolean;
}

export interface UifComponentConfigInterface {
    isContainer: boolean;
    containerId: string;
    repeatable: boolean;
    isValid?: boolean;
    repeatCount: number;
    tag: string;
    componentName?: string;
    componentGroup?: { id: string };
    properties?: (PropertiesEntity)[] | null;
    children?: (UifComponentConfigInterface)[] | null;
    model: ModelEntity[];
    isResponsive: boolean;
    defaultWidth: number;
    defaultResponsiveWidth?: string;
    defaultWidthUnit?: string;
}
