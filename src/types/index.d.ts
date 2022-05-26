declare module "react-image-annotation" {
  export interface IGeometry {
    type: string;
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  }
  export interface ISelector {
    TYPE: string;
    intersects: (
      { x, y }: { x: number; y: number },
      geometry: IGeometry,
      container: { width: number; height: number }
    ) => boolean;
    area: (
      geometry: IGeometry,
      container: { width: number; height: number }
    ) => number;
    methods: {
      onMouseUp?: (annotation: IAnnotation, e: any) => IAnnotation | {};
      onMouseDown?: (annotation: IAnnotation, e: any) => IAnnotation | {};
      onMouseMove?: (annotation: IAnnotation, e: any) => IAnnotation | {};
      onClick?: (annotation: IAnnotation, e: any) => IAnnotation | {};
    };
  }
  export interface IAnnotation {
    selection?: {
      mode: string;
      showEditor: boolean;
    };
    geometry: IGeometry;
    data: {
      text: string;
      id?: number;
    };
  }
  interface IAnnotationProps<T> {
    src: string;
    alt?: string;
    innerRef?: (e: any) => any;
    onMouseUp?: (e: React.MouseEvent) => any;
    onMouseDown?: (e: React.MouseEvent) => any;
    onMouseMove?: (e: React.MouseEvent) => any;
    onClick?: (e: React.MouseEvent) => any;

    annotations: T[];
    type?: string;
    selectors?: ISelector[];

    value: T | {};
    onChange?: (e: any) => any;
    onSubmit?: (e: any) => any;

    activeAnnotationComparator?: (annotation: T) => boolean;
    activeAnnotations?: T[];

    disableAnnotation?: boolean;
    disableSelector?: boolean;
    renderSelector?: ({
      annotation,
      active,
    }: {
      annotation: T;
      active: boolean;
    }) => any;
    disableEditor?: boolean;
    renderEditor?: ({
      annotation,
      onChange,
      onSubmit,
    }: {
      annotation: T;
      onChange: (annotation: T | {}) => any;
      onSubmit: (e?: any) => any;
    }) => any;

    renderHighlight?: ({
      key,
      annotation,
      active,
    }: {
      key: string;
      annotation: T;
      active: boolean;
    }) => any;
    renderContent?: ({ annotation }: { annotation: T }) => any;

    disableOverlay?: boolean;
    renderOverlay?: () => any;
    allowTouch: boolean;
  }

  class Annotation<T> extends React.Component<IAnnotationProps<T>, {}> {}
  export default Annotation;
}
